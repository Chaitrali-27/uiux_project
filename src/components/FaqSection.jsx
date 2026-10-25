import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, CheckIcon } from './Icons';

export const FaqSection = ({ onContactHelp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(1);

  const categories = ['All', 'Application Form', 'Tatkaal Scheme', 'Police Verification', 'Fees & Refund', 'Appointments & Centers'];

  const faqs = [
    {
      id: 1,
      category: 'Application Form',
      question: 'What documents are required to apply for a Fresh Passport for an Adult?',
      answer: `Applicants need only three core documents:
1. Proof of Present Address (e.g. Aadhaar Card, Current Electricity Bill, Registered Rent Agreement, Bank Passbook).
2. Proof of Date of Birth (e.g. Birth Certificate issued by municipal authority, Aadhaar Card, Matriculation Certificate, PAN Card).
3. Proof for Non-ECR Category (e.g. 10th standard matriculation pass certificate or degree from a recognized institution).
Original documents along with one self-attested photocopy must be presented on your appointment day.`
    },
    {
      id: 2,
      category: 'Tatkaal Scheme',
      question: 'What is the processing time and fee for the Tatkaal Passport Scheme?',
      answer: `Under the Tatkaal Scheme:
• Your application is processed on high priority and dispatched within 1 to 3 working days without waiting for pre-police verification.
• An additional surcharge of ₹2,000 applies over the normal application fee (Total ₹3,500 for a 36-page booklet).
• Applicants must produce at least two verified documents from the specified government list (e.g., Aadhaar + Voter ID/PAN).`
    },
    {
      id: 3,
      category: 'Police Verification',
      question: 'How is Police Verification conducted, and do I need to visit the police station?',
      answer: `Once your application is submitted at the PSK, the system dispatches your file electronically to the District Superintendent of Police (SP Office):
• A field police officer will contact you via your registered mobile number for physical address verification.
• In many metro cities with mPassport Police App, verification is done digitally in under 5 days.
• You do not need to pay any additional cash fee to the visiting officer.`
    },
    {
      id: 4,
      category: 'Appointments & Centers',
      question: 'How many times can I reschedule my confirmed passport appointment?',
      answer: `Applicants can reschedule or cancel a confirmed appointment up to **3 times within 12 months** from the original fee payment date without paying any extra charges. Rescheduling must be completed at least 24 hours prior to the original appointment time.`
    },
    {
      id: 5,
      category: 'Fees & Refund',
      question: 'Is the passport fee refundable if my appointment is delayed or cancelled?',
      answer: `Application fees paid to the Ministry of External Affairs remain valid for 365 days (one full year) from the date of payment. You can reuse the payment receipt for rescheduling. If an application is rejected or cancelled permanently, statutory fees are non-refundable as per the Passports Act, 1967.`
    },
    {
      id: 6,
      category: 'Application Form',
      question: 'What is the difference between Normal and Official / Diplomatic Passports?',
      answer: `• Ordinary Passports (Navy Blue Cover) are issued to all general Indian citizens for personal, tourist, business, or educational travel.
• Official Passports (White Cover) and Diplomatic Passports (Maroon Cover) are issued strictly through CPV Division, Patiala House, New Delhi to authorized government delegates, ambassadors, and state officials travelling on sovereign government duty.`
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section" id="faq" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Centralized Knowledge Base</span>
          <h2 className="section-title">Frequently Asked Questions & Guidelines</h2>
          <p className="section-desc">
            Instantly search across official procedural guidelines, document checklists, and citizen self-help articles.
          </p>
        </div>

        {/* UX-05 Fix: Instant Search Bar */}
        <div style={{ maxWidth: '680px', margin: '0 auto 28px auto', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F8FAFC',
            borderRadius: '12px',
            padding: '4px 16px',
            border: '2px solid var(--border-medium)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <SearchIcon className="w-5 h-5" style={{ color: 'var(--gov-navy)', marginRight: '10px' }} />
            <input 
              type="text"
              placeholder="Type a keyword (e.g. documents, tatkaal, police verification, fees, reschedule)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                outline: 'none',
                color: 'var(--text-heading)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: '13px', fontWeight: 600 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: '9999px',
                border: selectedCategory === cat ? '2px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                background: selectedCategory === cat ? 'var(--gov-navy)' : '#F8FAFC',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-body)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: isExpanded ? '1px solid var(--gov-navy)' : '1px solid var(--border-light)',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    boxShadow: isExpanded ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: isExpanded ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: '#E2E8F0',
                        color: 'var(--gov-navy)'
                      }}>
                        {faq.category}
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDownIcon 
                      className="w-5 h-5" 
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'none', 
                        transition: 'transform 0.2s ease',
                        color: 'var(--gov-navy)',
                        flexShrink: 0
                      }} 
                    />
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '18px 22px',
                      fontSize: '14.5px',
                      color: 'var(--text-body)',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--border-light)',
                      whiteSpace: 'pre-line'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              No FAQ articles found matching "{searchQuery}". Try searching with different keywords or contact our 24/7 helpline at 1800-258-1800.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
