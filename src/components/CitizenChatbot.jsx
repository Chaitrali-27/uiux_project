import React, { useState, useRef, useEffect } from 'react';
import { XIcon, SendIcon, ShieldIcon, CheckIcon, ArrowRightIcon, SettingsIcon, SparklesIcon } from './Icons';
import { generateAiResponse, getStoredGroqKey, setStoredGroqKey } from '../services/aiService';

export const CitizenChatbot = ({ isOpen, onClose, onNavigate, userSession }) => {
  const accountKey = userSession?.email 
    ? `passport_chat_history_${userSession.email.replace(/[^a-zA-Z0-9]/g, '_')}`
    : 'passport_chat_history_guest';

  const defaultGreeting = userSession?.name 
    ? `Namaste ${userSession.name}! Welcome back to Passport Seva. I am Seva Mitra, your official AI assistant. I remember your account context. You can ask me any passport question, or any general question — I learn from our conversation.`
    : `Namaste! I am Seva Mitra, your Passport Seva AI Assistant. You can ask me ANY question — passport procedures, fees, or any random question you have! I keep track of our conversation.`;

  // Dynamic Persistent Memory from localStorage (retained per account)
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
        provider: 'Seva Mitra AI Engine',
        timestamp: 'Just now'
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [groqKeyInput, setGroqKeyInput] = useState(() => getStoredGroqKey());
  const [keySaveMessage, setKeySaveMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Sync to account-specific storage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(accountKey, JSON.stringify(messages));
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [messages, accountKey]);

  // When user session changes, switch to that specific account's memory
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
        provider: 'Seva Mitra AI Engine',
        timestamp: 'Just now'
      }
    ]);
  }, [userSession]);

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear conversation memory for this account?')) {
      localStorage.removeItem(accountKey);
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: `Conversation cleared. Namaste! How can I assist you today? Ask me any question.`,
          provider: 'Seva Mitra AI Engine',
          timestamp: 'Just now'
        }
      ]);
    }
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setStoredGroqKey(groqKeyInput);
    setKeySaveMessage(groqKeyInput.trim() ? 'Groq API Key saved successfully!' : 'Defaulting to Free AI Engine.');
    setTimeout(() => {
      setKeySaveMessage('');
      setShowSettings(false);
    }, 1400);
  };

  const quickInquiries = [
    { label: '⏱️ Processing timelines', query: 'What is the processing time for fresh and tatkaal passports?' },
    { label: '📄 Required documents', query: 'What documents are required for fresh adult passport?' },
    { label: '⚡ Tatkaal rules & fee', query: 'What are the rules and surcharge for Tatkaal scheme?' },
    { label: '🧠 Test Memory', query: 'What was my previous question and what did we talk about?' },
    { label: '🌍 Random Question', query: 'Tell me 3 interesting historical facts about Indian passports.' }
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Call dynamic AI LLM (Groq / Free intelligent engine) with entire conversation history
      const response = await generateAiResponse({
        prompt: query,
        conversationHistory: updatedMessages,
        userSession,
        customApiKey: groqKeyInput
      });

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        provider: response.provider || 'Seva Mitra AI Engine',
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Error in chatbot generation:', err);
      const fallbackReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Namaste. I am currently experiencing higher network traffic, but I have recorded your message: "${query}". You can reach our 24x7 helpline at 1800-258-1800 or use the Document Advisor.`,
        provider: 'Fallback Engine',
        action: { label: 'Explore Document Advisor', target: 'document-advisor' },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
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
      width: '430px',
      maxWidth: 'calc(100vw - 32px)',
      height: '610px',
      maxHeight: 'calc(100vh - 48px)',
      background: '#FFFFFF',
      borderRadius: '20px',
      boxShadow: 'var(--shadow-modal)',
      border: '1px solid var(--border-medium)',
      zIndex: 1400,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'var(--font-serif)'
    }}>
      {/* Bot Header */}
      <div style={{
        background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
        color: '#FFFFFF',
        padding: '14px 18px',
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
            <div style={{ fontSize: '16px', fontWeight: 700 }}>
              Passport Seva Mitra
            </div>
            <div style={{ fontSize: '11px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>●</span>
              <span>{userSession?.name ? `${userSession.name} (${messages.length} msgs saved)` : 'Dynamic AI Active'}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Settings / API Key Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              background: showSettings ? 'var(--gov-gold)' : 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: showSettings ? '#081E3A' : '#FFFFFF',
              borderRadius: '6px',
              padding: '5px 8px',
              fontSize: '11.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Configure Groq / LLM API Key"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>API</span>
          </button>

          {/* Clear Memory Button */}
          <button
            onClick={clearChatHistory}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#CBD5E1',
              borderRadius: '6px',
              padding: '5px 8px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
            title="Clear account conversation memory"
          >
            Clear
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '4px' }}
            title="Close Chatbot"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel (Groq API Key Configuration) */}
      {showSettings && (
        <div style={{
          background: '#F1F5F9',
          padding: '14px 16px',
          borderBottom: '2px solid var(--border-medium)',
          fontSize: '12.5px',
          color: 'var(--text-heading)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <SparklesIcon className="w-4 h-4" /> AI Engine & Groq API Key Settings
            </span>
            <button 
              onClick={() => setShowSettings(false)}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '14px' }}
            >
              ✕
            </button>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
            You can ask <strong>any random question</strong>. It learns and remembers your entire conversation history. Optionally paste your Groq API Key below (from <code>console.groq.com</code>) to use Groq Llama-3.3. If left blank, it automatically uses our high-speed free AI neural engine!
          </p>
          <form onSubmit={handleSaveApiKey} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="password"
              placeholder="Paste Groq API Key (gsk_...) or leave blank"
              value={groqKeyInput}
              onChange={(e) => setGroqKeyInput(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                fontSize: '12px'
              }}
            />
            <button 
              type="submit"
              className="btn btn-navy btn-sm"
              style={{ padding: '6px 12px', fontSize: '11.5px' }}
            >
              Save Key
            </button>
          </form>
          {keySaveMessage && (
            <div style={{ marginTop: '6px', color: '#0F766E', fontWeight: 600, fontSize: '11px' }}>
              ✓ {keySaveMessage}
            </div>
          )}
          <div style={{ marginTop: '8px', fontSize: '10.5px', color: '#64748B' }}>
            Current Engine: <strong>{groqKeyInput.trim() ? 'Groq Cloud (Llama 3.3 70B)' : 'Free Neural AI Network (Active)'}</strong> • Memory: <strong>{userSession?.email ? userSession.email : 'Guest'}</strong>
          </div>
        </div>
      )}

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
              maxWidth: '88%',
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

              {/* Context-aware portal action shortcut */}
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

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              color: '#94A3B8',
              marginTop: '4px',
              padding: '0 4px'
            }}>
              <span>{msg.timestamp}</span>
              {msg.provider && msg.sender === 'bot' && (
                <span>• {msg.provider}</span>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#64748B',
            padding: '6px 10px',
            background: '#FFFFFF',
            borderRadius: '12px',
            width: 'fit-content',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
            <span>Seva Mitra AI is reasoning with your conversation history...</span>
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
            disabled={isTyping}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: 'var(--gov-navy)',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: isTyping ? 'not-allowed' : 'pointer',
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
          placeholder="Ask ANY question (passport rules, general knowledge, math, etc.)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
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
          disabled={isTyping || !input.trim()}
          style={{ padding: '8px 16px', opacity: (isTyping || !input.trim()) ? 0.6 : 1 }}
        >
          {isTyping ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};
