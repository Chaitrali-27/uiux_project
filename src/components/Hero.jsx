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
      service: 'Fresh Passport (Normal)',
      status: 'Passport Printed and Dispatched via Speed Post',
      trackingNo: 'SP-MH-94821038IN',
      updatedOn: '24 October 2026'
    });
  };

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left Column: Clear Visual Hierarchy & Primary CTAs (UI-04 Fix) */}
        <div>
          <div className="hero-badge">
            <span style={{ color: '#FFB703' }}>●</span> Official Portal • Ministry of External Affairs
            <span className="flaw-tag solved">UI-04 Visual Hierarchy Solved</span>
          </div>

          <h1 className="hero-title">
            Delivering Passport Services with Speed, Transparency & Trust
          </h1>

          <p className="hero-subtitle">
            Apply online for Fresh Passports, Re-issue, Police Clearance Certificates (PCC), or track your application status in real-time.
          </p>

          {/* Primary Action Focal Point (UI-04 & UI-12 Fix) */}
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

          {/* Trust Marks (UI-02 & UX-02 Trust) */}
          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <ShieldIcon className="w-4 h-4" />
              <span>Official GOI 256-bit Encrypted Portal</span>
            </div>
            <div className="trust-badge-item">
              <CheckIcon className="w-4 h-4" />
              <span>550+ PSK & Post Office Centers</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Quick Tracking Card (Focal Point) */}
        <div className="hero-card">
          <div className="hero-card-header">
            <div className="hero-card-title">
              <SearchIcon className="w-4 h-4" />
              <span>Quick Application Tracker</span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Live System</span>
          </div>

          {!trackResult ? (
            <form onSubmit={handleTrackSubmit}>
              {/* Form Input with Top-Aligned Label (UI-09 Fix) */}
              <div className="form-group">
                <label className="form-label" htmlFor="hero-file-no">
                  File Number / Application Ref
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
                {/* UI-13: Error message with icon and red border */}
                {trackError && !fileNumber && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>Please enter your 15-character File Number</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="hero-dob">
                  Date of Birth (DD/MM/YYYY)
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

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <SearchIcon className="w-4 h-4" />
                <span>Track Status Now</span>
              </button>
            </form>
          ) : (
            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0A2540' }}>{trackResult.fileNo}</span>
                <span className="badge-slot" style={{ background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
                  {trackResult.service}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#059669', marginBottom: '8px' }}>
                ✓ {trackResult.status}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.5 }}>
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
