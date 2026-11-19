import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, CheckIcon, AlertCircleIcon, ShieldIcon, InfoIcon, XIcon } from './Icons';

export const ApplicationWizard = ({ isOpen, onClose, onFinish, initialService = 'fresh' }) => {
  const [step, setStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState('All changes saved to local draft');
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString());

  // Normalize service ID in case 'fresh-reissue' was passed from Services Section
  const getNormalizedService = (svc) => {
    if (!svc) return 'fresh';
    if (svc === 'fresh-reissue') return 'fresh';
    return svc;
  };

  // Form State with LocalStorage Draft Persistence (UX-11 Fix)
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('passport_application_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { 
          ...parsed, 
          serviceType: getNormalizedService(initialService) || parsed.serviceType || 'fresh' 
        };
      } catch (e) {
        console.error('Draft load error', e);
      }
    }
    return {
      serviceType: getNormalizedService(initialService) || 'fresh',
      bookletPages: '36',
      scheme: initialService === 'tatkaal' ? 'tatkaal' : 'normal',
      givenName: '',
      surname: '',
      gender: 'female',
      dob: '',
      placeOfBirth: '',
      maritalStatus: 'single',
      aadhaarNo: '',

      // Fresh & Reissue Address & Emergency fields
      resAddressLine: '',
      resCity: '',
      resDistrict: 'Pune',
      resState: 'Maharashtra',
      resPincode: '',
      resPoliceStation: '',
      emergencyName: '',
      emergencyPhone: '',

      // Reissue Specifics
      reissueOldPassportNo: '',
      reissueIssueDate: '',
      reissueExpiryDate: '',
      reissueIssuePlace: 'Mumbai (RPO)',
      reissueReason: 'Validity Expired within 3 years / due to expire',
      reissueAddressChanged: 'no',

      // Tatkaal Specifics
      tatkaalUrgentReason: 'Medical / Health Emergency Abroad',
      tatkaalProofType: 'Confirmed Flight Ticket / Medical Certificate',
      tatkaalDepartureDate: '',
      tatkaalAnnexureAuthority: 'District Magistrate / IAS / IPS Officer',
      tatkaalVerificationNo: '',

      // PCC Specifics
      pccCountry: '',
      pccPurpose: 'Employment Abroad',
      pccPoliceStation: '',
      pccPassportNo: '',
      pccPassportExpiry: '',
      pccForeignEmployer: '',
      pccAddressLastYear: '',

      // Diplomatic Specifics
      diplomaticPassportClass: 'Diplomatic (Maroon Cover)',
      diplomaticMinistry: '',
      diplomaticDesignation: '',
      diplomaticDeputationNo: '',
      diplomaticCadre: 'Indian Foreign Service (IFS)',
      diplomaticCountryOfMission: '',
      diplomaticMissionDuration: '24 Months',

      // Surrender Specifics
      surrenderOldPassportNo: '',
      surrenderOldPassportIssueDate: '',
      surrenderForeignCountry: '',
      surrenderForeignPassportNo: '',
      surrenderNaturalizationDate: '',
      surrenderNaturalizationCertNo: '',
      surrenderCategory: 'Acquired foreign nationality on or after 01/06/2010',

      // LoC Permit Specifics
      locSector: 'Salamabad Crossing Point (Uri Sector)',
      locPrcNo: '',
      locHostName: '',
      locHostRelation: 'First Degree Relative (Sibling / Parent)',
      locHostDistrict: 'Muzaffarabad District, PoJK',
      locStayDays: '14 Days (Standard Family Reunion)',

      // Legal Declarations
      declarationCitizenship: false,
      declarationNoCriminal: false,
      declarationAccurateInfo: false
    };
  });

  // Sync initialService when user clicks a specific service card from the homepage
  useEffect(() => {
    if (initialService) {
      const normalized = getNormalizedService(initialService);
      setFormData(prev => ({
        ...prev,
        serviceType: normalized,
        scheme: normalized === 'tatkaal' ? 'tatkaal' : prev.scheme
      }));
    }
  }, [initialService]);

  const [errors, setErrors] = useState({});

  // Auto-save on every change (UX-11 Fix)
  useEffect(() => {
    localStorage.setItem('passport_application_draft', JSON.stringify(formData));
    const now = new Date().toLocaleTimeString();
    setLastSavedTime(now);
    setSaveStatus(`Draft auto-saved at ${now}`);
    const timer = setTimeout(() => {
      setSaveStatus(`All changes safely preserved in local draft (${now})`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetDraft = () => {
    if (window.confirm('Are you sure you want to discard your saved draft and start fresh?')) {
      localStorage.removeItem('passport_application_draft');
      const normalized = getNormalizedService(initialService);
      setFormData({
        serviceType: normalized,
        bookletPages: '36',
        scheme: normalized === 'tatkaal' ? 'tatkaal' : 'normal',
        givenName: '',
        surname: '',
        gender: 'female',
        dob: '',
        placeOfBirth: '',
        maritalStatus: 'single',
        aadhaarNo: '',
        resAddressLine: '',
        resCity: '',
        resDistrict: 'Pune',
        resState: 'Maharashtra',
        resPincode: '',
        resPoliceStation: '',
        emergencyName: '',
        emergencyPhone: '',
        reissueOldPassportNo: '',
        reissueIssueDate: '',
        reissueExpiryDate: '',
        reissueIssuePlace: 'Mumbai (RPO)',
        reissueReason: 'Validity Expired within 3 years / due to expire',
        reissueAddressChanged: 'no',
        tatkaalUrgentReason: 'Medical / Health Emergency Abroad',
        tatkaalProofType: 'Confirmed Flight Ticket / Medical Certificate',
        tatkaalDepartureDate: '',
        tatkaalAnnexureAuthority: 'District Magistrate / IAS / IPS Officer',
        tatkaalVerificationNo: '',
        pccCountry: '',
        pccPurpose: 'Employment Abroad',
        pccPoliceStation: '',
        pccPassportNo: '',
        pccPassportExpiry: '',
        pccForeignEmployer: '',
        pccAddressLastYear: '',
        diplomaticPassportClass: 'Diplomatic (Maroon Cover)',
        diplomaticMinistry: '',
        diplomaticDesignation: '',
        diplomaticDeputationNo: '',
        diplomaticCadre: 'Indian Foreign Service (IFS)',
        diplomaticCountryOfMission: '',
        diplomaticMissionDuration: '24 Months',
        surrenderOldPassportNo: '',
        surrenderOldPassportIssueDate: '',
        surrenderForeignCountry: '',
        surrenderForeignPassportNo: '',
        surrenderNaturalizationDate: '',
        surrenderNaturalizationCertNo: '',
        surrenderCategory: 'Acquired foreign nationality on or after 01/06/2010',
        locSector: 'Salamabad Crossing Point (Uri Sector)',
        locPrcNo: '',
        locHostName: '',
        locHostRelation: 'First Degree Relative (Sibling / Parent)',
        locHostDistrict: 'Muzaffarabad District, PoJK',
        locStayDays: '14 Days (Standard Family Reunion)',
        declarationCitizenship: false,
        declarationNoCriminal: false,
        declarationAccurateInfo: false
      });
      setStep(1);
      setErrors({});
    }
  };

  const servicesCatalog = [
    { id: 'fresh', name: 'Fresh Passport', desc: 'First-time passport applicants with zero prior records.', badge: 'Standard 15–20 Days', fee: '₹1,500' },
    { id: 'reissue', name: 'Re-issue / Renewal', desc: 'Expired validity, exhausted 36/60 pages, or change in particulars.', badge: 'Standard 15–20 Days', fee: '₹1,500' },
    { id: 'tatkaal', name: 'Tatkaal Expedited Scheme', desc: 'Urgent international travel with 1–3 days priority dispatch under Schedule IV.', badge: 'Priority 1–3 Days', fee: '₹3,500' },
    { id: 'pcc', name: 'Police Clearance Certificate (PCC)', desc: 'Official criminal background clearance for overseas employment or visa.', badge: 'Police Report Dependent', fee: '₹500' },
    { id: 'diplomatic', name: 'Diplomatic & Official Passport', desc: 'Government dignitaries and officials travelling on state deputation.', badge: 'CPV Delhi Protocol', fee: 'Government Exempt' },
    { id: 'surrender', name: 'Surrender Certificate', desc: 'Formal renunciation upon acquiring foreign citizenship under Indian Citizenship Act.', badge: 'Statutory 5 Days', fee: '₹5,000' },
    { id: 'loc-permit', name: 'Line of Control (LoC) Permit', desc: 'Special travel documentation for permanent residents visiting relatives across designated sectors.', badge: 'Designated Security Cell', fee: 'Regulated / Free' }
  ];

  const currentService = servicesCatalog.find(s => s.id === formData.serviceType) || servicesCatalog[0];

  // Dynamic Step Labels Per Service
  const getStepLabels = () => {
    switch (formData.serviceType) {
      case 'fresh':
        return [
          { num: 1, label: 'Service Category' },
          { num: 2, label: 'Applicant Details' },
          { num: 3, label: 'Residential Address' },
          { num: 4, label: 'Legal Affirmation' }
        ];
      case 'reissue':
        return [
          { num: 1, label: 'Service Category' },
          { num: 2, label: 'Old Passport Particulars' },
          { num: 3, label: 'Re-issue Specifics' },
          { num: 4, label: 'Surrender Commitment' }
        ];
      case 'tatkaal':
        return [
          { num: 1, label: 'Tatkaal Scheme' },
          { num: 2, label: 'Applicant Details' },
          { num: 3, label: 'Urgent Justification' },
          { num: 4, label: 'Tatkaal Undertaking' }
        ];
      case 'pcc':
        return [
          { num: 1, label: 'PCC Purpose' },
          { num: 2, label: 'Passport Particulars' },
          { num: 3, label: 'Police Jurisdiction' },
          { num: 4, label: 'Criminal Clearance' }
        ];
      case 'diplomatic':
        return [
          { num: 1, label: 'Protocol Class' },
          { num: 2, label: 'Officer / Cadre Details' },
          { num: 3, label: 'State Deputation Order' },
          { num: 4, label: 'Sovereign Protocol' }
        ];
      case 'surrender':
        return [
          { num: 1, label: 'Surrender Category' },
          { num: 2, label: 'Indian Passport Details' },
          { num: 3, label: 'Foreign Citizenship Proof' },
          { num: 4, label: 'Renunciation Affirmation' }
        ];
      case 'loc-permit':
        return [
          { num: 1, label: 'Sector & Crossing' },
          { num: 2, label: 'Permanent Resident (PRC)' },
          { num: 3, label: 'Host Across LoC' },
          { num: 4, label: 'Security Affirmation' }
        ];
      default:
        return [
          { num: 1, label: 'Service Category' },
          { num: 2, label: 'Applicant Details' },
          { num: 3, label: 'Service Details' },
          { num: 4, label: 'Legal Affirmation' }
        ];
    }
  };

  const stepLabels = getStepLabels();

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.serviceType) errs.serviceType = 'Please select a service type';
    } else if (currentStep === 2) {
      if (!formData.givenName.trim()) errs.givenName = 'Given name is required';
      if (!formData.surname.trim()) errs.surname = 'Surname is required';
      if (!formData.dob) errs.dob = 'Date of birth is required';

      // Specific validations for step 2
      if (formData.serviceType === 'reissue') {
        if (!formData.reissueOldPassportNo.trim()) errs.reissueOldPassportNo = 'Old passport booklet number is required';
      } else if (formData.serviceType === 'pcc') {
        if (!formData.pccPassportNo.trim()) errs.pccPassportNo = 'Existing valid Indian passport number is mandatory for PCC';
        if (!formData.pccCountry.trim()) errs.pccCountry = 'Country for which PCC is required is mandatory';
      } else if (formData.serviceType === 'diplomatic') {
        if (!formData.diplomaticDesignation.trim()) errs.diplomaticDesignation = 'Official designation is required';
      } else if (formData.serviceType === 'surrender') {
        if (!formData.surrenderOldPassportNo.trim()) errs.surrenderOldPassportNo = 'Indian passport number to be surrendered is required';
      } else if (formData.serviceType === 'loc-permit') {
        if (!formData.locPrcNo.trim()) errs.locPrcNo = 'Permanent Resident Certificate (PRC) number is required';
      } else {
        if (!formData.placeOfBirth.trim()) errs.placeOfBirth = 'Place of birth is required';
      }
    } else if (currentStep === 3) {
      // Step 3 customized validation per service
      if (formData.serviceType === 'fresh') {
        if (!formData.resAddressLine.trim()) errs.resAddressLine = 'Residential street address is required';
        if (!formData.resPoliceStation.trim()) errs.resPoliceStation = 'Local police station jurisdiction is required for physical verification';
      } else if (formData.serviceType === 'reissue') {
        if (!formData.reissueReason) errs.reissueReason = 'Please select a reason for reissue';
      } else if (formData.serviceType === 'tatkaal') {
        if (!formData.tatkaalDepartureDate) errs.tatkaalDepartureDate = 'Scheduled expedited travel departure date is mandatory for Tatkaal';
      } else if (formData.serviceType === 'pcc') {
        if (!formData.pccPoliceStation.trim()) errs.pccPoliceStation = 'Local police station jurisdiction in India is required';
      } else if (formData.serviceType === 'diplomatic') {
        if (!formData.diplomaticMinistry.trim()) errs.diplomaticMinistry = 'Sponsoring Ministry / Department is required';
        if (!formData.diplomaticDeputationNo.trim()) errs.diplomaticDeputationNo = 'Official Deputation Order Number is required';
      } else if (formData.serviceType === 'surrender') {
        if (!formData.surrenderForeignCountry.trim()) errs.surrenderForeignCountry = 'Country of acquired foreign citizenship is required';
        if (!formData.surrenderForeignPassportNo.trim()) errs.surrenderForeignPassportNo = 'Foreign passport number is required';
      } else if (formData.serviceType === 'loc-permit') {
        if (!formData.locHostName.trim()) errs.locHostName = 'Host/relative name across LoC is required';
      }
    } else if (currentStep === 4) {
      if (!formData.declarationCitizenship || !formData.declarationNoCriminal || !formData.declarationAccurateInfo) {
        errs.declarations = 'You must affirm all three statutory declarations to proceed.';
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
      onFinish?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.78)',
      backdropFilter: 'blur(5px)',
      zIndex: 1400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'var(--font-serif)'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '840px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '2px solid var(--gov-gold)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with Title and Close Button */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-gold" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                Application Portal
              </span>
              <span style={{ fontSize: '12px', color: '#FDE047', fontWeight: 700 }}>
                • {currentService.name} ({currentService.fee})
              </span>
            </div>
            <h2 style={{ fontSize: '21px', fontWeight: 800, margin: '4px 0 0 0', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Official Citizen Application Wizard
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '6px' }}
            title="Close Wizard"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* UX-11: Draft Auto-Save Banner */}
        <div style={{
          background: '#F0FDF4',
          borderBottom: '1px solid #BBF7D0',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12.5px',
          color: '#0F766E'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <span>💾</span>
            <span><strong>Form Auto-Save:</strong> {saveStatus}</span>
          </div>
          <button 
            type="button"
            onClick={handleResetDraft}
            style={{ background: 'none', border: 'none', color: '#B91C1C', cursor: 'pointer', fontWeight: 700, fontSize: '12px', textDecoration: 'underline' }}
          >
            Clear Draft & Reset
          </button>
        </div>

        {/* Step Progress Bar (4 Dynamic Steps Customized per Service) */}
        <div style={{ padding: '20px 28px 0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {stepLabels.map((s) => (
              <div 
                key={s.num} 
                style={{
                  borderTop: `4px solid ${step >= s.num ? 'var(--gov-gold)' : '#E2E8F0'}`,
                  paddingTop: '8px'
                }}
              >
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: step >= s.num ? 'var(--gov-navy)' : '#94A3B8', fontWeight: 800 }}>
                  Step 0{s.num}
                </div>
                <div style={{ fontSize: '13px', fontWeight: step === s.num ? 700 : 500, color: step === s.num ? 'var(--gov-navy)' : '#64748B' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form Content */}
        <div style={{ padding: '24px 28px', flexGrow: 1 }}>

          {/* ==================== STEP 1: SERVICE CATEGORY ==================== */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
                  Step 1: Select Your Exact Service Category
                </h3>
                <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                  All 7 statutory citizen services
                </span>
              </div>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '18px' }}>
                Your service selection configures the exact verification guidelines, documentary proofs, and timeline set by the Ministry of External Affairs.
              </p>

              {/* 7 Distinct Service Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {servicesCatalog.map((svc) => {
                  const isSelected = formData.serviceType === svc.id;
                  return (
                    <label 
                      key={svc.id} 
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                        background: isSelected ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 3px 8px rgba(8, 30, 58, 0.12)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                              type="radio" 
                              name="serviceType" 
                              checked={isSelected} 
                              onChange={() => {
                                updateField('serviceType', svc.id);
                                if (svc.id === 'tatkaal') {
                                  updateField('scheme', 'tatkaal');
                                }
                              }} 
                            />
                            <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy)' }}>{svc.name}</strong>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F766E' }}>{svc.fee}</span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 8px 24px', lineHeight: 1.4 }}>
                          {svc.desc}
                        </p>
                      </div>
                      <div style={{ marginLeft: '24px', fontSize: '11.5px', fontWeight: 600, color: isSelected ? 'var(--gov-navy)' : '#94A3B8' }}>
                        ● {svc.badge}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Passport Specific Options (Only for Fresh/Reissue/Tatkaal) */}
              {['fresh', 'reissue', 'tatkaal'].includes(formData.serviceType) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Processing Scheme</label>
                    <select 
                      className="form-select"
                      value={formData.scheme}
                      onChange={(e) => updateField('scheme', e.target.value)}
                    >
                      <option value="normal">Normal Scheme (Standard 15–20 Working Days)</option>
                      <option value="tatkaal">Tatkaal Expedited (1–3 Days • Priority Dispatch)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Booklet Page Count</label>
                    <select 
                      className="form-select"
                      value={formData.bookletPages}
                      onChange={(e) => updateField('bookletPages', e.target.value)}
                    >
                      <option value="36">36 Pages (Standard Citizen Passport)</option>
                      <option value="60">60 Pages (Frequent International Traveller)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== STEP 2: APPLICANT IDENTITY DETAILS ==================== */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                Step 2: {stepLabels[1].label}
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                Please provide official government identity particulars matching your birth/Aadhaar records.
              </p>

              {/* Dynamic Service Banner */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#1E40AF', fontWeight: 600 }}>
                Applying for: <strong>{currentService.name}</strong> • Status: Active Draft
              </div>

              {/* Primary Identity Fields (Common to All Services) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Given Name (First & Middle) <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Chaitrali"
                    value={formData.givenName}
                    onChange={(e) => updateField('givenName', e.target.value)}
                  />
                  {errors.givenName && <div className="form-error-msg">{errors.givenName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Surname <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Kamble"
                    value={formData.surname}
                    onChange={(e) => updateField('surname', e.target.value)}
                  />
                  {errors.surname && <div className="form-error-msg">{errors.surname}</div>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-select"
                    value={formData.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="transgender">Transgender</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Date of Birth <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.dob}
                    onChange={(e) => updateField('dob', e.target.value)}
                  />
                  {errors.dob && <div className="form-error-msg">{errors.dob}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Marital Status</label>
                  <select 
                    className="form-select"
                    value={formData.maritalStatus}
                    onChange={(e) => updateField('maritalStatus', e.target.value)}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              {/* Service-Specific Step 2 Extra Fields */}
              {formData.serviceType === 'fresh' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginTop: '12px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Place of Birth (City / Village & District) <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Pune, Maharashtra"
                      value={formData.placeOfBirth}
                      onChange={(e) => updateField('placeOfBirth', e.target.value)}
                    />
                    {errors.placeOfBirth && <div className="form-error-msg">{errors.placeOfBirth}</div>}
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">12-Digit Aadhaar / Virtual ID (Optional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 5482 1092 3841"
                      value={formData.aadhaarNo}
                      onChange={(e) => updateField('aadhaarNo', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {formData.serviceType === 'reissue' && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                    Existing / Expired Passport Particulars
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Old Passport Booklet No. <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Z9482103"
                        value={formData.reissueOldPassportNo}
                        onChange={(e) => updateField('reissueOldPassportNo', e.target.value)}
                      />
                      {errors.reissueOldPassportNo && <div className="form-error-msg">{errors.reissueOldPassportNo}</div>}
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Date of Issue</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={formData.reissueIssueDate}
                        onChange={(e) => updateField('reissueIssueDate', e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Place of Issue (RPO)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Mumbai RPO"
                        value={formData.reissueIssuePlace}
                        onChange={(e) => updateField('reissueIssuePlace', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType === 'tatkaal' && (
                <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '10px', border: '1px solid #FCD34D', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: '#92400E', marginBottom: '8px', fontWeight: 700 }}>
                    ⚡ Tatkaal Priority Scheme Eligibility Credentials
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#78350F', marginBottom: '12px' }}>
                    Under Schedule IV, applicants must furnish 2 government identity proofs for post-police verification dispatch.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Aadhaar Card / Government Photo ID No. <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. 5482 1092 3841"
                        value={formData.aadhaarNo}
                        onChange={(e) => updateField('aadhaarNo', e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Annexure F / Verification Certificate No. (if available)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. VC/MUM/2026/892"
                        value={formData.tatkaalVerificationNo}
                        onChange={(e) => updateField('tatkaalVerificationNo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType === 'pcc' && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                    Mandatory Indian Passport Credentials (Required for PCC)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Valid Indian Passport Number <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. P1849203"
                        value={formData.pccPassportNo}
                        onChange={(e) => updateField('pccPassportNo', e.target.value)}
                      />
                      {errors.pccPassportNo && <div className="form-error-msg">{errors.pccPassportNo}</div>}
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Passport Expiry Date</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={formData.pccPassportExpiry}
                        onChange={(e) => updateField('pccPassportExpiry', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType === 'diplomatic' && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                    Dignitary / Official Cadre Credentials
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Official Designation <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Under Secretary to the Government of India"
                        value={formData.diplomaticDesignation}
                        onChange={(e) => updateField('diplomaticDesignation', e.target.value)}
                      />
                      {errors.diplomaticDesignation && <div className="form-error-msg">{errors.diplomaticDesignation}</div>}
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Service Cadre</label>
                      <select 
                        className="form-select"
                        value={formData.diplomaticCadre}
                        onChange={(e) => updateField('diplomaticCadre', e.target.value)}
                      >
                        <option value="Indian Foreign Service (IFS)">Indian Foreign Service (IFS)</option>
                        <option value="Indian Administrative Service (IAS)">Indian Administrative Service (IAS)</option>
                        <option value="Armed Forces Officer">Armed Forces Officer (Army / Navy / Air Force)</option>
                        <option value="Union Minister / Member of Parliament">Union Minister / Member of Parliament</option>
                        <option value="Central Staffing Scheme">Central Staffing Scheme / Autonomous Body</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType === 'surrender' && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                    Indian Passport to be Surrendered
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Indian Passport Number <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. M9821043"
                        value={formData.surrenderOldPassportNo}
                        onChange={(e) => updateField('surrenderOldPassportNo', e.target.value)}
                      />
                      {errors.surrenderOldPassportNo && <div className="form-error-msg">{errors.surrenderOldPassportNo}</div>}
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Date of Issue</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={formData.surrenderOldPassportIssueDate}
                        onChange={(e) => updateField('surrenderOldPassportIssueDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceType === 'loc-permit' && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                    Permanent Resident (PRC) & Domicile Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Permanent Resident Certificate (PRC) No. <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. PRC/BAR/2020/4910"
                        value={formData.locPrcNo}
                        onChange={(e) => updateField('locPrcNo', e.target.value)}
                      />
                      {errors.locPrcNo && <div className="form-error-msg">{errors.locPrcNo}</div>}
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">District of Permanent Residence</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Baramulla / Poonch"
                        value={formData.resDistrict}
                        onChange={(e) => updateField('resDistrict', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== STEP 3: SERVICE-TAILORED CORE STEP ==================== */}
          {step === 3 && (
            <div>
              {/* Fresh Passport Step 3: Residential Address & Emergency Contact */}
              {formData.serviceType === 'fresh' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Present Residential Address & Emergency Contact
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    Physical police verification will be conducted at this address by your local police station.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                      1. Present Residential Address
                    </h4>
                    <div className="form-group">
                      <label className="form-label">House / Flat No., Building & Street <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Flat 402, Shivam Residency, Senapati Bapat Road"
                        value={formData.resAddressLine}
                        onChange={(e) => updateField('resAddressLine', e.target.value)}
                      />
                      {errors.resAddressLine && <div className="form-error-msg">{errors.resAddressLine}</div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginTop: '12px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">City / Town</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Pune"
                          value={formData.resCity}
                          onChange={(e) => updateField('resCity', e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">State</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={formData.resState}
                          onChange={(e) => updateField('resState', e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">PIN Code</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 411016"
                          value={formData.resPincode}
                          onChange={(e) => updateField('resPincode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                      <label className="form-label">Jurisdictional Police Station <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Chatuhshrungi Police Station"
                        value={formData.resPoliceStation}
                        onChange={(e) => updateField('resPoliceStation', e.target.value)}
                      />
                      {errors.resPoliceStation && <div className="form-error-msg">{errors.resPoliceStation}</div>}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)' }}>
                    <h4 style={{ fontSize: '15px', color: 'var(--gov-navy)', marginBottom: '12px', fontWeight: 700 }}>
                      2. Emergency Contact Particulars
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Emergency Contact Person Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Ramesh Kamble (Father)"
                          value={formData.emergencyName}
                          onChange={(e) => updateField('emergencyName', e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Emergency Mobile Number</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. +91 9823019284"
                          value={formData.emergencyPhone}
                          onChange={(e) => updateField('emergencyPhone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reissue Step 3: Reissue Reason & Change in Details */}
              {formData.serviceType === 'reissue' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Re-issue Reason & Particulars Modification
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    Please specify the reason for renewing your booklet and any modifications to your registered details.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Primary Reason for Re-issue <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <select 
                        className="form-select"
                        value={formData.reissueReason}
                        onChange={(e) => updateField('reissueReason', e.target.value)}
                      >
                        <option value="Validity Expired within 3 years / due to expire">Validity Expired within 3 years / due to expire</option>
                        <option value="Validity Expired more than 3 years ago">Validity Expired more than 3 years ago</option>
                        <option value="Exhaustion of 36 or 60 visa pages">Exhaustion of 36 or 60 visa pages</option>
                        <option value="Change in Personal Particulars (Address / Surname / Marital Status)">Change in Personal Particulars (Address / Surname / Marital Status)</option>
                        <option value="Damaged / Mutilated Passport Booklet">Damaged / Mutilated Passport Booklet</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginTop: '14px' }}>
                      <label className="form-label">Has your Residential Address Changed from the Previous Passport?</label>
                      <select 
                        className="form-select"
                        value={formData.reissueAddressChanged}
                        onChange={(e) => updateField('reissueAddressChanged', e.target.value)}
                      >
                        <option value="no">No — Present residential address is identical to old passport</option>
                        <option value="yes">Yes — I have shifted to a new address (Proof of address required)</option>
                      </select>
                    </div>

                    {formData.reissueAddressChanged === 'yes' && (
                      <div className="form-group" style={{ marginTop: '14px', marginBottom: 0 }}>
                        <label className="form-label">New Residential Address & Police Station Jurisdiction</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Flat 102, Green Meadows, Baner, Pune - 411045"
                          value={formData.resAddressLine}
                          onChange={(e) => updateField('resAddressLine', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tatkaal Step 3: Urgent Travel Justification & Priority Dispatch */}
              {formData.serviceType === 'tatkaal' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', padding: '8px 14px', marginBottom: '16px', fontSize: '13px', color: '#92400E', fontWeight: 700 }}>
                    <span>⚡</span>
                    <span>Tatkaal Statutory Priority Scheme — Fast-Track 72-Hour Processing</span>
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Urgent Travel Rationale & Scheduled Departure
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    Provide statutory urgency justification to qualify for fast-track processing under Passports Rules Schedule IV.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Primary Urgency Category <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <select 
                        className="form-select"
                        value={formData.tatkaalUrgentReason}
                        onChange={(e) => updateField('tatkaalUrgentReason', e.target.value)}
                      >
                        <option value="Medical / Health Emergency Abroad">Medical / Health Emergency of self or family abroad</option>
                        <option value="Critical Business Assignment / Foreign Contract">Critical Business Assignment / Urgent Contractual Joining</option>
                        <option value="Family Bereavement / Death of Relative">Family Bereavement / Death of immediate relative</option>
                        <option value="Imminent Academic Semester / University Date">Imminent Academic Semester / University Orientation</option>
                        <option value="Expedited Personal Travel with Flight Booked">Expedited Personal Travel with Flight Booked</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginTop: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Proof of Urgency Attached</label>
                        <select 
                          className="form-select"
                          value={formData.tatkaalProofType}
                          onChange={(e) => updateField('tatkaalProofType', e.target.value)}
                        >
                          <option value="Confirmed Flight Ticket / Medical Certificate">Confirmed Flight Ticket / PNR</option>
                          <option value="Hospital Medical Clearance Certificate">Hospital Medical Clearance Certificate</option>
                          <option value="Foreign Employer Joining Letter">Foreign Employer Joining Letter</option>
                          <option value="University Admission / Visa Interview Notice">University Admission / Visa Interview Notice</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Scheduled Departure Date <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={formData.tatkaalDepartureDate}
                          onChange={(e) => updateField('tatkaalDepartureDate', e.target.value)}
                        />
                        {errors.tatkaalDepartureDate && <div className="form-error-msg">{errors.tatkaalDepartureDate}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PCC Step 3: Police Jurisdiction & Destination Particulars */}
              {formData.serviceType === 'pcc' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Police Verification Jurisdiction & Destination Details
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    PCC requires an official police background inquiry report submitted by your jurisdictional police station.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Country for which PCC is Required <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Canada, Australia, United Kingdom"
                          value={formData.pccCountry}
                          onChange={(e) => updateField('pccCountry', e.target.value)}
                        />
                        {errors.pccCountry && <div className="form-error-msg">{errors.pccCountry}</div>}
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Purpose for PCC</label>
                        <select 
                          className="form-select"
                          value={formData.pccPurpose}
                          onChange={(e) => updateField('pccPurpose', e.target.value)}
                        >
                          <option value="Employment Abroad">Employment Abroad / Work Permit</option>
                          <option value="Immigration / Permanent Residency (PR)">Immigration / Permanent Residency (PR)</option>
                          <option value="Long Term Tourist / Dependent Visa">Long Term Tourist / Dependent Visa</option>
                          <option value="Higher Studies / Student Visa">Higher Studies / Student Visa</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '14px' }}>
                      <label className="form-label">Local Police Station in India (for Verification) <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Shivajinagar Police Station, Pune"
                        value={formData.pccPoliceStation}
                        onChange={(e) => updateField('pccPoliceStation', e.target.value)}
                      />
                      {errors.pccPoliceStation && <div className="form-error-msg">{errors.pccPoliceStation}</div>}
                    </div>

                    <div className="form-group" style={{ marginTop: '14px', marginBottom: 0 }}>
                      <label className="form-label">Foreign Sponsoring Employer / University Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Toronto General Hospital / McGill University"
                        value={formData.pccForeignEmployer}
                        onChange={(e) => updateField('pccForeignEmployer', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Diplomatic Step 3: State Deputation & Protocol Details */}
              {formData.serviceType === 'diplomatic' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: State Deputation Order & CPV Delhi Protocol
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    Diplomatic and Official Passports are granted strictly on the authority of state deputation orders.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Passport Class</label>
                        <select 
                          className="form-select"
                          value={formData.diplomaticPassportClass}
                          onChange={(e) => updateField('diplomaticPassportClass', e.target.value)}
                        >
                          <option value="Diplomatic (Maroon Cover)">Diplomatic Passport (Maroon Cover)</option>
                          <option value="Official (White Cover)">Official Passport (White Cover)</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Sponsoring Ministry / Department <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Ministry of External Affairs"
                          value={formData.diplomaticMinistry}
                          onChange={(e) => updateField('diplomaticMinistry', e.target.value)}
                        />
                        {errors.diplomaticMinistry && <div className="form-error-msg">{errors.diplomaticMinistry}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginTop: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Deputation / Clearance Order No. <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. MEA/CPV/DEP/2026/0415"
                          value={formData.diplomaticDeputationNo}
                          onChange={(e) => updateField('diplomaticDeputationNo', e.target.value)}
                        />
                        {errors.diplomaticDeputationNo && <div className="form-error-msg">{errors.diplomaticDeputationNo}</div>}
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Destination Country of State Mission</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Switzerland / United States"
                          value={formData.diplomaticCountryOfMission}
                          onChange={(e) => updateField('diplomaticCountryOfMission', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Surrender Step 3: Foreign Citizenship Acquisition */}
              {formData.serviceType === 'surrender' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Foreign Citizenship & Naturalization Details
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    Formal surrender is statutory under Section 8 of the Citizenship Act, 1955 upon obtaining foreign nationality.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Country of Acquired Foreign Nationality <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. United States of America"
                          value={formData.surrenderForeignCountry}
                          onChange={(e) => updateField('surrenderForeignCountry', e.target.value)}
                        />
                        {errors.surrenderForeignCountry && <div className="form-error-msg">{errors.surrenderForeignCountry}</div>}
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Foreign Passport Number <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. USA987654321"
                          value={formData.surrenderForeignPassportNo}
                          onChange={(e) => updateField('surrenderForeignPassportNo', e.target.value)}
                        />
                        {errors.surrenderForeignPassportNo && <div className="form-error-msg">{errors.surrenderForeignPassportNo}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Date of Naturalization / Registration</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={formData.surrenderNaturalizationDate}
                          onChange={(e) => updateField('surrenderNaturalizationDate', e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Naturalization Certificate Number</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. NAT-US-2026-98124"
                          value={formData.surrenderNaturalizationCertNo}
                          onChange={(e) => updateField('surrenderNaturalizationCertNo', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LoC Permit Step 3: Host Across LoC & Travel Particulars */}
              {formData.serviceType === 'loc-permit' && (
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                    Step 3: Host & Relative Particulars Across the Line of Control
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                    LoC Travel Permits are granted for verified familial visits across designated crossing sectors.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-medium)', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Designated Crossing Sector</label>
                      <select 
                        className="form-select"
                        value={formData.locSector}
                        onChange={(e) => updateField('locSector', e.target.value)}
                      >
                        <option value="Salamabad Crossing Point (Uri Sector)">Salamabad Crossing Point (Uri Sector)</option>
                        <option value="Chakan Da Bagh Crossing Point (Poonch Sector)">Chakan Da Bagh Crossing Point (Poonch Sector)</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Full Name of Host / Relative across LoC <span style={{ color: 'var(--gov-red)' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Mohammad Bashir"
                          value={formData.locHostName}
                          onChange={(e) => updateField('locHostName', e.target.value)}
                        />
                        {errors.locHostName && <div className="form-error-msg">{errors.locHostName}</div>}
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Familial Relationship</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Maternal Uncle / Brother"
                          value={formData.locHostRelation}
                          onChange={(e) => updateField('locHostRelation', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '14px', marginBottom: 0 }}>
                      <label className="form-label">Village & District Across LoC</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Village Chakothi, District Hattian Bala, PoJK"
                        value={formData.locHostDistrict}
                        onChange={(e) => updateField('locHostDistrict', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== STEP 4: STATUTORY LEGAL DECLARATION AFFIRMATION ==================== */}
          {step === 4 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '8px 14px', marginBottom: '16px', fontSize: '13px', color: '#1E40AF', fontWeight: 700 }}>
                <span>⚡</span>
                <span>Explicit Statutory Legal Declaration Commitments — {currentService.name}</span>
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '6px' }}>
                Step 4: Statutory Legal Declaration Affirmation
              </h3>
              <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '18px' }}>
                Under the Passports Act, 1967 and Ministry of External Affairs regulations, you must affirm each statutory clause.
              </p>

              {errors.declarations && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', fontWeight: 600 }}>
                  {errors.declarations}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Declaration 1: Citizenship or Renunciation */}
                <label style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: formData.declarationCitizenship ? '2px solid #0F766E' : '1px solid #CBD5E1',
                  background: formData.declarationCitizenship ? '#F0FDF4' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationCitizenship}
                    onChange={(e) => updateField('declarationCitizenship', e.target.checked)}
                  />
                  <div>
                    <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy)', display: 'block' }}>
                      {formData.serviceType === 'surrender' ? 'Citizenship Renunciation Affirmation' : 'Indian Citizenship Commitment'}
                    </strong>
                    <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                      {formData.serviceType === 'surrender' 
                        ? 'I hereby solemnly declare that I have acquired foreign nationality and renounce my Indian citizenship under Section 8 of the Citizenship Act, 1955.'
                        : 'I solemnly affirm that I am a citizen of India by birth/descent/registration, and I owe undivided allegiance to the sovereignty and integrity of India.'}
                    </span>
                  </div>
                </label>

                {/* Declaration 2: Criminal Clearance or Police Authorization */}
                <label style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: formData.declarationNoCriminal ? '2px solid #0F766E' : '1px solid #CBD5E1',
                  background: formData.declarationNoCriminal ? '#F0FDF4' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationNoCriminal}
                    onChange={(e) => updateField('declarationNoCriminal', e.target.checked)}
                  />
                  <div>
                    <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy)', display: 'block' }}>
                      {formData.serviceType === 'tatkaal' ? 'Tatkaal Post-Police Verification Undertaking' : 'Absence of Criminal Proceedings'}
                    </strong>
                    <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                      {formData.serviceType === 'tatkaal'
                        ? 'I understand this passport is issued under priority Tatkaal basis. I undertake full cooperation with post-police verification and acknowledge strict penal liability for false declarations.'
                        : 'No proceedings in respect of an offence alleged to have been committed by me are pending before any criminal court in India or abroad.'}
                    </span>
                  </div>
                </label>

                {/* Declaration 3: Truthful Disclosure */}
                <label style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: formData.declarationAccurateInfo ? '2px solid #0F766E' : '1px solid #CBD5E1',
                  background: formData.declarationAccurateInfo ? '#F0FDF4' : '#FFFFFF',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="checkbox" 
                    style={{ marginTop: '4px', width: '18px', height: '18px' }}
                    checked={formData.declarationAccurateInfo}
                    onChange={(e) => updateField('declarationAccurateInfo', e.target.checked)}
                  />
                  <div>
                    <strong style={{ fontSize: '14.5px', color: 'var(--gov-navy)', display: 'block' }}>Truthful Disclosure & Statutory Compliance</strong>
                    <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                      The information given by me in this application and enclosures is true, correct, and complete. I understand suppression of facts attracts imprisonment up to 2 years under Section 12 of the Passports Act, 1967.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div style={{
          padding: '16px 28px',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {step > 1 ? (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => { setErrors({}); setStep(step - 1); }}
              style={{ padding: '9px 18px', fontSize: '14px' }}
            >
              ← Previous Step
            </button>
          ) : <div />}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              style={{ padding: '9px 18px', fontSize: '14px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-saffron"
              onClick={handleNext}
              style={{ padding: '9px 24px', fontSize: '14.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>{step === 4 ? 'Confirm & Submit Application' : 'Continue to Next Step'}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
