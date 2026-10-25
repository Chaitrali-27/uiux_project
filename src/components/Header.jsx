import React, { useState } from 'react';
import { PhoneIcon, GlobeIcon, EyeIcon, SearchIcon, UserIcon, ShieldIcon } from './Icons';
import { translations } from '../utils/translations';

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
  const t = translations[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeechReader = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = language === 'hi' 
        ? "पासपोर्ट सेवा पोर्टल में आपका स्वागत है। भारत सरकार विदेश मंत्रालय। ऑनलाइन पासपोर्ट सेवाओं के लिए आवेदन करें।" 
        : "Welcome to Passport Seva Portal, Government of India, Ministry of External Affairs. Apply online for fresh passports, check appointment availability, or track your dispatch status.";
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'document-advisor', label: language === 'hi' ? 'दस्तावेज़ सलाहकार' : 'Document Advisor' },
    { id: 'appointment', label: t.navAppointments },
    { id: 'fee-calculator', label: t.navFeeCalc },
    { id: 'services', label: t.navServices },
    { id: 'faq', label: t.navFaq }
  ];

  return (
    <header className="header-wrapper">
      {/* Top Utility Ribbon */}
      <div className="top-utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
            <a href="tel:18002581800" className="utility-item">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>{t.helpline}</span>
            </a>
            <span className="utility-divider"></span>
            <div className="utility-item" style={{ fontSize: '12px' }}>
              <span>{t.hours}</span>
            </div>
          </div>

          <div className="utility-right">
            {/* Native Voice / Speech Accessibility Button */}
            <button 
              onClick={toggleSpeechReader}
              className="utility-item"
              style={{ background: isSpeaking ? 'var(--gov-saffron)' : 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px' }}
              title="Listen to page aloud (Screen Reader Assistant)"
            >
              <span>{isSpeaking ? '⏹️ Stop Audio' : '🔊 Listen to Page'}</span>
            </button>
            <span className="utility-divider"></span>

            {/* Verified Security SSL Trust Badge */}
            <button 
              onClick={onOpenSecurityTrust}
              className="utility-item"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#86EFAC' }}
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

            {/* Bilingual Switcher English / Hindi */}
            <button 
              className="lang-switch" 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              title="Toggle language English / Hindi"
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="primary-navbar">
        <div className="container navbar-content">
          {/* Brand Identity */}
          <div className="brand-section" onClick={() => setCurrentTab('home')}>
            <div className="brand-emblem">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5 6.13 12 2.62l7 3.51L12 9.5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>{t.brandTitle}</h1>
              <p>{t.brandSubtitle}</p>
            </div>
          </div>

          {/* Persistent Search Trigger in Header */}
          <div 
            onClick={onOpenSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F1F5F9',
              borderRadius: '8px',
              padding: '8px 14px',
              cursor: 'pointer',
              border: '1px solid var(--border-medium)',
              gap: '8px',
              color: '#64748B',
              fontSize: '13.5px',
              width: '260px'
            }}
          >
            <SearchIcon className="w-4 h-4" style={{ color: 'var(--gov-navy)' }} />
            <span style={{ flexGrow: 1 }}>{language === 'hi' ? 'खोजें (Ctrl + K)...' : 'Search portal (Ctrl+K)...'}</span>
            <kbd style={{ fontSize: '11px', background: '#FFFFFF', padding: '2px 5px', borderRadius: '4px', border: '1px solid #CBD5E1', color: '#475569' }}>
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
                >
                  <UserIcon className="w-4 h-4" />
                  <span>{t.login}</span>
                </button>
                <button 
                  className="btn btn-navy btn-sm"
                  onClick={() => setCurrentTab('register')}
                >
                  <span>{t.register}</span>
                </button>
              </>
            ) : (
              <button 
                className="btn btn-navy btn-sm"
                onClick={() => setCurrentTab('dashboard')}
              >
                <UserIcon className="w-4 h-4" />
                <span>My Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
