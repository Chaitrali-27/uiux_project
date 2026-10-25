import React, { useState } from 'react';
import { CheckIcon, InfoIcon, ArrowRightIcon } from './Icons';

export const FeeCalculator = ({ onApplyNow }) => {
  const [serviceType, setServiceType] = useState('fresh');
  const [applicantAge, setApplicantAge] = useState('adult');
  const [pages, setPages] = useState('36');
  const [scheme, setScheme] = useState('normal');

  // Realistic Passport Seva Fee Structure
  const calculateFee = () => {
    let base = 1500;
    if (pages === '60') base = 2000;
    if (serviceType === 'pcc') return { base: 500, tatkaal: 0, discount: 0, total: 500 };

    let discount = 0;
    // 10% discount for minor or senior citizens under official rules
    if (applicantAge === 'minor' || applicantAge === 'senior') {
      discount = base * 0.1;
    }

    let tatkaalFee = 0;
    if (scheme === 'tatkaal') {
      tatkaalFee = 2000;
    }

    const total = (base - discount) + tatkaalFee;
    return { base, tatkaal: tatkaalFee, discount, total };
  };

  const { base, tatkaal, discount, total } = calculateFee();

  return (
    <section className="section" id="fee-calculator" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            Financial Transparency
            <span className="flaw-tag solved">UI-06 Weak Form Solved</span>
          </span>
          <h2 className="section-title">Interactive Passport Fee Calculator</h2>
          <p className="section-desc">
            Complete, balanced form layout with instant fee breakdown, age concessions, and transparent pricing under Passport Rules 1980.
          </p>
        </div>

        {/* UI-06 Fix: Balanced, rich form layout replacing empty single-dropdown */}
        <div className="fee-calculator-card">
          {/* Left Column: Form Controls */}
          <div>
            {/* UI-09 Fix: Top-Aligned Label with helpful sentence case */}
            <div className="form-group">
              <label className="form-label" htmlFor="fee-service">
                Application Service Type
                <span className="form-label-helper">Choose the category of application</span>
              </label>
              <select 
                id="fee-service"
                className="form-select"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="fresh">Fresh Passport (New Applicant)</option>
                <option value="reissue">Re-issue / Renewal of Passport</option>
                <option value="pcc">Police Clearance Certificate (PCC)</option>
                <option value="surrender">Surrender Certificate</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fee-age">
                  Applicant Age Group
                </label>
                <select 
                  id="fee-age"
                  className="form-select"
                  value={applicantAge}
                  onChange={(e) => setApplicantAge(e.target.value)}
                >
                  <option value="adult">Adult (18 to 59 years)</option>
                  <option value="minor">Minor (Below 18 years) - 10% Off</option>
                  <option value="senior">Senior Citizen (60+ years) - 10% Off</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="fee-pages">
                  Passport Booklet Size
                </label>
                <select 
                  id="fee-pages"
                  className="form-select"
                  value={pages}
                  disabled={serviceType === 'pcc'}
                  onChange={(e) => setPages(e.target.value)}
                >
                  <option value="36">Standard Booklet (36 Pages)</option>
                  <option value="60">Frequent Flyer (60 Pages)</option>
                </select>
              </div>
            </div>

            {/* Scheme Type Selector */}
            <div className="form-group">
              <label className="form-label">
                Required Processing Scheme
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div 
                  onClick={() => setScheme('normal')}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: scheme === 'normal' ? '2px solid var(--gov-accent)' : '1px solid var(--border-medium)',
                    background: scheme === 'normal' ? '#F0F7FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#0A2540' }}>Normal Scheme</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Standard processing (15-20 days)</div>
                </div>

                <div 
                  onClick={() => setScheme('tatkaal')}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: scheme === 'tatkaal' ? '2px solid var(--gov-accent)' : '1px solid var(--border-medium)',
                    background: scheme === 'tatkaal' ? '#F0F7FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#0A2540' }}>Tatkaal Scheme (+₹2,000)</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Urgent processing (1-3 days)</div>
                </div>
              </div>
            </div>

            {/* Legal Advisory / Helper Note */}
            <div style={{ display: 'flex', gap: '10px', background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
              <InfoIcon className="w-5 h-5" style={{ color: '#0066CC', flexShrink: 0 }} />
              <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
                Payment can be made online via State Bank of India (SBI) Net Banking, Credit/Debit Cards, UPI, or via SBI Bank Challan at any branch.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Fee Breakdown Card */}
          <div className="fee-breakdown-panel">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8' }}>
                  Estimated Fee Summary
                </span>
                <span className="badge-slot" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                  Live Calculation
                </span>
              </div>

              <div className="fee-total-amount">
                ₹{total.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12.5px', color: '#CBD5E1', marginBottom: '20px' }}>
                Inclusive of Government taxes & postal dispatch charges.
              </div>

              <div className="fee-row">
                <span>Base Application Fee ({pages} Pages):</span>
                <span>₹{base.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="fee-row" style={{ color: '#4ADE80' }}>
                  <span>Concession Discount (10%):</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {tatkaal > 0 && (
                <div className="fee-row" style={{ color: '#FDBA74' }}>
                  <span>Tatkaal Expedited Surcharge:</span>
                  <span>+ ₹{tatkaal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="fee-row total">
                <span>Total Amount Payable:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              className="btn btn-saffron" 
              style={{ width: '100%', marginTop: '24px' }}
              onClick={onApplyNow}
            >
              <span>Proceed to Apply with This Fee</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
