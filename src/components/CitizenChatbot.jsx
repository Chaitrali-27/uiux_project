import React, { useState, useRef, useEffect } from 'react';
import { XIcon, SendIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from './Icons';

export const CitizenChatbot = ({ isOpen, onClose, onNavigate, userSession }) => {
  const accountKey = userSession?.email 
    ? `passport_chat_history_${userSession.email.replace(/[^a-zA-Z0-9]/g, '_')}`
    : 'passport_chat_history_guest';

  const defaultGreeting = userSession?.name 
    ? `Namaste ${userSession.name}! Welcome back to Passport Seva. I am Seva Mitra, your official AI assistant. I remember your account context. How can I assist you with your application, tracking, or documents today?`
    : `Namaste! I am Seva Mitra, your official Passport Seva AI Assistant. Ask me anything about passport applications, document checklists, fees, tatkaal rules, or appointment slots!`;

  // Dynamic Persistent Memory from localStorage (UX-01 Upgrade)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(accountKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      {
        id: 1,
        sender: 'bot',
        text: defaultGreeting,
        timestamp: 'Just now'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync to account-specific storage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(accountKey, JSON.stringify(messages));
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [messages, accountKey]);

  // When user session changes, reload their specific conversation
  useEffect(() => {
    const saved = localStorage.getItem(accountKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {}
    }
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: defaultGreeting,
        timestamp: 'Just now'
      }
    ]);
  }, [userSession]);

  const clearChatHistory = () => {
    localStorage.removeItem(accountKey);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Conversation cleared. Namaste! How can I assist you with passport services today?`,
        timestamp: 'Just now'
      }
    ]);
  };

  const quickInquiries = [
    { label: '⏱️ Processing timelines', query: 'What is the processing time for fresh and tatkaal passports?' },
    { label: '📄 Required documents', query: 'What documents are required for fresh adult passport?' },
    { label: '⚡ Tatkaal rules & fee', query: 'What are the rules and surcharge for Tatkaal scheme?' },
    { label: '📅 Reschedule appointment', query: 'How do I reschedule my confirmed appointment?' },
    { label: '📦 Track my passport status', query: 'Where is my passport application right now?' }
  ];

  // Comprehensive Knowledge Base & Natural NLP Pattern Matching
  const getDynamicAnswer = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Casual Greetings & Courtesy
    if (/^(hi|hello|helo|heloo|hey|hy|hola|namaste|pranam|greetings|morning|afternoon|evening)/i.test(q)) {
      return {
        text: `Namaste! Hello${userSession?.name ? ` ${userSession.name}` : ''}! It is my pleasure to assist you. 
        
You can ask me anything about:
• **Application Procedures:** Fresh passport, Re-issue, Minor, Senior Citizens
• **Document Checklist:** Address proofs, Date of Birth proofs, Non-ECR
• **Statutory Fees & Concessions:** 36 vs 60-page tariffs, 10% age discount
• **Appointment Slots & Rescheduling:** PSK availability across all cities
• **Live Application Tracking & Police Verification**

How can I help you right now?`,
        action: { label: 'Explore Document Advisor', target: 'document-advisor' }
      };
    }

    if (/^(how are you|who are you|what can you do|your name)/i.test(q)) {
      return {
        text: `I am **Seva Mitra**, the official digital citizen assistant for the Passport Seva Portal, Ministry of External Affairs, Government of India. 
        
I am equipped to answer all statutory rules under the Passports Act 1967, guide your document preparation, check PSK slot availability, and track your Speed Post dispatch in real-time.`,
        action: { label: 'Check Appointment Slots', target: 'appointment' }
      };
    }

    if (/(thank|thanks|dhanyawad|shukriya|great|awesome|helpful)/i.test(q)) {
      return {
        text: `You are very welcome${userSession?.name ? ` ${userSession.name}` : ''}! Glad I could help. Please let me know if you have any more questions regarding your travel documentation. Have a wonderful day ahead!`,
        action: null
      };
    }

    if (/^(bye|goodbye|see you|tata|exit)/i.test(q)) {
      return {
        text: `Goodbye! Best wishes with your passport application and your international travels. Feel free to chat with me anytime if you need further guidance!`,
        action: null
      };
    }

    // 2. Account Context & Application Status Queries
    if (/(my status|where is my passport|my file|track my|my application|who am i)/i.test(q)) {
      if (userSession) {
        return {
          text: `Here is your verified account file status, **${userSession.name}**:
• **File Reference:** BOM069123456726
• **Service Category:** Fresh Ordinary Passport (36 Pages)
• **Current Stage:** **Police Verification Completed** (Digitally cleared by SP Office)
• **Production Status:** Booklet printed and laminated with biometric chip at ISP Nashik
• **Dispatch Tracking:** Consignment **SP-MH-94821038IN** handed over to India Post Speed Post.

Expected delivery to your registered address within 48 hours.`,
          action: { label: 'View 5-Stage Live Tracker', target: 'hero' }
        };
      } else {
        return {
          text: `To retrieve your personal application file status, you can log in to your account or use sample file **BOM069123456726** in our Live Application Tracker on the homepage.`,
          action: { label: 'Open Live Tracker', target: 'hero' }
        };
      }
    }

    // 3. Timelines & Durations
    if (/(time|timeline|how long|days|duration|delay|when will i receive)/i.test(q)) {
      return {
        text: `Official turnaround timelines under the citizen charter:
• **Normal Scheme:** 15 to 20 working days (inclusive of electronic police verification).
• **Tatkaal Scheme:** 1 to 3 working days (expedited processing dispatched without prior police verification).
• **Police Clearance Certificate (PCC):** 7 to 14 working days.
• **Re-issue / Renewal:** Typically 7 to 12 working days if biometric data does not require modification.

All passports are delivered securely via India Post Speed Post directly to your doorstep.`,
        action: { label: 'Track Real-Time Dispatch', target: 'hero' }
      };
    }

    // 4. Documents & Checklists
    if (/(document|documents|paper|proof|aadhaar|pan|birth certificate|required)/i.test(q)) {
      return {
        text: `For a standard Fresh Adult Passport application, you require only 3 core proofs:
1. **Proof of Present Residential Address:** Aadhaar Card, Active Bank Passbook with photo, Electricity/Water Bill (last 2 months), or Registered Rent Agreement.
2. **Proof of Date of Birth (DOB):** Birth Certificate (issued by Municipal Registrar), Aadhaar Card, Secondary School Leaving Certificate (10th/12th), or PAN Card.
3. **Non-ECR (Emigration Check Not Required) Proof:** 10th Standard Matriculation pass certificate or Higher Education Degree.

Use our interactive **Document Advisor** below to generate your personalized printable checklist in seconds!`,
        action: { label: 'Launch Document Advisor', target: 'document-advisor' }
      };
    }

    // 5. Tatkaal Scheme & Urgency
    if (/(tatkaal|tatkal|emergency|urgent|fast|immediate|expedite)/i.test(q)) {
      return {
        text: `Key rules under the **Tatkaal Scheme**:
• **Fast-Track Dispatch:** Dispatched within 72 hours from the appointment date.
• **Statutory Surcharge:** Additional ₹2,000 surcharge over standard fee (Total ₹3,500 for a 36-page booklet).
• **Eligibility & Documentation:** Applicants must produce at least **2 verified identity proofs** from the government schedule (e.g. Aadhaar + Voter ID or PAN).
• **Exceptions:** Major change of name, adoption cases, and complex criminal checks are not permissible under Tatkaal.`,
        action: { label: 'Calculate Tatkaal Fee', target: 'fee-calculator' }
      };
    }

    // 6. Fees, Concessions & Payments
    if (/(fee|cost|charge|price|payment|concession|discount|sbi|upi)/i.test(q)) {
      return {
        text: `Passport Service Tariff (Schedule IV, Passports Rules 1980):
• **Fresh / Re-issue Normal (36 Pages):** ₹1,500
• **Fresh / Re-issue Normal (60 Pages Jumbo):** ₹2,000
• **Tatkaal Expedited Surcharge:** +₹2,000
• **Police Clearance Certificate (PCC):** ₹500
• **Age Concession:** 10% statutory discount for **Minors (below 18 years)** and **Senior Citizens (60 years and above)**.

Payment can be completed online via SBI e-Pay (UPI, Cards, Net Banking) or offline at any SBI branch via Bank Challan.`,
        action: { label: 'Open Fee Calculator', target: 'fee-calculator' }
      };
    }

    // 7. Rescheduling & Appointments
    if (/(reschedule|cancel|appointment|slot|postpone|date change|rpo|psk)/i.test(q)) {
      return {
        text: `Appointment Rescheduling Guidelines:
• You are entitled to reschedule or cancel a confirmed appointment up to **3 times within 12 months** from the original fee payment date without paying any extra fee.
• Rescheduling must be done at least **24 hours prior** to the booked slot time.
• You can check live seat availability across all PSKs and POPSKs in our real-time Slot Status engine.`,
        action: { label: 'Check PSK Slot Availability', target: 'appointment' }
      };
    }

    // 8. Photo Specifications
    if (/(photo|photograph|picture|image|size|dimensions)/i.test(q)) {
      return {
        text: `Passport Photograph Specifications:
• **For Adults:** Digital photograph is captured live on high-resolution cameras at the Passport Seva Kendra (PSK counter). You do not need to bring physical photographs.
• **For Infants / Young Children (< 4 years):** Parents must bring one recent passport-size color photograph (35mm x 45mm, plain white background, 80% facial zoom, front-facing neutral expression).`,
        action: { label: 'Read Full Photo Guidelines', target: 'faq' }
      };
    }

    // 9. Police Verification (PVP)
    if (/(police|verification|thana|chowki|inspector|enquiry)/i.test(q)) {
      return {
        text: `Police Verification Process:
• After your appointment at the PSK, your file is routed electronically to the District Superintendent of Police.
• A local police officer will contact you on your registered phone number for physical residential verification.
• In cities enabled with **mPassport Police App**, verification is completed paperlessly within 5 days.
• **No cash fee** is required to be paid to the police officer.`,
        action: { label: 'Track Police Report Status', target: 'hero' }
      };
    }

    // 10. ECR vs Non-ECR
    if (/(ecr|non-ecr|emigration|matric|10th)/i.test(q)) {
      return {
        text: `ECR (Emigration Check Required) vs Non-ECR:
• **Non-ECR (Emigration Check Not Required):** Granted if you have passed 10th standard (Matriculation) or hold higher educational degrees, or are an income tax payer. You can travel to all 17 ECR countries for work without immigration clearance.
• **ECR:** Endorsed if educational qualification is below 10th standard. Requires Protector of Emigrants (POE) clearance for employment in designated Gulf and Asian countries.`,
        action: { label: 'Check ECR in Document Advisor', target: 'document-advisor' }
      };
    }

    // 11. Lost / Stolen / Damaged Passport
    if (/(lost|stolen|damaged|misplaced|theft|torn|water)/i.test(q)) {
      return {
        text: `If your passport is lost, stolen, or damaged:
1. Immediately lodge a Police Report / FIR at the nearest police station or state police portal.
2. Apply for a Re-issue of Passport under category "Lost / Damaged Passport".
3. Submit an affidavit in Annexure 'F' detailing the circumstances.
4. Statutory fee for replacement of lost passport is ₹3,000 (Normal) or ₹5,000 (Tatkaal).`,
        action: { label: 'Start Application Wizard', target: 'apply-wizard' }
      };
    }

    // 12. Minor Passports
    if (/(minor|child|baby|infant|kid|son|daughter)/i.test(q)) {
      return {
        text: `Passports for Minors (Under 18 Years):
• Validity is either 5 years or until the child reaches 18 years of age.
• 10% statutory concession applies to base fee (₹900 for 36-page booklet).
• Consent of both parents is mandatory (Annexure 'D'). If one parent is abroad, Annexure 'C' with attestation is required.
• Either parent must accompany the minor on the appointment day.`,
        action: { label: 'View Minor Checklist', target: 'document-advisor' }
      };
    }

    // 13. Intelligent Conversational Fallback
    return {
      text: `Regarding **"${query}"**:

Under official regulations of the Ministry of External Affairs:
• All standard passport procedures are fully digitized through **passportindia.gov.in**.
• Original documents with self-attested photocopies are mandatory during your PSK visit.
• Appointments can be scheduled across any PSK or Post Office Passport Seva Kendra (POPSK) within your state jurisdiction.

Would you like me to guide you to our **Document Advisor**, **Fee Calculator**, or connect you with the National Call Centre helpline at **1800-258-1800** (Toll Free)?`,
      action: { label: 'Explore Document Advisor', target: 'document-advisor' }
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = getDynamicAnswer(query);

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseObj.text,
        action: responseObj.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 450);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '410px',
      maxWidth: 'calc(100vw - 32px)',
      height: '590px',
      maxHeight: 'calc(100vh - 48px)',
      background: '#FFFFFF',
      borderRadius: '20px',
      boxShadow: 'var(--shadow-modal)',
      border: '1px solid var(--border-medium)',
      zIndex: 1400,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Bot Header */}
      <div style={{
        background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
        color: '#FFFFFF',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid var(--gov-gold)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--gov-gold)',
            color: '#081E3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '18px',
            border: '2px solid #FFFFFF'
          }}>
            🏛️
          </div>
          <div>
            <div style={{ fontSize: '16.5px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              Passport Seva Mitra
            </div>
            <div style={{ fontSize: '11.5px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>●</span> {userSession?.name ? `Session: ${userSession.name}` : 'AI Citizen Assistant Active'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Clear Memory Button */}
          <button
            onClick={clearChatHistory}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#CBD5E1',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
            title="Clear conversation history"
          >
            Clear
          </button>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '4px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scrollable Container */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px', background: '#F8FAFC' }}>
        {messages.map((msg) => (
          <div 
            key={msg.id}
            style={{
              marginBottom: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '86%',
              padding: '12px 16px',
              borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              background: msg.sender === 'user' ? 'var(--gov-navy)' : '#FFFFFF',
              color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-heading)',
              boxShadow: 'var(--shadow-subtle)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
              fontSize: '13.5px',
              lineHeight: 1.6,
              whiteSpace: 'pre-line'
            }}>
              {msg.text}

              {msg.action && (
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
                  <button 
                    onClick={() => {
                      onNavigate?.(msg.action.target);
                      onClose();
                    }}
                    style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      color: '#0F766E',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <span style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '3px', padding: '0 4px' }}>
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div style={{ fontSize: '12px', color: '#64748B', fontStyle: 'italic', padding: '4px 8px' }}>
            Seva Mitra is thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div style={{
        padding: '8px 12px',
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        overflowX: 'auto',
        display: 'flex',
        gap: '6px',
        whiteSpace: 'nowrap'
      }}>
        {quickInquiries.map((qi, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qi.query)}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: 'var(--gov-navy)',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {qi.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        style={{
          padding: '12px',
          background: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          gap: '8px'
        }}
      >
        <input 
          type="text"
          placeholder="Ask anything (e.g. hello, photo size, lost passport, fees)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-medium)',
            fontSize: '13.5px',
            outline: 'none',
            color: 'var(--text-heading)'
          }}
        />
        <button 
          type="submit"
          className="btn btn-navy btn-sm"
          style={{ padding: '8px 16px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
};
