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
      center: 'PSK Lower Parel, Mumbai',
      consignment: 'SP-MH-94821038IN'
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', fontFamily: 'var(--font-serif)' }}>
      {/* Top Welcome Bar with Crystal-Clear High-Contrast Typography */}
      <div style={{
        background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        border: '2px solid var(--gov-gold)',
        boxShadow: '0 8px 24px rgba(8, 30, 58, 0.25)'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            🇮🇳 Citizen Applicant Portal Session
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 800,
            fontFamily: 'var(--font-serif)',
            marginTop: '4px',
            color: '#FFFFFF',
            lineHeight: 1.2
          }}>
            Welcome, <span style={{ color: '#FDE047', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {user?.name || 'SHRAVANI DESHMUKH'}
            </span>
          </h2>
          <div style={{ fontSize: '13.5px', color: '#E2E8F0', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Registered Account: <strong style={{ color: '#FFFFFF' }}>{user?.email || 'shravani@gmail.com'}</strong></span>
            <span>•</span>
            <span style={{ color: '#86EFAC', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckIcon className="w-3.5 h-3.5" /> National ID Verified (Aadhaar / DigiLocker)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Quick Help & FAQs button */}
          <button 
            className="btn btn-outline btn-sm"
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)' }}
            onClick={onOpenFaq}
          >
            ❓ Help & FAQs
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={onLogout}
            style={{ background: '#FFFFFF', color: '#081E3A', fontWeight: 700 }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Single, Uncluttered Navigation Bar */}
      <div style={{
        display: 'flex',
        gap: '4px',
        borderBottom: '2px solid var(--border-medium)',
        marginBottom: '28px'
      }}>
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'applications', label: `My Submitted Applications (${myApplications.length})` },
          { id: 'receipts', label: 'Payment & Receipts' },
          { id: 'grievance', label: 'Grievance & Support' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--gov-navy)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--gov-navy)' : '#64748B',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '15px',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left Column: Active Application Status */}
          <div>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  Active Passport Application
                </h3>
                <span className="badge badge-emerald" style={{ fontSize: '12px' }}>
                  File Ref: BOM069123456726
                </span>
              </div>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Service Category</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)' }}>
                    Fresh Passport (36 Pages)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Submission Date</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)' }}>
                    18 October 2026
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Center Attended</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
                    PSK Lower Parel, Mumbai
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Current Stage</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F766E' }}>
                    Police Verification Completed
                  </div>
                </div>
              </div>

              {/* Progress Stepper Ribbon */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  <span>Application Submitted</span>
                  <span>PSK Biometrics</span>
                  <span style={{ color: '#0F766E' }}>Police Cleared ✓</span>
                  <span style={{ color: '#C29329' }}>Printing (Active)</span>
                  <span>Dispatched</span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #0F766E 0%, #C29329 100%)' }} />
                </div>
              </div>

              <div style={{
                background: '#F8FAFC',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '13px', color: '#334155' }}>
                  Consignment No: <strong>SP-MH-94821038IN</strong> (India Post Speed Post)
                </div>
                <button
                  onClick={() => alert('India Post Live Stepper: Dispatched from Nashik Security Press. In transit to Mumbai Sorting Hub.')}
                  style={{
                    background: '#081E3A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Track Consignment
                </button>
              </div>
            </div>

            {/* Quick Action: Apply Fresh */}
            <div style={{
              background: '#F0FDF4',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #BBF7D0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F766E', margin: '0 0 4px 0' }}>
                  Need another passport service?
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                  Apply for Minor passport, Police Clearance Certificate (PCC), or Re-issue booklet.
                </p>
              </div>
              <button 
                className="btn btn-navy"
                onClick={onNewApplication}
                style={{ padding: '10px 18px', fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                + Start New Application
              </button>
            </div>
          </div>

          {/* Right Column: Quick Citizen Tools */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '16px' }}>
              Quick Citizen Self-Help
            </h3>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-medium)',
              padding: '20px',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>❓</span>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  Search Document Advisor
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
                Check list of required documents for all age groups.
              </p>
              <button 
                className="btn btn-outline btn-sm"
                onClick={onOpenFaq}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Open Document Guide
              </button>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-medium)',
              padding: '20px',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>📅</span>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  Reschedule Appointment
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
                You have 3 free rescheduling chances within 12 months.
              </p>
              <button 
                className="btn btn-outline btn-sm"
                onClick={onCheckSlots}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Check Alternate Slots
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-medium)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '16px' }}>
            Submitted Application History
          </h3>
          <table className="fee-table">
            <thead>
              <tr>
                <th>File Reference</th>
                <th>Service Name</th>
                <th>Application Date</th>
                <th>Center</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.id}</strong></td>
                  <td>{app.service}</td>
                  <td>{app.submittedOn}</td>
                  <td>{app.center}</td>
                  <td><span className="badge badge-emerald">{app.stage}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'receipts' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-medium)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '12px' }}>
            Fee Payment Receipts & Challans
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
            Transaction Ref: <strong>SBI-EPAY-984210382</strong> • Amount Paid: <strong>₹1,500.00</strong> • Status: <strong>PAID</strong>
          </p>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => alert('Receipt downloaded: SBI-EPAY-984210382.pdf')}
          >
            📥 Download Official MEA Payment Receipt (PDF)
          </button>
        </div>
      )}

      {activeTab === 'grievance' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-medium)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '12px' }}>
            Register Citizen Grievance / Feedback
          </h3>
          <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '16px' }}>
            Track any issue directly with your Regional Passport Officer or National Call Centre.
          </p>
          <button 
            className="btn btn-navy btn-sm"
            onClick={() => alert('Grievance ticket created. Resolution turnaround: 48 working hours.')}
          >
            Log New Support Ticket
          </button>
        </div>
      )}
    </div>
  );
};
