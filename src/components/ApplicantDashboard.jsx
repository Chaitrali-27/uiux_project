import React, { useState } from 'react';
import { UserIcon, ShieldIcon, CheckIcon, SearchIcon, ArrowRightIcon } from './Icons';

export const ApplicantDashboard = ({ user, onLogout, onNewApplication, onOpenFaq, onCheckSlots }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const myApplications = [
    {
      id: 'BOM069123456726',
      service: 'Fresh Passport (36 Pages)',
      submittedOn: '18 October 2026',
      stage: 'Police Verification Completed',
      status: 'Printing in Progress',
      appointmentDate: '21 October 2026',
      center: 'PSK Lower Parel, Mumbai'
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 16px' }}>
      {/* Top Welcome Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
        borderRadius: '16px',
        padding: '24px 32px',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        border: '1px solid rgba(194, 147, 41, 0.3)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--gov-gold)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
            Applicant Portal Session
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
            Welcome, {user?.name || 'Citizen Applicant'}
          </h2>
          <div style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px' }}>
            Registered Account: <strong>{user?.email || 'applicant@passportindia.gov.in'}</strong> • National ID Verified
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* UX-09 Fix: Persistent FAQ/Help button post-login */}
          <button 
            className="btn btn-outline btn-sm"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={onOpenFaq}
          >
            ❓ Help & FAQs
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Streamlined Dashboard Navigation (UX-08 Fix: Zero Duplicate Links) */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #E2E8F0', marginBottom: '24px' }}>
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'applications', label: 'My Submitted Applications (1)' },
          { id: 'payments', label: 'Payment & Receipts' },
          { id: 'help', label: 'Grievance & Support' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14.5px',
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? 'var(--gov-navy)' : '#64748B',
              borderBottom: activeTab === tab.id ? '3px solid var(--gov-navy)' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Panel Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column: Active Application Status */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)' }}>
                Active Passport Application
              </h3>
              <span className="badge-slot">
                File Ref: BOM069123456726
              </span>
            </div>

            {myApplications.map((app) => (
              <div key={app.id} style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Service Category</div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>{app.service}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Submission Date</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{app.submittedOn}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Center Attended</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{app.center}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>Current Stage</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F766E' }}>{app.stage}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ background: '#E2E8F0', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #0F766E 0%, #10B981 100%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B' }}>
                  <span>Application Submitted</span>
                  <span>Biometrics Verified</span>
                  <strong style={{ color: '#0F766E' }}>Police Verified ✓</strong>
                  <span>Postal Dispatch</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button className="btn btn-saffron btn-sm" onClick={onNewApplication}>
                + Apply for Another Service / Family Member
              </button>
              <button className="btn btn-secondary btn-sm" onClick={onCheckSlots}>
                Check Appointment Availability
              </button>
            </div>
          </div>

          {/* Right Column: Quick Citizen Utilities */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              Quick Citizen Self-Help
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div 
                onClick={onOpenFaq}
                style={{ padding: '14px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--gov-navy)' }}>❓ Search Document Advisor</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Check list of required documents for all age groups.</div>
              </div>

              <div 
                onClick={onOpenFaq}
                style={{ padding: '14px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--gov-navy)' }}>📅 Reschedule Appointment</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>You have 3 free reschedulings available this year.</div>
              </div>

              <div 
                style={{ padding: '14px', borderRadius: '10px', background: '#EFF6FF', border: '1px solid #BFDBFE' }}
              >
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#1E40AF' }}>National Citizen Helpline</div>
                <div style={{ fontSize: '12px', color: '#1E3A8A', marginTop: '4px' }}>
                  Call <strong>1800-258-1800</strong> (Toll Free) Mon–Sun 8 AM to 10 PM.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && (
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)' }}>Section Synchronized</h4>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '6px' }}>
            All related data and receipts are up to date under your verified account.
          </p>
        </div>
      )}
    </div>
  );
};
