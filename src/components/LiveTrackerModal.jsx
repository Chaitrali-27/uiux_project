import React, { useState } from 'react';
import { XIcon, CheckIcon, ShieldIcon } from './Icons';

export const LiveTrackerModal = ({ isOpen, onClose, fileNo = 'BOM069123456726' }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const trackingNumber = 'SP-MH-94821038IN';

  const copyTracking = () => {
    navigator.clipboard?.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { title: 'Online Application & Fee Verified', date: '18 October 2026', desc: 'Application Form 1 accepted. Statutory fee payment of ₹1,500 reconciled via SBI e-Pay.', completed: true },
    { title: 'PSK Biometric & Document Verification', date: '21 October 2026', desc: 'Applicant biometrics, digital photo, and original address proof verified at PSK Lower Parel.', completed: true },
    { title: 'Police Verification Completed', date: '23 October 2026', desc: 'Clear report submitted electronically by Special Branch, Local Police Commissionerate.', completed: true },
    { title: 'Printing & Quality Inspection at ISP', date: '24 October 2026', desc: '36-Page booklet printed with biometric chip encoding at India Security Press, Nashik.', completed: true },
    { title: 'Dispatched via India Post Speed Post', date: '25 October 2026', desc: 'Consignment handed over to Department of Posts. Expected delivery within 48 hours.', completed: true, active: true }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 1450,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid var(--border-medium)',
        padding: '32px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gov-gold)', fontWeight: 700 }}>
              Live National Dispatch System
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
              Real-Time Passport Tracking Status
            </h2>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
              File Reference: <strong>{fileNo}</strong> • Applicant: <strong>Chaitrali Kamble</strong>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Dispatch Barcode Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
          borderRadius: '14px',
          padding: '20px',
          color: '#FFFFFF',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(194, 147, 41, 0.3)'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--gov-gold)', textTransform: 'uppercase', fontWeight: 700 }}>
              India Post Speed Post Consignment
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.05em', marginTop: '2px', fontFamily: 'monospace' }}>
              {trackingNumber}
            </div>
            <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '2px' }}>
              Status: <strong>In Transit — Out for Physical Delivery</strong>
            </div>
          </div>

          <button
            onClick={copyTracking}
            className="btn btn-secondary btn-sm"
            style={{ background: '#FFFFFF', color: 'var(--gov-navy)' }}
          >
            {copied ? '✓ Copied Number' : 'Copy Tracking No.'}
          </button>
        </div>

        {/* 5-Stage Stepper */}
        <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute',
            left: '11px',
            top: '8px',
            bottom: '24px',
            width: '2px',
            background: '#0F766E'
          }} />

          {steps.map((st, idx) => (
            <div key={idx} style={{ position: 'relative', marginBottom: '24px' }}>
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '0px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#0F766E',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 0 2px #0F766E'
              }}>
                ✓
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontSize: '15.5px', color: 'var(--gov-navy)' }}>
                    {st.title}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#0F766E', fontWeight: 600 }}>
                    {st.date}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-navy" onClick={onClose}>
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
