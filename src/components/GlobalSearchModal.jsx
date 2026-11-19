import React, { useState, useEffect } from 'react';
import { SearchIcon, XIcon, ArrowRightIcon } from './Icons';

export const GlobalSearchModal = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');

  const searchableIndex = [
    { title: 'Apply for Fresh Passport', category: 'Services', desc: 'New ordinary 10-year booklet for Indian citizens', target: 'apply-wizard' },
    { title: 'Tatkaal Passport Expedited Scheme', category: 'Services', desc: 'Emergency issuance within 1–3 working days', target: 'apply-wizard' },
    { title: 'Police Clearance Certificate (PCC)', category: 'Services', desc: 'Mandatory certificate for foreign stay and visa', target: 'apply-wizard' },
    { title: 'Check PSK Appointment Slot Availability', category: 'Appointments', desc: 'Real-time appointment availability across Mumbai, Delhi, Bengaluru, Pune', target: 'appointment' },
    { title: 'Passport Service Fee Calculator', category: 'Calculator', desc: 'Calculate statutory fees with age concessions for minors and seniors', target: 'fee-calculator' },
    { title: 'Document Advisor & Requirements', category: 'Guidelines', desc: 'Required proofs of date of birth, address, and non-ECR status', target: 'faq' },
    { title: 'Reschedule or Cancel Confirmed Appointment', category: 'Appointments', desc: 'Up to 3 free reschedulings permitted per calendar year', target: 'faq' },
    { title: 'Track Dispatch & Speed Post Delivery', category: 'Status', desc: 'Real-time passport tracking using 15-character file number', target: 'hero' }
  ];

  const filtered = query.trim()
    ? searchableIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchableIndex;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectResult?.('open-search');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 1400,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '80px 20px 20px 20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '640px',
        boxShadow: 'var(--shadow-modal)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)'
      }}>
        {/* Search Input Field */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          background: '#F8FAFC'
        }}>
          <SearchIcon className="w-5 h-5" style={{ color: 'var(--gov-navy)', marginRight: '12px' }} />
          <input
            type="text"
            autoFocus
            placeholder="Search passport services, documents, fee rules (or press Esc to close)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '16px',
              outline: 'none',
              color: 'var(--text-heading)'
            }}
          />
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '12px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748B', padding: '4px 8px 8px 8px', fontWeight: 700 }}>
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Quick Access Links'}
          </div>

          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectResult?.(item.target);
                  onClose();
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                      {item.title}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#E2E8F0',
                      color: 'var(--gov-navy)',
                      fontWeight: 600
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>

                <ArrowRightIcon className="w-4 h-4" style={{ color: 'var(--gov-blue-accent)' }} />
              </div>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
              No matches found for "{query}". Try checking our FAQs or contact 1800-258-1800.
            </div>
          )}
        </div>

        {/* Search Modal Footer */}
        <div style={{
          padding: '10px 16px',
          background: '#F8FAFC',
          borderTop: '1px solid var(--border-light)',
          fontSize: '12px',
          color: '#64748B',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Tip: Press <strong>Ctrl + K</strong> anywhere to search</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
