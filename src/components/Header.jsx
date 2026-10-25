import React, { useState } from 'react';
import { PhoneIcon, GlobeIcon, EyeIcon, SearchIcon, UserIcon } from './Icons';

export const Header = ({ 
  currentTab, 
  setCurrentTab, 
  language, 
  setLanguage,
  fontSize,
  setFontSize
}) => {
  const navItems = [
    { id: 'home', label: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home' },
    { id: 'services', label: language === 'hi' ? 'सेवाएं' : 'Services' },
    { id: 'appointment', label: language === 'hi' ? 'अपॉइंटमेंट उपलब्धता' : 'Appointment Availability' },
    { id: 'fee-calculator', label: language === 'hi' ? 'शुल्क कैलकुलेटर' : 'Fee Calculator' },
    { id: 'track', label: language === 'hi' ? 'आवेदन स्थिति' : 'Track Application' },
    { id: 'stats', label: language === 'hi' ? 'सांख्यिकी' : 'Statistics' }
  ];

  return (
    <header className="header-wrapper">
      {/* ========================================================
          Top Utility Bar: Consolidates secondary utilities cleanly
          ======================================================== */}
      <div className="top-utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
            <a href="tel:18002581800" className="utility-item">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>National Call Centre: <strong>1800-258-1800</strong> (Toll Free)</span>
            </a>
            <span className="utility-divider"></span>
            <div className="utility-item" style={{ fontSize: '12px' }}>
              <span>Operating Hours: 8:00 AM – 10:00 PM IST</span>
            </div>
          </div>

          <div className="utility-right">
            {/* Screen Reader Access */}
            <a href="#main-content" className="utility-item" title="Skip to main content">
              <EyeIcon className="w-3.5 h-3.5" />
              <span>Screen Reader Access</span>
            </a>
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

            {/* Bilingual Switcher */}
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

      {/* ========================================================
          Primary Navigation Bar: Clean, Authoritative, Dignified
          ======================================================== */}
      <nav className="primary-navbar">
        <div className="container navbar-content">
          {/* Brand Identity with Ashoka Lion Emblem Representation */}
          <div className="brand-section" onClick={() => setCurrentTab('home')}>
            <div className="brand-emblem">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5 6.13 12 2.62l7 3.51L12 9.5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>Passport Seva</h1>
              <p>Consular, Passport & Visa Division • Ministry of External Affairs</p>
            </div>
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
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentTab('login')}
            >
              <UserIcon className="w-4 h-4" />
              <span>{language === 'hi' ? 'लॉग इन' : 'Login'}</span>
            </button>
            <button 
              className="btn btn-navy btn-sm"
              onClick={() => setCurrentTab('register')}
            >
              <span>{language === 'hi' ? 'नया पंजीकरण' : 'Register'}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
