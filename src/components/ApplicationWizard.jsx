import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, CheckIcon, AlertCircleIcon, ShieldIcon, InfoIcon, XIcon } from './Icons';

export const ApplicationWizard = ({ isOpen, onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState('All changes saved to local draft');

  // Form State with LocalStorage Draft Persistence (UX-11 Fix)
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('passport_application_draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Draft load error', e);
      }
    }
    return {
      serviceType: 'fresh',
      bookletPages: '36',
      scheme: 'normal',
      givenName: '',
      surname: '',
      gender: 'female',
      dob: '',
      placeOfBirth: '',
      maritalStatus: 'single',
      aadhaarNo: '',
      // UX-13 Fix: Distinctly separated Purpose and Duration fields
      visitPurpose: 'Tourism & Leisure',
      visitPurposeDetails: '',
      durationDays: '15',
      durationStartDate: '',
      durationEndDate: '',
      // UX-12 Fix: Distinct legal declaration commitments
      declarationCitizenship: false,
      declarationNoCriminal: false,
      declarationAccurateInfo: false
    };
  });

  const [errors, setErrors] = useState({});

  // Auto-save on every change (UX-11 Fix)
  useEffect(() => {
    localStorage.setItem('passport_application_draft', JSON.stringify(formData));
    setSaveStatus('Draft auto-saved just now');
    const timer = setTimeout(() => {
      setSaveStatus('All changes saved in local draft');
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.serviceType) errs.serviceType = 'Please select service type';
    } else if (currentStep === 2) {
      if (!formData.givenName.trim()) errs.givenName = 'Given name is required';
      if (!formData.surname.trim()) errs.surname = 'Surname is required';
      if (!formData.dob) errs.dob = 'Date of birth is required';
      if (!formData.placeOfBirth.trim()) errs.placeOfBirth = 'Village / Town / City of birth is required';
    } else if (currentStep === 3) {
      // UX-13 Validation
      if (!formData.visitPurpose) errs.visitPurpose = 'Please state purpose of visit';
      if (!formData.durationDays || Number(formData.durationDays) <= 0) {
        errs.durationDays = 'Please specify valid duration of stay in days';
      }
    } else if (currentStep === 4) {
      // UX-12 Validation
      if (!formData.declarationCitizenship || !formData.declarationNoCriminal || !formData.declarationAccurateInfo) {
        errs.declarations = 'You must affirm all legal declaration commitments to submit.';
      }
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step < 4) {
      setStep(step + 1);
    } else {
      localStorage.removeItem('passport_application_draft');
      onFinish?.();
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 1300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '820px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Wizard Header */}
        <div style={{
          padding: '20px 28px',
          background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid var(--gov-gold)'
        }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gov-gold)', fontWeight: 700 }}>
              Form 1 • Government of India
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
              Passport Application Initiation Wizard
            </h2>
            {/* UX-11: Real-time Draft Saving Status */}
            <div style={{ fontSize: '12px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span>●</span> {saveStatus}
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '6px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (UX-15 Clarity) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '16px 28px',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-light)',
          gap: '12px'
        }}>
          {[
            { num: 1, label: 'Service Category' },
            { num: 2, label: 'Applicant Details' },
            { num: 3, label: 'Travel Purpose & Duration' },
            { num: 4, label: 'Declaration & Submit' }
          ].map((s) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step === s.num ? 'var(--gov-navy)' : step > s.num ? '#0F766E' : '#E2E8F0',
                color: step >= s.num ? '#FFFFFF' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700
              }}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: step === s.num ? 700 : 500,
                color: step === s.num ? 'var(--gov-navy)' : '#64748B'
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Form Content */}
        <div style={{ padding: '28px', flexGrow: 1 }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                Step 1: Choose Your Application Type
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '20px' }}>
                Select whether you are applying for a first-time passport or renewing an expired passport booklet.
              </p>

              <div className="form-group">
                <label className="form-label">Applying for</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <label style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: formData.serviceType === 'fresh' ? '2px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                    background: formData.serviceType === 'fresh' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="radio" 
                      name="serviceType" 
                      checked={formData.serviceType === 'fresh'} 
                      onChange={() => updateField('serviceType', 'fresh')} 
                    />
                    <strong style={{ display: 'block', fontSize: '15px', marginTop: '6px', color: 'var(--gov-navy)' }}>Fresh Passport</strong>
                    <span style={{ fontSize: '12.5px', color: '#64748B' }}>For citizens who have never held an Indian passport before.</span>
                  </label>

                  <label style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: formData.serviceType === 'reissue' ? '2px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                    background: formData.serviceType === 'reissue' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="radio" 
                      name="serviceType" 
                      checked={formData.serviceType === 'reissue'} 
                      onChange={() => updateField('serviceType', 'reissue')} 
                    />
                    <strong style={{ display: 'block', fontSize: '15px', marginTop: '6px', color: 'var(--gov-navy)' }}>Re-issue of Passport</strong>
                    <span style={{ fontSize: '12.5px', color: '#64748B' }}>Validity expired within 3 years or exhausted booklet pages.</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Type of Application</label>
                  <select 
                    className="form-select"
                    value={formData.scheme}
                    onChange={(e) => updateField('scheme', e.target.value)}
                  >
                    <option value="normal">Normal (Standard 15–20 Days)</option>
                    <option value="tatkaal">Tatkaal Expedited (1–3 Days)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Type of Passport Booklet</label>
                  <select 
                    className="form-select"
                    value={formData.bookletPages}
                    onChange={(e) => updateField('bookletPages', e.target.value)}
                  >
                    <option value="36">36 Pages (Standard Traveller)</option>
                    <option value="60">60 Pages (Frequent Business Flyer)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                Step 2: Applicant Identity Details
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '20px' }}>
                Please provide your personal details exactly as printed on your Aadhaar Card or Secondary School Certificate.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="w-fname">
                    Given Name (First + Middle Name)
                    <span className="required-star">*</span>
                  </label>
                  <input 
                    id="w-fname"
                    type="text" 
                    className={`form-input ${errors.givenName ? 'is-error' : ''}`}
                    placeholder="e.g. Chaitrali"
                    value={formData.givenName}
                    onChange={(e) => updateField('givenName', e.target.value)}
                  />
                  {errors.givenName && (
                    <div className="form-error-msg">
                      <AlertCircleIcon className="w-3.5 h-3.5" />
                      <span>{errors.givenName}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="w-lname">
                    Surname
                    <span className="required-star">*</span>
                  </label>
                  <input 
                    id="w-lname"
                    type="text" 
                    className={`form-input ${errors.surname ? 'is-error' : ''}`}
                    placeholder="e.g. Kamble"
                    value={formData.surname}
                    onChange={(e) => updateField('surname', e.target.value)}
                  />
                  {errors.surname && (
                    <div className="form-error-msg">
                      <AlertCircleIcon className="w-3.5 h-3.5" />
                      <span>{errors.surname}</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="w-dob">
                    Date of Birth
                    <span className="required-star">*</span>
                  </label>
                  <input 
                    id="w-dob"
                    type="date" 
                    className={`form-input ${errors.dob ? 'is-error' : ''}`}
                    value={formData.dob}
                    onChange={(e) => updateField('dob', e.target.value)}
                  />
                  {errors.dob && (
                    <div className="form-error-msg">
                      <AlertCircleIcon className="w-3.5 h-3.5" />
                      <span>{errors.dob}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="w-place">
                    Place of Birth (Village / Town / City)
                    <span className="required-star">*</span>
                  </label>
                  <input 
                    id="w-place"
                    type="text" 
                    className={`form-input ${errors.placeOfBirth ? 'is-error' : ''}`}
                    placeholder="e.g. Mumbai, Pune, Nagpur"
                    value={formData.placeOfBirth}
                    onChange={(e) => updateField('placeOfBirth', e.target.value)}
                  />
                  {errors.placeOfBirth && (
                    <div className="form-error-msg">
                      <AlertCircleIcon className="w-3.5 h-3.5" />
                      <span>{errors.placeOfBirth}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              UX-13 FIX: Separated Purpose and Duration of Visit
              ======================================================== */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                Step 3: Purpose and Duration of Travel
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '20px' }}>
                Clearly specifies the distinct reason for international travel and the expected duration of stay.
              </p>

              {/* Field 1: Distinct Purpose of Visit */}
              <div className="form-group">
                <label className="form-label" htmlFor="w-purpose">
                  Primary Purpose of Visit
                  <span className="required-star">*</span>
                </label>
                <select 
                  id="w-purpose"
                  className="form-select"
                  value={formData.visitPurpose}
                  onChange={(e) => updateField('visitPurpose', e.target.value)}
                >
                  <option value="Tourism & Leisure">Tourism & Leisure Exploration</option>
                  <option value="Higher Education / University">Higher Studies / University Admission</option>
                  <option value="Business & Conferences">Commercial Business & Conferences</option>
                  <option value="Employment Abroad">Employment / Work Visa</option>
                  <option value="Visiting Family / Relatives">Visiting Family / Relatives Abroad</option>
                  <option value="Official Government Delegation">Official Government Delegation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="w-purpose-details">
                  Additional Details Regarding Purpose (Optional)
                </label>
                <textarea 
                  id="w-purpose-details"
                  rows="2"
                  className="form-textarea"
                  placeholder="e.g. Attending academic conference / holiday tour..."
                  value={formData.visitPurposeDetails}
                  onChange={(e) => updateField('visitPurposeDetails', e.target.value)}
                />
              </div>

              {/* Field 2: Distinct Duration of Visit */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="w-duration-days">
                    Estimated Duration of Stay (in Days)
                    <span className="required-star">*</span>
                  </label>
                  <input 
                    id="w-duration-days"
                    type="number" 
                    min="1"
                    className={`form-input ${errors.durationDays ? 'is-error' : ''}`}
                    placeholder="e.g. 15, 30, 90"
                    value={formData.durationDays}
                    onChange={(e) => updateField('durationDays', e.target.value)}
                  />
                  {errors.durationDays && (
                    <div className="form-error-msg">
                      <AlertCircleIcon className="w-3.5 h-3.5" />
                      <span>{errors.durationDays}</span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="w-tentative-date">
                    Tentative Travel Date
                  </label>
                  <input 
                    id="w-tentative-date"
                    type="date" 
                    className="form-input"
                    value={formData.durationStartDate}
                    onChange={(e) => updateField('durationStartDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              UX-12 FIX: Scannable, Bulleted Legal Declaration
              ======================================================== */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                Step 4: Self-Declaration & Statutory Undertaking
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                Please review and affirm each individual statutory commitment under Section 5(2) of the Passports Act, 1967.
              </p>

              {/* Scannable Bulleted Declaration Cards (UX-12 Fix) */}
              <div style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px', marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationCitizenship} 
                    onChange={(e) => updateField('declarationCitizenship', e.target.checked)} 
                  />
                  <div style={{ fontSize: '13.5px', color: '#1E293B', lineHeight: 1.5 }}>
                    <strong>1. Sovereign Citizenship:</strong> I declare that I am a bona fide citizen of the Republic of India and have not voluntarily acquired citizenship or nationality of any other foreign country.
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationNoCriminal} 
                    onChange={(e) => updateField('declarationNoCriminal', e.target.checked)} 
                  />
                  <div style={{ fontSize: '13.5px', color: '#1E293B', lineHeight: 1.5 }}>
                    <strong>2. Clean Criminal & Judicial Record:</strong> I affirm that no warrant or summons for appearance or arrest has been issued against me by any court of law in India, nor is any criminal proceeding pending.
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationAccurateInfo} 
                    onChange={(e) => updateField('declarationAccurateInfo', e.target.checked)} 
                  />
                  <div style={{ fontSize: '13.5px', color: '#1E293B', lineHeight: 1.5 }}>
                    <strong>3. Accuracy of Submissions:</strong> I certify that all particulars given in this application form are true and accurate to the best of my knowledge and that no material information has been suppressed.
                  </div>
                </label>
              </div>

              {errors.declarations && (
                <div className="form-error-msg" style={{ marginBottom: '16px' }}>
                  <AlertCircleIcon className="w-4 h-4" />
                  <span>{errors.declarations}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div style={{
          padding: '16px 28px',
          background: '#F8FAFC',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {step > 1 ? (
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={handlePrev}
            >
              ← Previous Step
            </button>
          ) : (
            <div></div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button" 
              className="btn btn-outline btn-sm"
              onClick={onClose}
            >
              Save as Draft & Close
            </button>

            <button 
              type="button" 
              className="btn btn-saffron btn-sm"
              onClick={handleNext}
            >
              <span>{step === 4 ? 'Confirm & Submit Application' : 'Continue to Next Step →'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
