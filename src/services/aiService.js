/**
 * AI Service for Passport Seva Mitra Chatbot
 * Supports dynamic real-time LLM completions with full multi-turn memory:
 * 1. Groq Cloud API (Llama 3.3 70B Versatile / Llama 3.1 8B) with user API key or env key
 * 2. High-speed free fallback LLM endpoint (zero configuration required, handles any random query)
 */

export const getStoredGroqKey = () => {
  return localStorage.getItem('passport_groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
};

export const setStoredGroqKey = (key) => {
  if (!key || !key.trim()) {
    localStorage.removeItem('passport_groq_api_key');
  } else {
    localStorage.setItem('passport_groq_api_key', key.trim());
  }
};

export const generateAiResponse = async ({
  prompt,
  conversationHistory = [],
  userSession = null,
  customApiKey = null
}) => {
  const apiKey = (customApiKey !== null ? customApiKey : getStoredGroqKey()).trim();

  // Prepare system prompt with GovTech persona and context awareness
  const systemPrompt = `You are "Seva Mitra", the official digital AI citizen assistant for the Passport Seva Portal, Ministry of External Affairs, Government of India.

User Profile:
- Name: ${userSession?.name || 'Citizen (Guest)'}
- Email: ${userSession?.email || 'Not logged in'}
- Account Status: ${userSession?.email ? 'Verified Registered Citizen' : 'Guest Citizen'}
- Active File Ref (if citizen asks about their file): BOM069123456726 (Fresh 36-page normal passport, Police verification completed, dispatched via Speed Post consignment SP-MH-94821038IN).

Core Operating Principles:
1. Dynamic & Versatile: You can answer ANY question the citizen asks — whether it is a specific passport rule, or ANY random general knowledge question, philosophy, science, history, coding, creative writing, or friendly conversation.
2. Conversation Memory: You MUST remember and reference everything discussed in the earlier conversation turns. If the user refers to past questions ("like I said before", "what was the fee you mentioned?", "tell me more about that"), seamlessly recall and build upon the context.
3. Official GovTech Tone: Polite, dignified, helpful, and respectful. Use 'Namaste' where appropriate.
4. Accuracy on Passports: Under the Passports Act 1967:
   - Fresh 36-page Normal: ₹1,500 (15-20 working days).
   - Fresh 60-page Jumbo: ₹2,000.
   - Tatkaal Scheme: Additional ₹2,000 surcharge (total ₹3,500 for 36 pages, dispatched within 1-3 working days).
   - 10% statutory discount for Minors (<18 yrs) and Senior Citizens (>=60 yrs).
   - Address proof: Aadhaar, Bank Passbook with photo, Electricity bill, etc.
   - Non-ECR proof: 10th standard pass certificate.
   - Helpline: 1800-258-1800 (National Call Centre, toll free).
5. Formatting: Use concise bullet points, bold text for key terms, and clear readability.`;

  // Build message sequence for LLM context memory (up to last 14 messages)
  const historyForContext = conversationHistory
    .slice(-14)
    .filter(msg => msg.text && msg.text.trim())
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

  const messagesPayload = [
    { role: 'system', content: systemPrompt },
    ...historyForContext,
    { role: 'user', content: prompt }
  ];

  // Strategy 1: If Groq API Key is present, call Groq Cloud (Llama 3.3 70B)
  if (apiKey) {
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: messagesPayload,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) {
          return {
            text,
            provider: 'Groq Cloud (Llama 3.3)',
            action: detectActionSuggestion(text)
          };
        }
      } else {
        const errBody = await groqResponse.text();
        console.warn('Groq API error, falling back to public AI network:', errBody);
      }
    } catch (e) {
      console.warn('Groq fetch failed, attempting fallback AI:', e);
    }
  }

  // Strategy 2: High-speed free AI endpoint (zero setup needed, full conversational intelligence)
  try {
    const fallbackResponse = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages: messagesPayload,
        temperature: 0.7
      })
    });

    if (fallbackResponse.ok) {
      const data = await fallbackResponse.json();
      const text = data.choices?.[0]?.message?.content?.trim();
      if (text) {
        return {
          text,
          provider: apiKey ? 'Groq (Auto-Switched to Free AI)' : 'Seva Mitra Neural Engine',
          action: detectActionSuggestion(text)
        };
      }
    }
  } catch (err) {
    console.error('Fallback AI failed:', err);
  }

  // Strategy 3: Emergency graceful offline fallback
  return {
    text: `Namaste${userSession?.name ? ` ${userSession.name}` : ''}. I have recorded your question regarding "${prompt}". Under official Passport Seva regulations, you can also reach our 24x7 Citizen Care line at 1800-258-1800 or use the navigation shortcuts below.`,
    provider: 'Offline Resilience Mode',
    action: { label: 'Explore Document Advisor', target: 'document-advisor' }
  };
};

/**
 * Detect context-sensitive portal actions to offer quick navigation pills
 */
const detectActionSuggestion = (text) => {
  const t = text.toLowerCase();
  if (t.includes('fee') || t.includes('tatkaal surcharge') || t.includes('tariff') || t.includes('₹')) {
    return { label: 'Open Fee Calculator', target: 'fee-calculator' };
  }
  if (t.includes('document') || t.includes('aadhaar') || t.includes('non-ecr') || t.includes('checklist')) {
    return { label: 'Open Document Advisor', target: 'document-advisor' };
  }
  if (t.includes('appointment') || t.includes('slot') || t.includes('psk') || t.includes('reschedule')) {
    return { label: 'Check PSK Appointment Slots', target: 'appointment' };
  }
  if (t.includes('track') || t.includes('status') || t.includes('speed post') || t.includes('police verification')) {
    return { label: 'View 5-Stage Live Tracker', target: 'hero' };
  }
  if (t.includes('apply') || t.includes('fresh passport') || t.includes('re-issue') || t.includes('wizard')) {
    return { label: 'Launch Application Wizard', target: 'apply-wizard' };
  }
  return null;
};
