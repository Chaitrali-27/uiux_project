import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, CheckIcon } from './Icons';
import { getTranslation } from '../utils/translations';

export const FaqSection = ({ language = 'en', onContactHelp }) => {
  const t = getTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(1);


  const categories = [
    'All', 
    'Application & Form', 
    'Tatkaal Scheme', 
    'Police Verification', 
    'Fees & Payment', 
    'Appointments & Slots', 
    'Documents & Rules'
  ];

  const faqs = [
    {
      id: 1,
      category: 'Documents & Rules',
      question: 'What documents are required to apply for a Fresh Passport for an Adult?',
      answer: `Applicants need only three core documents:
1. Proof of Present Residential Address: Aadhaar Card, Active Bank Passbook with photograph, Electricity / Water bill (last 2 months), or Registered Rent Agreement.
2. Proof of Date of Birth (DOB): Birth Certificate issued by municipal authority, Aadhaar Card, 10th Standard School Leaving Certificate, or PAN Card.
3. Proof for Non-ECR Category: 10th standard matriculation pass certificate or degree from a recognized institution.
Original documents along with one self-attested photocopy must be presented on your appointment day at the PSK.`,
      keywords: 'documents address proof dob birth certificate aadhaar pan non-ecr 10th fresh adult'
    },
    {
      id: 2,
      category: 'Tatkaal Scheme',
      question: 'What is the processing time, surcharge, and document rule for Tatkaal Scheme?',
      answer: `Key regulations under the Tatkaal Scheme:
• Fast-Track Turnaround: Processed on high priority and dispatched within 1 to 3 working days from the appointment date without waiting for prior police verification.
• Statutory Tariff: Additional surcharge of ₹2,000 applies over the normal application fee (Total ₹3,500 for a standard 36-page booklet).
• Mandatory Identity Proofs: Applicants must produce at least two verified documents from the government schedule (e.g. Aadhaar Card + Voter ID or PAN Card).
• Restrictions: Major name changes, adoption cases, and complex court clearances are not eligible under Tatkaal.`,
      keywords: 'tatkaal tatkal urgent emergency fast fee charge 2000 3500 surcharge days processing'
    },
    {
      id: 3,
      category: 'Police Verification',
      question: 'How is Police Verification conducted, and do I need to visit the police station?',
      answer: `Police Verification Process:
• After your appointment at the PSK, your file is dispatched electronically to the District Superintendent of Police (SP Office).
• A field police officer will contact you via your registered mobile number for physical address verification.
• In cities enabled with the mPassport Police App, verification is done paperlessly and completed in under 5 days.
• Note: No cash fee is required to be paid to the visiting police officer. You do not need to visit the police station unless explicitly summoned.`,
      keywords: 'police verification pvp thana chowki inspector enquiry mpassport bribe cash fee'
    },
    {
      id: 4,
      category: 'Appointments & Slots',
      question: 'How many times can I reschedule my confirmed passport appointment?',
      answer: `Rescheduling Rules:
• Applicants are entitled to reschedule or cancel a confirmed appointment up to 3 times within 12 months from the original fee payment date without paying any extra charges.
• Rescheduling must be completed online at least 24 hours prior to the original booked slot time.
• You can check live seat availability across all PSKs and Post Office PSKs in our Appointment Availability tab.`,
      keywords: 'reschedule cancel appointment slot postpone date change 3 times 12 months'
    },
    {
      id: 5,
      category: 'Fees & Payment',
      question: 'Is the passport fee refundable if my appointment is delayed or cancelled?',
      answer: `Fee Validity & Refund Policy:
• Application fees paid to the Ministry of External Affairs remain valid for 365 days (one full calendar year) from the payment receipt date.
• You can reuse the payment receipt to book appointments within this 1-year window.
• Once paid, statutory government fees are non-refundable as per Rule 12 of the Passports Rules, 1980, unless a duplicate transaction occurred due to technical banking failure.`,
      keywords: 'fee refund money back cancel payment sbi epay validity 1 year 365 days'
    },
    {
      id: 6,
      category: 'Application & Form',
      question: 'What is the difference between Ordinary, Official, and Diplomatic Passports?',
      answer: `Classification of Indian Passports:
• Ordinary Passport (Type P, Deep Navy Blue Cover): Issued to general citizens for personal travel, business, vacation, or education.
• Official Passport (Type S, White Cover): Issued to designated government officials and delegates travelling on official sovereign state duty.
• Diplomatic Passport (Type D, Maroon Cover): Issued to diplomats, ambassadors, and members of the Union Council of Ministers travelling abroad on diplomatic mission through CPV Division, New Delhi.`,
      keywords: 'types blue white maroon official diplomatic ordinary passport p s d cpv delhi'
    },
    {
      id: 7,
      category: 'Documents & Rules',
      question: 'What are the rules and consent requirements for Minor Passports (Under 18)?',
      answer: `Minors Passport Guidelines:
• Validity: Valid for 5 years or until the child turns 18 years of age, whichever is earlier.
• Concession: 10% statutory concession applies to base fees (₹900 for a 36-page booklet).
• Parental Consent: Both parents must sign Annexure 'D'. If one parent is abroad, Annexure 'C' with consular attestation is required.
• Accompaniment: Either parent must accompany the minor with their original passport to the PSK.`,
      keywords: 'minor child baby kid son daughter under 18 annexure d consent 5 years'
    },
    {
      id: 8,
      category: 'Application & Form',
      question: 'What should I do if my passport is lost, stolen, or damaged?',
      answer: `Lost / Damaged Passport Procedure:
1. Immediately lodge a police report (FIR or Lost Article Report) at the local police station or state police portal.
2. Apply online for 'Re-issue of Passport' under category 'Lost / Damaged Passport'.
3. Submit an affidavit detailing how the loss occurred along with Annexure 'F'.
4. Fee for replacement of lost 36-page booklet is ₹3,000 (Normal) or ₹5,000 (Tatkaal).`,
      keywords: 'lost stolen damaged torn water theft misplaced fir affidavit replacement fee 3000'
    },
    {
      id: 9,
      category: 'Documents & Rules',
      question: 'What are the photo specifications? Do I need to carry physical photos to the PSK?',
      answer: `Photograph Guidelines:
• For Adults & Children above 4 years: Digital photograph and biometric fingerprints are captured live at Counter A inside the Passport Seva Kendra on high-resolution cameras. You DO NOT need to bring physical photos.
• For Infants & Young Children (Under 4 years): Parents must bring one recent passport-size color photograph (35mm x 45mm, plain white background, 80% facial zoom, neutral expression).`,
      keywords: 'photo photograph picture size image 35x45 white background infant child camera'
    },
    {
      id: 10,
      category: 'Fees & Payment',
      question: 'What concessions are available for Senior Citizens and Minors?',
      answer: `Statutory Concessions:
• Minors (Below 18 years) and Senior Citizens (60 years and above) are entitled to a 10% statutory discount on the base passport fee.
• Fresh 36-page booklet fee for Senior Citizens and Minors is ₹900 (instead of ₹1,000 base fee).
• Senior Citizens are also offered priority token queuing at all Passport Seva Kendras.`,
      keywords: 'senior citizen concession discount minor 60 years age elderly 10 percent'
    },
    {
      id: 11,
      category: 'Documents & Rules',
      question: 'What is Non-ECR status and who is eligible for it?',
      answer: `Non-ECR (Emigration Check Not Required) Criteria:
• Persons who have passed 10th standard (Matriculation) or hold higher educational qualifications.
• All persons above 50 years of age.
• Income tax payers and their dependent spouses/children.
• Non-ECR status allows citizens to travel to all 17 notified ECR countries (Gulf, Southeast Asia) for employment without needing Protector of Emigrants (POE) clearance.`,
      keywords: 'ecr non-ecr emigration matriculation 10th qualification poe gulf employment'
    },
    {
      id: 12,
      category: 'Appointments & Slots',
      question: 'How do I track my Speed Post dispatch after booklet printing?',
      answer: `Speed Post Tracking:
• Once your passport is laminated and printed at India Security Press Nashik, it is assigned an India Post consignment tracking number (e.g. SP-MH-94821038IN).
• You will receive an automated SMS with the barcode.
• You can track the real-time delivery stepper on our homepage Live Application Tracker or on indiapost.gov.in. Delivery to your doorstep takes 24 to 72 hours.`,
      keywords: 'track dispatch speed post delivery status barcode consignment indiapost courier'
    }
  ];

  // Intelligently search across question, answer, and keywords
  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredFaqs = faqs.filter((faq) => {
    const textPool = `${faq.question} ${faq.answer} ${faq.keywords || ''} ${faq.category}`.toLowerCase();
    const matchesSearch = cleanQuery === '' || cleanQuery.split(' ').every(word => textPool.includes(word));
    // If user is actively searching by keyword, search across all categories automatically so results are never hidden!
    const matchesCategory = cleanQuery !== '' ? true : (selectedCategory === 'All' || faq.category === selectedCategory);
    return matchesCategory && matchesSearch;
  });

  const popularSearches = [
    'Aadhaar / Address Proof',
    'Tatkaal Surcharge',
    'Police Verification',
    'Minor Passport',
    'Lost Passport',
    'Photo Specs'
  ];

  return (
    <section className="section" id="faq" style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid var(--border-medium)', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.faqTag}</span>
          <h2 className="section-title">{t.faqTitle}</h2>
          <p className="section-desc">
            {t.faqDesc}
          </p>
        </div>

        {/* Instant Search Bar with Live Highlighting */}
        <div style={{ maxWidth: '720px', margin: '0 auto 20px auto', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F8FAFC',
            borderRadius: '12px',
            padding: '6px 18px',
            border: cleanQuery ? '2px solid var(--gov-navy)' : '2px solid var(--border-medium)',
            boxShadow: cleanQuery ? '0 4px 14px rgba(8, 30, 58, 0.15)' : 'var(--shadow-subtle)',
            transition: 'all 0.2s ease'
          }}>
            <SearchIcon className="w-5 h-5" style={{ color: 'var(--gov-navy)', marginRight: '12px', flexShrink: 0 }} />
            <input 
              type="text"
              placeholder={t.faqSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                outline: 'none',
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-serif)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  background: '#E2E8F0',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#475569',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  marginLeft: '8px'
                }}
              >
                {t.clearBtn}
              </button>
            )}
          </div>

          {/* Popular Search Suggestions */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Popular:</span>
            {popularSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(term.split(' / ')[0].toLowerCase())}
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  color: 'var(--gov-navy)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary Header */}
        {cleanQuery && (
          <div style={{
            maxWidth: '720px',
            margin: '0 auto 16px auto',
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '8px 14px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            color: '#0F766E'
          }}>
            <span>
              Found <strong>{filteredFaqs.length}</strong> matching FAQ{filteredFaqs.length === 1 ? '' : 's'} for "<strong>{searchQuery}</strong>" (searching across all categories)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#0F766E', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
            >
              Reset to All
            </button>
          </div>
        )}

        {/* Category Filter Chips (Active when not searching) */}
        {!cleanQuery && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px'
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
        )}

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id || (cleanQuery && filteredFaqs.length === 1);
              return (
                <div 
                  key={faq.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: isExpanded ? '1.5px solid var(--gov-navy)' : '1px solid var(--border-light)',
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
                      background: isExpanded ? '#F8FAFC' : '#FFFFFF',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                        letterSpacing: '0.04em'
                      }}>
                        {faq.category}
                      </span>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--gov-navy)',
                        margin: 0,
                        lineHeight: 1.4
                      }}>
                        {faq.question}
                      </h4>
                    </div>
                    <div style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: 'var(--gov-navy)',
                      flexShrink: 0
                    }}>
                      <ChevronDownIcon className="w-5 h-5" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '18px 22px',
                      fontSize: '14px',
                      color: '#334155',
                      lineHeight: 1.7,
                      borderTop: '1px solid #E2E8F0',
                      whiteSpace: 'pre-line',
                      background: '#FFFFFF'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '2px dashed var(--border-medium)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                No FAQs match "{searchQuery}"
              </h4>
              <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '440px', margin: '0 auto 16px auto' }}>
                Our 24x7 Seva Mitra AI Assistant has comprehensive knowledge of all government circulars and can answer immediately.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="btn btn-outline btn-sm"
                >
                  {t.clearBtn}
                </button>
                <button 
                  onClick={onContactHelp}
                  className="btn btn-navy btn-sm"
                >
                  {t.askChatbotBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
