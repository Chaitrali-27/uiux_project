import React, { useState } from 'react';
import { ShieldIcon, AlertCircleIcon, CheckIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedAnnouncements } from '../utils/localizedContent';

export const AnnouncementCenter = ({ language = 'en' }) => {
  const t = getTranslation(language);
  const localized = getLocalizedAnnouncements(language);
  const [activeTab, setActiveTab] = useState('active');

  const currentList = activeTab === 'active' ? localized.activeNotices : localized.archivedNotices;

  return (
    <section className="section" id="announcements" style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E2E8F0', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.announcementTag}</span>
          <h2 className="section-title">{t.announcementTitle}</h2>
          <p className="section-desc">
            {t.announcementDesc}
          </p>
        </div>

        {/* Tab Selector: Active vs Archived (UX-03 Fix) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            background: '#E2E8F0',
            borderRadius: '10px',
            padding: '4px'
          }}>
            <button
              onClick={() => setActiveTab('active')}
              style={{
                padding: '9px 20px',
                border: 'none',
                background: activeTab === 'active' ? 'var(--gov-navy)' : 'transparent',
                color: activeTab === 'active' ? '#FFFFFF' : 'var(--text-body)',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-serif)'
              }}
            >
              {t.tabActive} ({localized.activeNotices.length})
            </button>

            <button
              onClick={() => setActiveTab('archived')}
              style={{
                padding: '9px 20px',
                border: 'none',
                background: activeTab === 'archived' ? 'var(--gov-navy)' : 'transparent',
                color: activeTab === 'archived' ? '#FFFFFF' : 'var(--text-body)',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-serif)'
              }}
            >
              {t.tabArchived} ({localized.archivedNotices.length})
            </button>
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: '20px'
        }}>
          {currentList.map((notice) => (
            <div
              key={notice.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                padding: '24px',
                border: activeTab === 'active' ? '1px solid #BFDBFE' : '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: activeTab === 'active' ? '#ECFDF5' : '#F1F5F9',
                    color: activeTab === 'active' ? '#047857' : '#64748B',
                    border: activeTab === 'active' ? '1px solid #A7F3D0' : '1px solid #CBD5E1'
                  }}>
                    {activeTab === 'active' ? localized.activeBadge : localized.archivedBadge}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    {notice.published}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                  {notice.title}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#0369A1', fontWeight: 600, marginBottom: '10px' }}>
                  {localized.jurisdictionLabel} {notice.rpo}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {notice.desc}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B' }}>
                {localized.statusLabel} <strong>{notice.validTill}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
