import React, { useState } from 'react';
import { ArrowRightIcon, ShieldIcon, CheckIcon, SearchIcon, AlertCircleIcon } from './Icons';
import { getTranslation } from '../utils/translations';

export const Hero = ({ 
  language = 'en', 
  onApplyClick, 
  onTrackClick, 
  onCheckSlotsClick, 
  onDocAdvisorClick 
}) => {
  const t = getTranslation(language);
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
      padding: '48px 0 52px 0',
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
        {/* Left Column: Authoritative, Uncluttered National Value Proposition */}
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
            fontSize: '12px',
            color: '#FDE047',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            <span>🇮🇳</span>
            <span>{t.heroTag}</span>
          </div>

          {/* Grand Heading with Dynamic Visual Emphasis */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '0.02em',
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>
            {t.heroTitle}
          </h1>

          <p style={{
            fontSize: '15.5px',
            lineHeight: 1.6,
            color: '#E2E8F0',
            marginBottom: '28px',
            maxWidth: '560px'
          }}>
            {t.heroSubtitle}
          </p>

          {/* Primary Action Buttons — Clean & Uncluttered */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
            <button 
              className="btn btn-saffron btn-lg"
              onClick={onApplyClick}
              style={{ padding: '12px 24px', fontSize: '15px', fontWeight: 700 }}
              title="Start a new passport application"
            >
              <span>{t.applyPassportBtn}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={onDocAdvisorClick}
              style={{ background: '#FFFFFF', color: '#081E3A', padding: '12px 20px', fontSize: '15px', fontWeight: 700 }}
            >
              <span>{t.docAdvisorBtn} 📄</span>
            </button>

            <button 
              className="btn btn-outline btn-lg"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', padding: '12px 18px', fontSize: '14.5px' }}
              onClick={onCheckSlotsClick}
            >
              <span>{t.checkSlotsBtn} 📅</span>
            </button>
          </div>

          {/* Clean Single-Line Trust Marks */}
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '12.5px', color: '#CBD5E1' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldIcon className="w-4 h-4" style={{ color: '#FDE047' }} /> {t.trustPill1}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckIcon className="w-4 h-4" style={{ color: '#86EFAC' }} /> {t.trustPill2}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldIcon className="w-4 h-4" style={{ color: '#93C5FD' }} /> {t.trustPill3}
            </span>
          </div>
        </div>

        {/* Right Column: Sleek, Compact Live Application Tracker (Fully Translated) */}
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
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--gov-navy)' }}>
                  {t.trackBoxTitle}
                </h3>
                <span style={{ fontSize: '11px', color: '#0F766E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>●</span> {t.trackBoxBadge}
                </span>
              </div>
            </div>

            {/* Autofill Sample Button */}
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
              {t.sampleFillBtn}
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
                fontSize: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: activeTab === 'file' ? 'var(--shadow-subtle)' : 'none'
              }}
            >
              {t.tabFileNo}
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
                fontSize: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: activeTab === 'consignment' ? 'var(--shadow-subtle)' : 'none'
              }}
            >
              {t.tabSpeedPost}
            </button>
          </div>

          <form onSubmit={handleTrackSubmit}>
            {activeTab === 'file' ? (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                    {t.fileNoLabel} <span style={{ color: 'var(--gov-red)' }}>*</span>
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
                      Please enter your File Number
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                    {t.dobLabel} <span style={{ color: 'var(--gov-red)' }}>*</span>
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  {t.barcodeLabel} <span style={{ color: 'var(--gov-red)' }}>*</span>
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
                    Please enter your Speed Post Barcode
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
              <span>{t.trackStatusBtn}</span>
            </button>

            {/* Micro Stepper Preview */}
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
              <span>✓ {t.stepperAccepted}</span>
              <span>✓ {t.stepperBiometrics}</span>
              <span style={{ color: '#0F766E', fontWeight: 700 }}>✓ {t.stepperVerified}</span>
              <span>📦 {t.stepperDispatched}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
