import React, { useState, useEffect } from 'react';
import { SearchIcon, ChevronDownIcon, CheckIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedFaqs } from '../utils/localizedContent';

export const FaqSection = ({ language = 'en', onContactHelp }) => {
  const t = getTranslation(language);
  const { categories, faqs } = getLocalizedFaqs(language);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'All');
  const [expandedId, setExpandedId] = useState(1);

  // Sync selectedCategory when language changes
  useEffect(() => {
    setSelectedCategory(categories[0] || 'All');
  }, [language]);

  // Intelligently search across question, answer, keywords, and category
  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredFaqs = faqs.filter((faq) => {
    const textPool = `${faq.question} ${faq.answer} ${faq.keywords || ''} ${faq.category}`.toLowerCase();
    const matchesSearch = cleanQuery === '' || cleanQuery.split(' ').every(word => textPool.includes(word));
    // If user is actively searching by keyword, search across all categories automatically
    const isAll = selectedCategory === categories[0] || selectedCategory === 'All';
    const matchesCategory = cleanQuery !== '' ? true : (isAll || faq.category === selectedCategory);
    return matchesCategory && matchesSearch;
  });

  const popularSearches = language === 'kn' ? [
    'ಆಧಾರ್ / ವಿಳಾಸ ಪುರಾವೆ',
    'ತತ್ಕಾಲ್ ಶುಲ್ಕ',
    'ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ',
    'ಅಪ್ರಾಪ್ತರ ಪಾಸ್‌ಪೋರ್ಟ್',
    'ಕಳೆದುಹೋದ ಪಾಸ್‌ಪೋರ್ಟ್'
  ] : language === 'gu' ? [
    'આધાર / સરનામા પુરાવો',
    'તત્કાલ સરચાર્જ',
    'પોલીસ વેરિફિકેશન',
    'સગીર પાસપોર્ટ',
    'ખોવાયેલ પાસપોર્ટ'
  ] : [
    'Aadhaar / Address Proof',
    'Tatkaal Surcharge',
    'Police Verification',
    'Minor Passport',
    'Lost Passport'
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
                  marginLeft: '8px',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                {t.clearBtn}
              </button>
            )}
          </div>

          {/* Popular Search Suggestions */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
              {language === 'kn' ? 'ಜನಪ್ರಿಯ ಹುಡುಕಾಟಗಳು:' : language === 'gu' ? 'લોકપ્રિય શોધો:' : 'Popular:'}
            </span>
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
                  cursor: 'pointer',
                  fontFamily: 'var(--font-serif)'
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
              Found <strong>{filteredFaqs.length}</strong> matching FAQ{filteredFaqs.length === 1 ? '' : 's'} for "<strong>{searchQuery}</strong>"
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#0F766E', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
            >
              {t.clearBtn}
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
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-serif)'
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
                      gap: '16px',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    <div>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#64748B',
                        marginBottom: '4px',
                        letterSpacing: '0.04em'
                      }}>
                        {faq.category}
                      </span>
                      <h4 style={{
                        fontSize: '16.5px',
                        fontWeight: 700,
                        color: 'var(--gov-navy)',
                        margin: 0,
                        lineHeight: 1.4,
                        fontFamily: 'var(--font-serif)'
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
                      fontSize: '14.5px',
                      color: '#334155',
                      lineHeight: 1.75,
                      borderTop: '1px solid #E2E8F0',
                      whiteSpace: 'pre-line',
                      background: '#FFFFFF',
                      fontFamily: 'var(--font-serif)'
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
              border: '2px dashed var(--border-medium)',
              fontFamily: 'var(--font-serif)'
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
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {t.clearBtn}
                </button>
                <button 
                  onClick={onContactHelp}
                  className="btn btn-navy btn-sm"
                  style={{ fontFamily: 'var(--font-serif)' }}
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
