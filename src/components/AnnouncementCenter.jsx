import React, { useState } from 'react';
import { ShieldIcon, AlertCircleIcon, CheckIcon } from './Icons';

export const AnnouncementCenter = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeNotices = [
    {
      id: 1,
      title: 'Special Saturday Passport Processing Camps',
      rpo: 'Mumbai, Pune & Bengaluru RPOs',
      published: '20 October 2026',
      validTill: 'Active until 30 November 2026',
      desc: 'To facilitate working professionals and students, select Passport Seva Kendras will operate on alternate Saturdays. Online appointment booking mandatory.',
      status: 'active'
    },
    {
      id: 2,
      title: 'Advisory on Non-Official / Lookalike Websites',
      rpo: 'All India PSKs',
      published: '15 October 2026',
      validTill: 'Permanent Citizen Advisory',
      desc: 'Applicants are cautioned against unauthorized third-party agencies charging arbitrary fees. All appointment scheduling is conducted strictly via passportindia.gov.in.',
      status: 'active'
    }
  ];

  const archivedNotices = [
    {
      id: 3,
      title: 'Mobile Passport Van Camp at PSK Vijay Cross Road',
      rpo: 'Ahmedabad Jurisdiction',
      published: '21 July 2026',
      validTill: 'Concluded on 24 July 2026',
      desc: 'Special van camp operations completed. All pending biometric records successfully migrated to Regional Passport Office Ahmedabad.',
      status: 'archived'
    },
    {
      id: 4,
      title: 'Revised Passport Fee Notification (Historical Gazette)',
      rpo: 'National CPV Division',
      published: '1 July 2025',
      validTill: 'Superseded by Schedule IV',
      desc: 'Schedule IV fee adjustments completed. Current fees are now calculated live via the interactive portal calculator.',
      status: 'archived'
    }
  ];

  const currentList = activeTab === 'active' ? activeNotices : archivedNotices;

  return (
    <section className="section" id="announcements" style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Public Information & Circulars</span>
          <h2 className="section-title">Official Announcements & Public Advisories</h2>
          <p className="section-desc">
            Verified government notices with distinct active status filtering and automatic archival of past events to prevent citizen confusion.
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
                transition: 'all 0.2s ease'
              }}
            >
              Current Active Advisories (2)
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
                transition: 'all 0.2s ease'
              }}
            >
              Archived / Past Notices (2)
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
                    {activeTab === 'active' ? '● Active Announcement' : 'Archived (Event Concluded)'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    {notice.published}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                  {notice.title}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#0369A1', fontWeight: 600, marginBottom: '10px' }}>
                  Jurisdiction: {notice.rpo}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {notice.desc}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B' }}>
                Status: <strong>{notice.validTill}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
