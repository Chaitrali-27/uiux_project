import React, { useState, useRef, useEffect } from 'react';
import { XIcon, SendIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from './Icons';

export const CitizenChatbot = ({ isOpen, onClose, onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! I am Seva Mitra, your official Passport Seva AI Assistant. How may I help you with your passport application, documents, or appointment schedule today?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickInquiries = [
    { label: '⏱️ Passport processing timeline', query: 'What is the processing time for fresh and tatkaal passports?' },
    { label: '📄 Required documents checklist', query: 'What documents are required for a fresh adult passport?' },
    { label: '⚡ Tatkaal scheme eligibility', query: 'Who is eligible for Tatkaal scheme and what is the fee?' },
    { label: '📅 Rescheduling appointment', query: 'How do I reschedule my passport appointment date?' },
    { label: '💰 Fee for 36-page booklet', query: 'What is the fee for normal and tatkaal passport?' }
  ];

  const knowledgeBase = [
    {
      keywords: ['time', 'timeline', 'how long', 'days', 'duration', 'delay'],
      response: `Under standard citizen service charters:
• **Normal Scheme:** 15 to 20 working days (post successful Police Verification).
• **Tatkaal Scheme:** 1 to 3 working days (dispatch without prior police verification).
• **Police Clearance Certificate (PCC):** 7 to 14 working days.

You can monitor your application status anytime using the Quick Tracker on our homepage.`,
      action: { label: 'Track Application Status', target: 'hero' }
    },
    {
      keywords: ['document', 'documents', 'paper', 'proof', 'aadhaar', 'required'],
      response: `For a Fresh Adult Passport (Normal/Tatkaal), you require only 3 primary documents:
1. **Proof of Present Address:** Aadhaar Card, Water/Electricity Bill, Bank Passbook, or Rent Agreement.
2. **Proof of Date of Birth:** Aadhaar Card, Birth Certificate, School Leaving Certificate, or PAN Card.
3. **Non-ECR (Emigration Check Not Required) Proof:** 10th Standard Passing Certificate or Higher Education Degree.`,
      action: { label: 'Start Application Wizard', target: 'apply-wizard' }
    },
    {
      keywords: ['tatkaal', 'emergency', 'urgent', 'fast'],
      response: `Under the Tatkaal Scheme:
• Your application is expedited and dispatched within 72 hours.
• An additional statutory surcharge of ₹2,000 applies (Total ₹3,500 for a 36-page booklet).
• Applicants must provide at least 2 verified identity proofs (e.g., Aadhaar + PAN / Voter ID).
• Major changes in name or adoption cases are not eligible for Tatkaal.`,
      action: { label: 'Calculate Tatkaal Fee', target: 'fee-calculator' }
    },
    {
      keywords: ['reschedule', 'appointment', 'slot', 'cancel', 'postpone'],
      response: `You are entitled to reschedule or cancel your confirmed appointment up to **3 times within 12 months** from your initial application submission date without paying any extra fee.

Appointments must be rescheduled at least 24 hours prior to the scheduled slot time via your dashboard.`,
      action: { label: 'Check Available Slots', target: 'appointment' }
    },
    {
      keywords: ['fee', 'cost', 'charge', 'price', 'payment', 'concession'],
      response: `Statutory Passport Fees (Schedule IV, Passports Rules 1980):
• **Fresh / Re-issue Normal (36 Pages):** ₹1,500
• **Fresh / Re-issue Normal (60 Pages):** ₹2,000
• **Tatkaal Scheme:** ₹2,000 extra surcharge
• **Minor (<18 yrs) & Senior Citizen (60+ yrs):** 10% statutory concession.`,
      action: { label: 'Open Fee Calculator', target: 'fee-calculator' }
    }
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      const match = knowledgeBase.find((item) =>
        item.keywords.some((kw) => lower.includes(kw))
      );

      let botReply;
      if (match) {
        botReply = {
          id: Date.now() + 1,
          sender: 'bot',
          text: match.response,
          action: match.action,
          timestamp: 'Just now'
        };
      } else {
        botReply = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `I understand your query regarding "${query}". For specific statutory regulations or case escalations, please consult our official FAQ knowledge base or speak with a passport officer directly at the national helpline 1800-258-1800 (Toll Free).`,
          action: { label: 'Search Knowledge Base', target: 'faq' },
          timestamp: 'Just now'
        };
      }

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
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
      width: '380px',
      maxWidth: 'calc(100vw - 32px)',
      height: '560px',
      maxHeight: 'calc(100vh - 48px)',
      background: '#FFFFFF',
      borderRadius: '18px',
      boxShadow: 'var(--shadow-modal)',
      border: '1px solid var(--border-medium)',
      zIndex: 1200,
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gov-gold)',
            color: '#081E3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '18px'
          }}>
            🏛️
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
              Passport Seva Mitra
            </div>
            <div style={{ fontSize: '11.5px', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#4ADE80' }}>●</span> Official Citizen Assistant
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '4px' }}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scrollable Area */}
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
              maxWidth: '85%',
              padding: '12px 14px',
              borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              background: msg.sender === 'user' ? 'var(--gov-navy)' : '#FFFFFF',
              color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-heading)',
              boxShadow: 'var(--shadow-subtle)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
              fontSize: '13.5px',
              lineHeight: 1.55,
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
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
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
            Seva Mitra is checking official guidelines...
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
              padding: '4px 10px',
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

      {/* Input Box */}
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
          placeholder="Ask a question about passport services..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-medium)',
            fontSize: '13.5px',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          className="btn btn-navy btn-sm"
          style={{ padding: '8px 14px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
};
