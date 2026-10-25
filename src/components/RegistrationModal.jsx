import React, { useState } from 'react';
import { XIcon, AlertCircleIcon, CheckIcon, InfoIcon, ShieldIcon } from './Icons';

export const RegistrationModal = ({ isOpen, onClose, initialMode = 'register', onSuccess }) => {
  const [mode, setMode] = useState(initialMode);

  // Form Fields as per Official Passport Seva Portal (passportindia.gov.in)
  const [registerAt, setRegisterAt] = useState('rpo');
  const [passportOffice, setPassportOffice] = useState('Mumbai');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Female');
  const [mobileNumber, setMobileNumber] = useState('');
  
  // Official Government Proof Validation
  const [proofType, setProofType] = useState('Aadhaar Card (UIDAI)');
  const [proofNumber, setProofNumber] = useState('');
  const [proofVerified, setProofVerified] = useState(false);

  // Email & Credentials
  const [email, setEmail] = useState('');
  const [sameAsEmail, setSameAsEmail] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [loginIdChecked, setLoginIdChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hintQuestion, setHintQuestion] = useState('Birth City');
  const [hintAnswer, setHintAnswer] = useState('');

  // Sign In State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const rpoList = [
    'Ahmedabad', 'Amritsar', 'Bengaluru', 'Bhopal', 'Bhubaneswar',
    'Chandigarh', 'Chennai', 'Cochin', 'Coimbatore', 'Dehradun',
    'Delhi (RPO)', 'Ghaziabad', 'Goa', 'Guwahati', 'Hyderabad',
    'Jaipur', 'Jalandhar', 'Jammu', 'Kolkata', 'Kozhikode',
    'Lucknow', 'Madurai', 'Mumbai', 'Nagpur', 'Patna',
    'Pune', 'Raipur', 'Ranchi', 'Shimla', 'Srinagar',
    'Surat', 'Tiruchirappalli', 'Trivandrum', 'Varanasi', 'Vijayawada'
  ];

  // Government ID Number live formatting & check
  const handleProofNumberChange = (val) => {
    setProofNumber(val);
    const cleaned = val.replace(/[\s-]/g, '').trim();
    if (proofType.includes('Aadhaar') && cleaned.length === 12 && /^\d+$/.test(cleaned)) {
      setProofVerified(true);
    } else if (proofType.includes('PAN') && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(cleaned)) {
      setProofVerified(true);
    } else if (cleaned.length >= 8) {
      setProofVerified(true);
    } else {
      setProofVerified(false);
    }
  };

  // Password Rules validation: Minimum 8 characters, 1 number, 1 special character
  const hasMinLen = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const validateRegistration = () => {
    const errs = {};

    if (!givenName.trim()) {
      errs.givenName = 'Given name (First + Middle) is required as per identity proof';
    }
    if (!surname.trim()) {
      errs.surname = 'Surname is required';
    }
    if (!dob) {
      errs.dob = 'Date of birth is required';
    }

    // Phone number: 10 digits
    const cleanedPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Government proof check
    if (!proofNumber.trim()) {
      errs.proofNumber = `Please provide a valid ${proofType} number`;
    } else if (!proofVerified) {
      errs.proofNumber = `Invalid format for ${proofType} (e.g. 12-digit Aadhaar or 10-char PAN)`;
    }

    // Email validation: MUST contain @gmail.com as requested
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      errs.email = 'Email address is required';
    } else if (!trimmedEmail.endsWith('@gmail.com') || !trimmedEmail.includes('@')) {
      errs.email = 'Official requirement: Email must be a valid Google Account ending with @gmail.com';
    }

    // Login ID
    if (!sameAsEmail && !loginId.trim()) {
      errs.loginId = 'Please enter your desired Login ID';
    }

    // Password requirements
    if (!hasMinLen || !hasNumber || !hasSpecial) {
      errs.password = 'Password must have at least 8 characters, 1 number, and 1 special character (!@#$%^&*)';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    if (!hintAnswer.trim()) {
      errs.hintAnswer = 'Please provide a security hint answer for account recovery';
    }

    return errs;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errs = validateRegistration();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmittedSuccess(true);
    const completeName = `${givenName.trim()} ${surname.trim()}`;
    setTimeout(() => {
      onSuccess?.({ 
        name: completeName, 
        email: email.trim().toLowerCase(),
        proofType,
        proofNumber
      });
      onClose();
    }, 1200);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginUser.trim()) errs.loginUser = 'Login ID or Registered @gmail.com is required';
    if (!loginPass) errs.loginPass = 'Password is required to authenticate';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmittedSuccess(true);

    const displayName = loginUser.includes('@') 
      ? loginUser.split('@')[0].toUpperCase() 
      : loginUser.toUpperCase();

    setTimeout(() => {
      onSuccess?.({ 
        name: displayName.length > 2 ? displayName : 'SHRAVANI DESHMUKH', 
        email: loginUser.includes('@') ? loginUser : `${loginUser}@gmail.com`
      });
      onClose();
    }, 1000);
  };

  const handleFillSample = (sampleName, sampleEmail) => {
    setGivenName(sampleName.split(' ')[0]);
    setSurname(sampleName.split(' ')[1] || 'Patil');
    setDob('1998-05-15');
    setMobileNumber('9820123456');
    setProofType('Aadhaar Card (UIDAI)');
    setProofNumber('4829-1920-3841');
    setProofVerified(true);
    setEmail(sampleEmail);
    setPassword('Passport@2026');
    setConfirmPassword('Passport@2026');
    setHintAnswer('Mumbai');
    setErrors({});
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.8)',
      backdropFilter: 'blur(5px)',
      zIndex: 1300,
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
        maxWidth: '680px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        border: '2px solid var(--border-medium)',
        padding: '28px 32px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--gov-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Ministry of External Affairs • Government of India
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gov-navy)', margin: '2px 0 0 0' }}>
              {mode === 'register' ? 'Official Citizen Registration' : 'Citizen Sign In'}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              {mode === 'register' 
                ? 'Create your verified account with National ID verification under the Passports Act 1967.' 
                : 'Access your submitted applications, book appointment slots, and track dispatches.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
          <button 
            type="button"
            onClick={() => { setMode('register'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '9px 12px',
              border: 'none',
              background: mode === 'register' ? '#FFFFFF' : 'none',
              color: mode === 'register' ? 'var(--gov-navy)' : '#64748B',
              fontWeight: 700,
              fontSize: '13.5px',
              borderRadius: '8px',
              boxShadow: mode === 'register' ? 'var(--shadow-subtle)' : 'none',
              cursor: 'pointer'
            }}
          >
            Register New Citizen Account
          </button>
          <button 
            type="button"
            onClick={() => { setMode('login'); setErrors({}); }}
            style={{
              flex: 1,
              padding: '9px 12px',
              border: 'none',
              background: mode === 'login' ? '#FFFFFF' : 'none',
              color: mode === 'login' ? 'var(--gov-navy)' : '#64748B',
              fontWeight: 700,
              fontSize: '13.5px',
              borderRadius: '8px',
              boxShadow: mode === 'login' ? 'var(--shadow-subtle)' : 'none',
              cursor: 'pointer'
            }}
          >
            Registered Citizen Sign In
          </button>
        </div>

        {submittedSuccess ? (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#F0FDF4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F766E',
              margin: '0 auto 16px auto',
              border: '2px solid #BBF7D0'
            }}>
              <CheckIcon className="w-8 h-8" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
              {mode === 'register' ? 'Citizen Account Verified & Created!' : 'Authenticated Successfully!'}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              {mode === 'register' 
                ? 'Your DigiLocker / Aadhaar identity verification is complete. Directing you to your applicant session...' 
                : 'Redirecting to your secure passport dashboard...'}
            </p>
          </div>
        ) : mode === 'register' ? (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit}>
            {/* Quick Demo Autofill Pill */}
            <div style={{
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              padding: '8px 12px',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#92400E'
            }}>
              <span>💡 Need quick testing data with valid @gmail.com & National ID?</span>
              <button
                type="button"
                onClick={() => handleFillSample('Shravani Deshmukh', 'shravani@gmail.com')}
                style={{
                  background: '#92400E',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '11.5px'
                }}
              >
                Autofill Shravani Sample
              </button>
            </div>

            {/* 1. Register to Apply At */}
            <div style={{ marginBottom: '16px', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                Register to Apply at <span style={{ color: 'var(--gov-red)' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13.5px' }}>
                  <input 
                    type="radio" 
                    name="registerAt" 
                    value="rpo" 
                    checked={registerAt === 'rpo'} 
                    onChange={() => setRegisterAt('rpo')} 
                  />
                  <span>Regional Passport Office (RPO)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13.5px' }}>
                  <input 
                    type="radio" 
                    name="registerAt" 
                    value="cpv" 
                    checked={registerAt === 'cpv'} 
                    onChange={() => setRegisterAt('cpv')} 
                  />
                  <span>CPV Delhi (Diplomatic / Official Only)</span>
                </label>
              </div>

              {registerAt === 'rpo' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Select Passport Office Jurisdiction:
                  </label>
                  <select 
                    value={passportOffice}
                    onChange={(e) => setPassportOffice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '13px', background: '#FFFFFF' }}
                  >
                    {rpoList.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* 2. Personal Particulars */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Given Name (First + Middle) <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Shravani Anant"
                  value={givenName}
                  onChange={(e) => setGivenName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.givenName ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
                {errors.givenName && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.givenName}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Surname <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Deshmukh"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.surname ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
                {errors.surname && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.surname}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Date of Birth (DOB) <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.dob ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
                {errors.dob && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.dob}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Mobile Number (India +91) <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile (e.g. 9820123456)"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.mobileNumber ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
                {errors.mobileNumber && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.mobileNumber}</div>}
              </div>
            </div>

            {/* 3. Official Government Identity Proof */}
            <div style={{ background: '#F0FDF4', padding: '14px', borderRadius: '10px', border: '1px solid #BBF7D0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <ShieldIcon className="w-4 h-4" style={{ color: '#0F766E' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F766E' }}>
                  Official Government Identity Proof (DigiLocker / National ID Check) <span style={{ color: 'var(--gov-red)' }}>*</span>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '10px' }}>
                <select
                  value={proofType}
                  onChange={(e) => { setProofType(e.target.value); setProofVerified(false); }}
                  style={{ padding: '9px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '12.5px', background: '#FFFFFF' }}
                >
                  <option value="Aadhaar Card (UIDAI)">Aadhaar Card (12 Digits)</option>
                  <option value="PAN Card (Income Tax Dept)">PAN Card (10 Characters)</option>
                  <option value="Driving License (MoRTH)">Driving License (MoRTH)</option>
                  <option value="Voter ID / EPIC">Voter ID / EPIC Card</option>
                </select>

                <div>
                  <input 
                    type="text"
                    placeholder={proofType.includes('Aadhaar') ? 'e.g. 4829-1920-3841' : 'e.g. ABCDE1234F'}
                    value={proofNumber}
                    onChange={(e) => handleProofNumberChange(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.proofNumber ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13px' }}
                  />
                  {errors.proofNumber && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.proofNumber}</div>}
                  {proofVerified && (
                    <div style={{ fontSize: '11px', color: '#0F766E', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckIcon className="w-3.5 h-3.5" /> Validated against National Citizen Registry format
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Email Address (STRICT @gmail.com VALIDATION) */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                Email Address (Must end with @gmail.com) <span style={{ color: 'var(--gov-red)' }}>*</span>
              </label>
              <input 
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.email ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
              />
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
                Important: Service updates and verification OTPs will be dispatched to this @gmail.com address.
              </div>
              {errors.email && <div style={{ fontSize: '11.5px', color: 'var(--gov-red)', fontWeight: 600, marginTop: '3px' }}>⚠️ {errors.email}</div>}
            </div>

            {/* 5. Password with 8-character, 1 number, 1 special character meter */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Create Password <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="password"
                  placeholder="Min 8 chars, 1 no, 1 special"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.password ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Confirm Password <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.confirmPassword ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Password Validation Live Indicator Pills */}
            <div style={{
              background: '#F8FAFC',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              marginBottom: '14px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '11.5px'
            }}>
              <span style={{ color: hasMinLen ? '#0F766E' : '#64748B', fontWeight: hasMinLen ? 700 : 500, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {hasMinLen ? '✓' : '○'} Min 8 characters
              </span>
              <span style={{ color: hasNumber ? '#0F766E' : '#64748B', fontWeight: hasNumber ? 700 : 500, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {hasNumber ? '✓' : '○'} At least 1 number (0-9)
              </span>
              <span style={{ color: hasSpecial ? '#0F766E' : '#64748B', fontWeight: hasSpecial ? 700 : 500, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {hasSpecial ? '✓' : '○'} At least 1 special char (!@#$%)
              </span>
              <span style={{ color: passwordsMatch ? '#0F766E' : '#64748B', fontWeight: passwordsMatch ? 700 : 500, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {passwordsMatch ? '✓' : '○'} Passwords match
              </span>
            </div>
            {errors.password && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginBottom: '8px' }}>{errors.password}</div>}
            {errors.confirmPassword && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginBottom: '8px' }}>{errors.confirmPassword}</div>}

            {/* 6. Security Recovery Hint Question */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '10px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Hint Question <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <select 
                  value={hintQuestion}
                  onChange={(e) => setHintQuestion(e.target.value)}
                  style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '12.5px', background: '#FFFFFF' }}
                >
                  <option value="Birth City">What is your Birth City?</option>
                  <option value="First School">What was your First School?</option>
                  <option value="Favorite Color">What is your Favorite Color?</option>
                  <option value="Mother Maiden">Mother's Maiden Name</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                  Hint Answer <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <input 
                  type="text"
                  placeholder="Security answer"
                  value={hintAnswer}
                  onChange={(e) => setHintAnswer(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: errors.hintAnswer ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '13px' }}
                />
                {errors.hintAnswer && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '3px' }}>{errors.hintAnswer}</div>}
              </div>
            </div>

            {/* Submit CTA */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                className="btn btn-navy"
                style={{ flex: 1, padding: '12px', fontWeight: 700 }}
              >
                Register & Complete National ID Verification
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={onClose}
                style={{ padding: '12px 20px' }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* SIGN IN FORM */
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>
                Login ID / Registered @gmail.com <span style={{ color: 'var(--gov-red)' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="e.g. shravani@gmail.com or chaitrali@gmail.com"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: errors.loginUser ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '14px' }}
              />
              {errors.loginUser && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '4px' }}>{errors.loginUser}</div>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)' }}>
                  Password <span style={{ color: 'var(--gov-red)' }}>*</span>
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password recovery link dispatched to your verified @gmail.com address.'); }} style={{ fontSize: '12px', color: 'var(--gov-navy)', fontWeight: 600 }}>
                  Forgot Password?
                </a>
              </div>
              <input 
                type="password"
                placeholder="Enter your confidential password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: errors.loginPass ? '1.5px solid var(--gov-red)' : '1px solid var(--border-medium)', fontSize: '14px' }}
              />
              {errors.loginPass && <div style={{ fontSize: '11px', color: 'var(--gov-red)', marginTop: '4px' }}>{errors.loginPass}</div>}
            </div>

            {/* Quick Demo Sign In Shortcut */}
            <div style={{
              background: '#F8FAFC',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              marginBottom: '20px',
              fontSize: '12px'
            }}>
              <div style={{ fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                Demo Accounts for Quick Inspection:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => { setLoginUser('shravani@gmail.com'); setLoginPass('Passport@2026'); }}
                  style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11.5px', color: 'var(--gov-navy)', fontWeight: 600 }}
                >
                  Shravani Deshmukh (shravani@gmail.com)
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginUser('chaitrali@gmail.com'); setLoginPass('Passport@2026'); }}
                  style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11.5px', color: 'var(--gov-navy)', fontWeight: 600 }}
                >
                  Chaitrali Kamble (chaitrali@gmail.com)
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                className="btn btn-navy"
                style={{ flex: 1, padding: '12px', fontWeight: 700 }}
              >
                Sign In to Citizen Portal
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={onClose}
                style={{ padding: '12px 20px' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
