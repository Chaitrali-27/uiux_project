import React from 'react';
import { ShieldIcon, CheckIcon, XIcon } from './Icons';

export const SecurityTrustModal = ({ isOpen, onClose }) => {
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
      zIndex: 1500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        width: '100%',
        maxWidth: '520px',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid var(--border-medium)',
        padding: '30px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#F0FDF4',
              color: '#0F766E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #BBF7D0'
            }}>
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)' }}>
                Official Security & Trust Verification
              </h3>
              <div style={{ fontSize: '12.5px', color: '#0F766E', fontWeight: 600 }}>
                ✓ Valid Ministry of External Affairs SSL Certificate
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '20px' }}>
          You are securely connected to the official <strong>Passport Seva Online Portal</strong> under the sovereign jurisdiction of the Government of India.
        </div>

        {/* Certificate Inspection Details */}
        <div style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
            <div>
              <div style={{ color: '#64748B' }}>Domain Certificate:</div>
              <strong style={{ color: 'var(--gov-navy)' }}>*.passportindia.gov.in</strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Issuing Authority:</div>
              <strong style={{ color: 'var(--gov-navy)' }}>NIC CA / CCA India</strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Encryption Standard:</div>
              <strong style={{ color: 'var(--gov-navy)' }}>TLS 1.3 (256-bit AES)</strong>
            </div>
            <div>
              <div style={{ color: '#64748B' }}>Compliance:</div>
              <strong style={{ color: 'var(--gov-navy)' }}>STQC Certified Level AAA</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#0F766E', marginBottom: '20px' }}>
          <CheckIcon className="w-4 h-4" />
          <span>All linked National Services & State Portals verified secure.</span>
        </div>

        <button 
          className="btn btn-navy"
          style={{ width: '100%' }}
          onClick={onClose}
        >
          Return to Portal
        </button>
      </div>
    </div>
  );
};
