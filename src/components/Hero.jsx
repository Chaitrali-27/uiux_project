import React, { useState } from 'react';
import { ArrowRightIcon, ShieldIcon, CheckIcon, SearchIcon, AlertCircleIcon } from './Icons';

export const Hero = ({ onApplyClick, onTrackClick, onCheckSlotsClick, onFeeClick }) => {
  const [fileNumber, setFileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [trackError, setTrackError] = useState(false);
  const [trackResult, setTrackResult] = useState(null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!fileNumber.trim() || !dob.trim()) {
      setTrackError(true);
      return;
    }
    setTrackError(false);
    setTrackResult({
      fileNo: fileNumber.toUpperCase(),
      applicant: 'Chaitrali Kamble',
      service: 'Fresh Passport (Normal Scheme)',
      status: 'Passport Printed and Dispatched via Speed Post',
      trackingNo: 'SP-MH-94821038IN',
      updatedOn: '24 October 2026'
    });
  };

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Authoritative Value Proposition & Primary Focal Point */}
        <div>
          <div className="hero-badge">
            <span className="gold-dot">●</span> Official Digital Gateway • Government of India
          </div>

          <h1 className="hero-title">
            Delivering Passport Services with Speed, Transparency & Trust
          </h1>

          <p className="hero-subtitle">
            Apply online for Fresh Passports, Re-issue, Police Clearance Certificates (PCC), or monitor your application progress with real-time dispatch tracking.
          </p>

          {/* Primary Action Focal Point */}
          <div className="hero-cta-group">
            <button 
              className="btn btn-saffron btn-lg"
              onClick={onApplyClick}
              title="Start a new passport application"
            >
              <span>Apply for Passport</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            <button 
              className="btn btn-secondary btn-lg"
              onClick={onCheckSlotsClick}
            >
              <span>Check Appointment Slots</span>
            </button>

            <button 
              className="btn btn-outline btn-lg"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
              onClick={onFeeClick}
            >
              <span>Fee Calculator</span>
            </button>
          </div>

          {/* Trust Certifications */}
          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <ShieldIcon className="w-4 h-4" />
              <span>Official 256-bit Encrypted Portal</span>
            </div>
            <div className="trust-badge-item">
              <CheckIcon className="w-4 h-4" />
              <span>550+ Passport Seva & Post Office Centers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Status Tracking Card */}
        <div className="hero-card">
          <div className="hero-card-header">
            <div className="hero-card-title">
              <SearchIcon className="w-4 h-4" />
              <span>Quick Application Tracker</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Real-Time Dispatch</span>
          </div>

          {!trackResult ? (
            <form onSubmit={handleTrackSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="hero-file-no">
                  File Number / Application Reference
                  <span className="required-star">*</span>
                </label>
                <input 
                  id="hero-file-no"
                  type="text" 
                  className={`form-input ${trackError && !fileNumber ? 'is-error' : ''}`}
                  placeholder="e.g. BOM069123456726" 
                  value={fileNumber}
                  onChange={(e) => setFileNumber(e.target.value)}
                />
                {trackError && !fileNumber && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>Please enter your 15-character File Number</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="hero-dob">
                  Date of Birth
                  <span className="required-star">*</span>
                </label>
                <input 
                  id="hero-dob"
                  type="date" 
                  className={`form-input ${trackError && !dob ? 'is-error' : ''}`}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {trackError && !dob && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>Please provide your registered Date of Birth</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-navy" style={{ width: '100%', marginTop: '8px' }}>
                <SearchIcon className="w-4 h-4" />
                <span>Track Status Now</span>
              </button>
            </form>
          ) : (
            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--gov-navy)' }}>{trackResult.fileNo}</span>
                <span className="badge-slot">
                  {trackResult.service}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F766E', marginBottom: '8px' }}>
                ✓ {trackResult.status}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.6 }}>
                Speed Post Ref: <strong>{trackResult.trackingNo}</strong><br />
                Last Updated: {trackResult.updatedOn}
              </div>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ width: '100%', marginTop: '14px' }}
                onClick={() => setTrackResult(null)}
              >
                Track Another File
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
