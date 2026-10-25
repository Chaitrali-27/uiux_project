import React, { useState } from 'react';
import { PhoneIcon, GlobeIcon, SearchIcon, UserIcon, ShieldIcon, ChevronDownIcon } from './Icons';
import { translations, languagesList } from '../utils/translations';

export const Header = ({ 
  currentTab, 
  setCurrentTab, 
  language, 
  setLanguage,
  fontSize,
  setFontSize,
  userSession,
  onOpenSearch,
  onOpenSecurityTrust
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language] || translations.en;
  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  const handleVoiceRead = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `Welcome to Passport Seva, Consular, Passport and Visa Division, Ministry of External Affairs, Government of India. 
      You are viewing the official digital portal. Official toll-free call centre is 1800-258-1800.
      You can access the Document Advisor, Appointment Availability, Fee Calculator, and Live Speed Post Tracking.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech audio reader is not supported in your current browser.');
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'document-advisor', label: t.navDocAdvisor || 'Document Advisor' },
    { id: 'appointment', label: t.navAppointments },
    { id: 'fee-calculator', label: t.navFeeCalc },
    { id: 'services', label: t.navServices },
    { id: 'faq', label: t.navFaq }
  ];

  return (
    <header className="site-header" style={{ fontFamily: 'var(--font-serif)' }}>
      {/* Top Utility Bar (Toll-Free, Voice Reader, 256-bit SSL, Font Sizer, 12 Indian Languages) */}
      <div className="utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
            <span className="utility-item">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>{t.helpline}</span>
            </span>
            <span className="utility-divider"></span>
            <span className="utility-item hide-mobile">
              <span>{t.hours}</span>
            </span>
          </div>

          <div className="utility-right">
            {/* Screen Voice Reader */}
            <button 
              onClick={handleVoiceRead}
              className="utility-item"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#FDE047', display: 'flex', alignItems: 'center', gap: '5px' }}
              title="Listen to page contents via audio speech synthesis"
            >
              <span>🔊 Listen to Page</span>
            </button>
            <span className="utility-divider"></span>

            {/* Official SSL Certificate Trust Modal Trigger */}
            <button 
              onClick={onOpenSecurityTrust}
              className="utility-item"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '5px' }}
              title="View Government Security & 256-bit SSL Certificate"
            >
              <ShieldIcon className="w-3.5 h-3.5" />
              <span>Official GOI 256-bit SSL Verified</span>
            </button>
            <span className="utility-divider"></span>

            {/* Font Resizing Controls */}
            <div className="font-resizer" title="Adjust text size">
              <button 
                className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => setFontSize('small')}
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                className={`font-btn ${fontSize === 'normal' ? 'active' : ''}`}
                onClick={() => setFontSize('normal')}
                title="Standard font size"
              >
                A
              </button>
              <button 
                className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => setFontSize('large')}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <span className="utility-divider"></span>

            {/* Multilingual Selector (12 Indian Regional Languages) */}
            <div style={{ position: 'relative' }}>
              <button 
                className="lang-switch" 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Select language from 12 Indian states"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>🌐 {currentLangObj.native} ({currentLangObj.name})</span>
                <ChevronDownIcon className="w-3 h-3" />
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#FFFFFF',
                  color: 'var(--text-heading)',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-medium)',
                  width: '260px',
                  maxHeight: '360px',
                  overflowY: 'auto',
                  zIndex: 2000,
                  padding: '6px'
                }}>
                  <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase' }}>
                    Select State / Regional Language
                  </div>
                  {languagesList.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        border: 'none',
                        background: language === l.code ? '#F0FDF4' : 'transparent',
                        color: language === l.code ? '#0F766E' : 'var(--text-heading)',
                        fontWeight: language === l.code ? 700 : 500,
                        fontSize: '13px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span><strong>{l.native}</strong> ({l.name})</span>
                      <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{l.state}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="primary-navbar">
        <div className="container navbar-content">
          {/* Prestigious National Emblem & Brand Heading */}
          <div 
            className="brand-section" 
            onClick={() => setCurrentTab('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            {/* National Ashoka Lion Emblem Badge */}
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
              border: '2px solid var(--gov-gold)',
              boxShadow: '0 4px 10px rgba(8, 30, 58, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FDE047',
              flexShrink: 0
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>

            <div className="brand-text">
              <h1 style={{
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--gov-navy)',
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                margin: 0,
                textTransform: 'uppercase'
              }}>
                {t.brandTitle} <span style={{ color: 'var(--gov-gold)', fontSize: '16px', fontWeight: 600 }}>• भारत</span>
              </h1>
              <p style={{
                fontSize: '11.5px',
                color: '#475569',
                marginTop: '3px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                lineHeight: 1.3
              }}>
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Persistent Search Trigger in Header */}
          <div 
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F8FAFC',
              borderRadius: '8px',
              padding: '8px 14px',
              cursor: 'pointer',
              border: '1.5px solid var(--border-medium)',
              gap: '8px',
              color: '#64748B',
              fontSize: '13.5px',
              width: '240px',
              transition: 'border-color 0.2s ease'
            }}
          >
            <SearchIcon className="w-4 h-4" style={{ color: 'var(--gov-navy)' }} />
            <span style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t.searchPlaceholder}
            </span>
            <kbd style={{ fontSize: '10.5px', background: '#FFFFFF', padding: '2px 5px', borderRadius: '4px', border: '1px solid #CBD5E1', color: '#475569' }}>
              ⌘K
            </kbd>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentTab(item.id)}
                  style={{ fontWeight: currentTab === item.id ? 700 : 500 }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="nav-actions">
            {!userSession ? (
              <>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setCurrentTab('login')}
                  style={{ fontWeight: 600 }}
                >
                  <UserIcon className="w-4 h-4" />
                  <span>{t.login}</span>
                </button>
                <button 
                  className="btn btn-navy btn-sm"
                  onClick={() => setCurrentTab('register')}
                  style={{ fontWeight: 700 }}
                >
                  <span>{t.register}</span>
                </button>
              </>
            ) : (
              <button 
                className="btn btn-navy btn-sm"
                onClick={() => setCurrentTab('dashboard')}
                style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <UserIcon className="w-4 h-4" />
                <span>My Dashboard ({userSession.name?.split(' ')[0] || 'Citizen'})</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
