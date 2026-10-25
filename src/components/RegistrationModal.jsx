import React, { useState } from 'react';
import { XIcon, AlertCircleIcon, CheckIcon } from './Icons';

export const RegistrationModal = ({ isOpen, onClose, initialMode = 'register', onSuccess }) => {
  const [mode, setMode] = useState(initialMode);

  // Form State
  const [registerAt, setRegisterAt] = useState('rpo');
  const [passportOffice, setPassportOffice] = useState('Mumbai');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [sameAsEmail, setSameAsEmail] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const validateRegistration = () => {
    const errs = {};
    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full legal name as per official identity proof';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!sameAsEmail && !loginId.trim()) {
      errs.loginId = 'Please enter a unique Login ID';
    }
    if (!password || password.length < 8) {
      errs.password = 'Password must be at least 8 characters long';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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
    setTimeout(() => {
      onSuccess?.({ name: fullName, email: email });
      onClose();
    }, 1200);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginUser.trim()) errs.loginUser = 'Login ID or Registered Email is required';
    if (!loginPass) errs.loginPass = 'Password is required to authenticate';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmittedSuccess(true);
    setTimeout(() => {
      onSuccess?.({ name: loginUser.split('@')[0], email: loginUser });
      onClose();
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(4, 16, 33, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        padding: '32px'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)' }}>
              {mode === 'register' ? 'Register for Citizen Services' : 'Sign in to Passport Seva'}
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
              {mode === 'register' 
                ? 'Create your citizen credentials to initiate applications, book slots, and pay statutory fees.' 
                : 'Access your submitted applications and track appointment schedules.'}
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
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
          <button 
            type="button"
            className="hero-tab-btn"
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
            onClick={() => { setMode('register'); setErrors({}); }}
          >
            New Applicant Registration
          </button>
          <button 
            type="button"
            className="hero-tab-btn"
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
            onClick={() => { setMode('login'); setErrors({}); }}
          >
            Existing Citizen Login
          </button>
        </div>

        {submittedSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#F0FDF4',
              color: '#0F766E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              border: '1px solid #BBF7D0'
            }}>
              <CheckIcon className="w-8 h-8" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)' }}>
              {mode === 'register' ? 'Registration Successful' : 'Authentication Verified'}
            </h3>
            <p style={{ color: '#64748B', fontSize: '14px', marginTop: '6px' }}>
              Redirecting you to your applicant dashboard...
            </p>
          </div>
        ) : mode === 'register' ? (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">
                Register to apply at
                <span className="form-label-helper">Select office jurisdiction</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  border: registerAt === 'rpo' ? '2px solid var(--gov-navy)' : '1px solid #CBD5E1',
                  background: registerAt === 'rpo' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  <input 
                    type="radio" 
                    name="regTarget" 
                    checked={registerAt === 'rpo'} 
                    onChange={() => setRegisterAt('rpo')}
                  />
                  <span>Passport Office (Standard Citizen)</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  border: registerAt === 'cpv' ? '2px solid var(--gov-navy)' : '1px solid #CBD5E1',
                  background: registerAt === 'cpv' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  <input 
                    type="radio" 
                    name="regTarget" 
                    checked={registerAt === 'cpv'} 
                    onChange={() => setRegisterAt('cpv')}
                  />
                  <span>CPV Delhi (Diplomatic Division)</span>
                </label>
              </div>
            </div>

            {registerAt === 'rpo' && (
              <div className="form-group">
                <label className="form-label" htmlFor="reg-rpo">
                  Regional Passport Jurisdiction
                  <span className="required-star">*</span>
                </label>
                <select 
                  id="reg-rpo" 
                  className="form-select"
                  value={passportOffice}
                  onChange={(e) => setPassportOffice(e.target.value)}
                >
                  <option value="Mumbai">Mumbai (Maharashtra & Goa)</option>
                  <option value="Delhi">Delhi (NCR Region)</option>
                  <option value="Pune">Pune (Western Maharashtra)</option>
                  <option value="Bengaluru">Bengaluru (Karnataka)</option>
                  <option value="Hyderabad">Hyderabad (Telangana)</option>
                  <option value="Ahmedabad">Ahmedabad (Gujarat)</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">
                Full Legal Name (Given Name + Surname)
                <span className="required-star">*</span>
              </label>
              <input 
                id="reg-name"
                type="text"
                placeholder="e.g. Chaitrali Kamble"
                className={`form-input ${errors.fullName ? 'is-error' : ''}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <div className="form-error-msg">
                  <AlertCircleIcon className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Official Email Address
                <span className="required-star">*</span>
              </label>
              <input 
                id="reg-email"
                type="email"
                placeholder="chaitrali@example.com"
                className={`form-input ${errors.email ? 'is-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="form-error-msg">
                  <AlertCircleIcon className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13.5px', color: '#1E293B' }}>
                <input 
                  type="checkbox" 
                  checked={sameAsEmail} 
                  onChange={(e) => setSameAsEmail(e.target.checked)} 
                />
                <span>Set my email address as my permanent Login ID (Recommended)</span>
              </label>
            </div>

            {!sameAsEmail && (
              <div className="form-group">
                <label className="form-label" htmlFor="reg-loginid">
                  Custom Login ID
                  <span className="required-star">*</span>
                </label>
                <input 
                  id="reg-loginid"
                  type="text"
                  placeholder="Choose unique username"
                  className={`form-input ${errors.loginId ? 'is-error' : ''}`}
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
                {errors.loginId && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>{errors.loginId}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pass">
                  Password
                  <span className="required-star">*</span>
                </label>
                <input 
                  id="reg-pass"
                  type="password"
                  placeholder="Minimum 8 characters"
                  className={`form-input ${errors.password ? 'is-error' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">
                  Confirm Password
                  <span className="required-star">*</span>
                </label>
                <input 
                  id="reg-confirm"
                  type="password"
                  placeholder="Re-enter password"
                  className={`form-input ${errors.confirmPassword ? 'is-error' : ''}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <div className="form-error-msg">
                    <AlertCircleIcon className="w-3.5 h-3.5" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-navy" style={{ flex: 1 }}>
                Register Account
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-user">
                Login ID or Registered Email
                <span className="required-star">*</span>
              </label>
              <input 
                id="login-user"
                type="text"
                placeholder="e.g. chaitrali@example.com"
                className={`form-input ${errors.loginUser ? 'is-error' : ''}`}
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
              {errors.loginUser && (
                <div className="form-error-msg">
                  <AlertCircleIcon className="w-3.5 h-3.5" />
                  <span>{errors.loginUser}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-pass">
                Password
                <span className="required-star">*</span>
              </label>
              <input 
                id="login-pass"
                type="password"
                placeholder="••••••••"
                className={`form-input ${errors.loginPass ? 'is-error' : ''}`}
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              {errors.loginPass && (
                <div className="form-error-msg">
                  <AlertCircleIcon className="w-3.5 h-3.5" />
                  <span>{errors.loginPass}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked />
                <span>Remember me on this trusted device</span>
              </label>
              <a href="#forgot" style={{ color: 'var(--gov-blue-accent)', textDecoration: 'none', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-navy" style={{ width: '100%' }}>
              Log in to Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
