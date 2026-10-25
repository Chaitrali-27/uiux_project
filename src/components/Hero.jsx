import React, { useState } from 'react';
import { ArrowRightIcon, ShieldIcon, CheckIcon, SearchIcon, AlertCircleIcon } from './Icons';

export const Hero = ({ onApplyClick, onTrackClick, onCheckSlotsClick, onFeeClick, onDocAdvisorClick }) => {
  const [activeTab, setActiveTab] = useState('file'); // 'file' or 'consignment'
  const [fileNumber, setFileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [consignmentNo, setConsignmentNo] = useState('');
  const [trackError, setTrackError] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'file') {
      if (!fileNumber.trim() || !dob.trim()) {
        setTrackError(true);
        return;
      }
      setTrackError(false);
      onTrackClick(fileNumber.trim().toUpperCase());
    } else {
      if (!consignmentNo.trim()) {
        setTrackError(true);
        return;
      }
      setTrackError(false);
      onTrackClick(consignmentNo.trim().toUpperCase());
    }
  };

  const handleAutofillSample = () => {
    if (activeTab === 'file') {
      setFileNumber('BOM069123456726');
      setDob('1998-05-15');
    } else {
      setConsignmentNo('SP-MH-94821038IN');
    }
    setTrackError(false);
  };

  return (
    <section className="hero-section" style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #051428 0%, #0A2244 50%, #0D2D58 100%)',
      color: '#FFFFFF',
      padding: '48px 0 56px 0',
      borderBottom: '3px solid var(--gov-gold)',
      overflow: 'hidden',
      fontFamily: 'var(--font-serif)'
    }}>
      {/* Sovereign Tricolor Accent Ribbon */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #E25822 0%, #FFFFFF 50%, #0F766E 100%)'
      }} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.95fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        {/* Left Column: Authoritative National Value Proposition */}
        <div>
          {/* Official National Portal Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(194, 147, 41, 0.4)',
            padding: '6px 14px',
            borderRadius: '9999px',
            marginBottom: '18px',
            fontSize: '12.5px',
            color: '#FDE047',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            <span>🇮🇳</span>
            <span>Official Digital Portal • Ministry of External Affairs, Government of India</span>
          </div>

          {/* Grand Heading with Dynamic Visual Contrast */}
          <h1 style={{
            fontSize: '38px',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '0.02em',
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>
            Delivering Passport Services with{' '}
            <span style={{ color: '#FDE047', textShadow: '0 2px 10px rgba(253, 224, 71, 0.3)' }}>
              Speed
            </span>
            ,{' '}
            <span style={{ color: '#86EFAC', textShadow: '0 2px 10px rgba(134, 239, 172, 0.3)' }}>
              Transparency
            </span>{' '}
            &{' '}
            <span style={{ color: '#FCD34D' }}>
              Sovereign Trust
            </span>
          </h1>

          <p style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#E2E8F0',
            marginBottom: '24px',
            maxWidth: '560px'
          }}>
            Apply online for Fresh Passports, Re-issue, Police Clearance Certificates (PCC), or monitor your application progress with real-time India Post Speed Post tracking.
          </p>

          {/* Quick Highlights Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '28px',
            maxWidth: '560px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '10px 12px',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '12px', color: '#FDE047', fontWeight: 700 }}>⚡ Tatkaal Dispatch</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>1 to 3 Days</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '10px 12px',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '12px', color: '#86EFAC', fontWeight: 700 }}>📍 Nationwide Reach</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>550+ Kendras</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '10px 12px',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '12px', color: '#93C5FD', fontWeight: 700 }}>🔒 National ID Check</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>DigiLocker & UIDAI</div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button 
              className="btn btn-saffron btn-lg"
              onClick={onApplyClick}
              style={{ padding: '12px 24px', fontSize: '15px', fontWeight: 700 }}
              title="Start a new passport application"
            >
              <span>Apply for Passport</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={onDocAdvisorClick}
              style={{ background: '#FFFFFF', color: '#081E3A', padding: '12px 20px', fontSize: '15px', fontWeight: 700 }}
            >
              <span>Document Advisor 📄</span>
            </button>

            <button 
              className="btn btn-outline btn-lg"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', padding: '12px 18px', fontSize: '14.5px' }}
              onClick={onCheckSlotsClick}
            >
              <span>Appointment Slots 📅</span>
            </button>
          </div>
        </div>

        {/* Right Column: Sleek, Compact Live Application Tracker (Refined Proportions) */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
          border: '2px solid var(--gov-gold)',
          padding: '24px',
          color: 'var(--text-heading)',
          maxWidth: '430px',
          margin: '0 auto'
        }}>
          {/* Card Header & Tracker Mode Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#081E3A',
                color: '#FDE047',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                🔍
              </div>
              <div>
                <h3 style={{ fontSize: '16.5px', fontWeight: 700, margin: 0, color: 'var(--gov-navy)' }}>
                  Live Application Tracker
                </h3>
                <span style={{ fontSize: '11px', color: '#0F766E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>●</span> India Post API Connected
                </span>
              </div>
            </div>

            {/* Autofill Pill */}
            <button
              type="button"
              onClick={handleAutofillSample}
              style={{
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                color: '#92400E',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Click to fill sample file BOM069123456726"
            >
              Sample Fill ⚡
            </button>
          </div>

          {/* Mode Switch Tabs */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('file'); setTrackError(false); }}
              style={{
                flex: 1,
                padding: '7px',
                border: 'none',
                background: activeTab === 'file' ? '#FFFFFF' : 'none',
                color: activeTab === 'file' ? 'var(--gov-navy)' : '#64748B',
                fontWeight: 700,
                fontSize: '12.5px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: activeTab === 'file' ? 'var(--shadow-subtle)' : 'none'
              }}
            >
              15-Digit File No.
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('consignment'); setTrackError(false); }}
              style={{
                flex: 1,
                padding: '7px',
                border: 'none',
                background: activeTab === 'consignment' ? '#FFFFFF' : 'none',
                color: activeTab === 'consignment' ? 'var(--gov-navy)' : '#64748B',
                fontWeight: 700,
                fontSize: '12.5px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: activeTab === 'consignment' ? 'var(--shadow-subtle)' : 'none'
              }}
            >
              Speed Post Barcode
            </button>
          </div>

          <form onSubmit={handleTrackSubmit}>
            {activeTab === 'file' ? (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                    File Number / Application Reference <span style={{ color: 'var(--gov-red)' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. BOM069123456726" 
                    value={fileNumber}
                    onChange={(e) => setFileNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: trackError && !fileNumber ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)',
                      fontSize: '13.5px',
                      color: 'var(--text-heading)'
                    }}
                  />
                  {trackError && !fileNumber && (
                    <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>
                      Please enter your 15-character File Number
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                    Date of Birth (DOB) <span style={{ color: 'var(--gov-red)' }}>*</span>
                  </label>
                  <input 
                    type="date" 
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: trackError && !dob ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)',
                      fontSize: '13.5px',
                      color: 'var(--text-heading)'
                    }}
                  />
                  {trackError && !dob && (
                    <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>
                      Please provide your registered Date of Birth
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Speed Post Consignment Barcode <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. SP-MH-94821038IN" 
                  value={consignmentNo}
                  onChange={(e) => setConsignmentNo(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: trackError && !consignmentNo ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)',
                    fontSize: '13.5px',
                    color: 'var(--text-heading)'
                  }}
                />
                {trackError && !consignmentNo && (
                  <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>
                    Please enter your 13-character Speed Post Barcode
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-navy" 
              style={{ width: '100%', padding: '10px', fontSize: '13.5px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <SearchIcon className="w-4 h-4" />
              <span>Track Live Dispatch Status</span>
            </button>

            {/* Micro Stepper Preview */}
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#64748B' }}>
              <span>✓ Accepted</span>
              <span>✓ Biometrics</span>
              <span style={{ color: '#0F766E', fontWeight: 700 }}>✓ Verified</span>
              <span>📦 Dispatched</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
