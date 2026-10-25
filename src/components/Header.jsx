import React, { useState } from 'react';
import { PhoneIcon, GlobeIcon, SearchIcon, UserIcon, ShieldIcon, ChevronDownIcon } from './Icons';
import { getTranslation, languagesList } from '../utils/translations';

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
  const t = getTranslation(language);
  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  const handleVoiceRead = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${t.brandTitle}, ${t.brandSubtitle}. ${t.helpline}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech audio reader is not supported in your current browser.');
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'document-advisor', label: t.navDocAdvisor },
    { id: 'appointment', label: t.navAppointments },
    { id: 'fee-calculator', label: t.navFeeCalc },
    { id: 'services', label: t.navServices },
    { id: 'faq', label: t.navFaq }
  ];

  return (
    <header className="site-header" style={{ fontFamily: 'var(--font-serif)', width: '100%' }}>
      {/* Top Utility Bar with Deep Midnight Navy (#041021) & 100% High-Contrast Text */}
      <div 
        className="utility-bar" 
        style={{ 
          backgroundColor: '#041021', 
          color: '#FFFFFF', 
          padding: '8px 0', 
          borderBottom: '1px solid rgba(194, 147, 41, 0.4)',
          fontSize: '12.5px',
          width: '100%'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontWeight: 700 }}>
              <PhoneIcon className="w-3.5 h-3.5" style={{ color: '#FDE047' }} />
              <span style={{ color: '#FFFFFF' }}>{t.helpline}</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>|</span>
            <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 500 }}>
              {t.hours}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Screen Voice Reader */}
            <button 
              onClick={handleVoiceRead}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#FDE047', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}
              title="Listen to page contents via audio speech synthesis"
            >
              <span>🔊 {t.listenPage}</span>
            </button>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>|</span>

            {/* Official SSL Certificate Trust Modal Trigger */}
            <button 
              onClick={onOpenSecurityTrust}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#86EFAC', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}
              title="View Government Security & 256-bit SSL Certificate"
            >
              <ShieldIcon className="w-3.5 h-3.5" />
              <span>{t.sslVerified}</span>
            </button>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>|</span>

            {/* Font Resizing Controls */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '4px', padding: '1px 3px' }}>
              <button 
                onClick={() => setFontSize('small')}
                style={{ background: fontSize === 'small' ? 'var(--gov-gold)' : 'none', border: 'none', color: '#FFFFFF', padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('normal')}
                style={{ background: fontSize === 'normal' ? 'var(--gov-gold)' : 'none', border: 'none', color: '#FFFFFF', padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                style={{ background: fontSize === 'large' ? 'var(--gov-gold)' : 'none', border: 'none', color: '#FFFFFF', padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                A+
              </button>
            </div>

            <span style={{ color: 'rgba(255,255,255,0.35)' }}>|</span>

            {/* Multilingual Selector (12 Indian Regional Languages) */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  background: 'rgba(255, 255, 255, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Select language from 12 Indian states"
              >
                <GlobeIcon className="w-3.5 h-3.5" style={{ color: '#FDE047' }} />
                <span>🌐 {currentLangObj.native}</span>
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
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                  border: '1px solid var(--border-medium)',
                  width: '240px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  zIndex: 2500,
                  padding: '6px'
                }}>
                  <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #E2E8F0', textTransform: 'uppercase' }}>
                    Select Regional Language
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
                      <span style={{ fontSize: '10px', color: '#94A3B8' }}>{l.state}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar — Spacious, Clean & Decluttered */}
      <nav style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '74px', padding: '8px 16px', gap: '16px' }}>
          
          {/* Brand Emblem & Authority Header */}
          <div 
            onClick={() => setCurrentTab('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
              border: '2px solid var(--gov-gold)',
              boxShadow: '0 3px 8px rgba(8, 30, 58, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FDE047',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>

            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--gov-navy)',
                margin: 0,
                lineHeight: 1.15,
                textTransform: 'uppercase'
              }}>
                {t.brandTitle} <span style={{ color: 'var(--gov-gold)', fontSize: '14px' }}>• भारत</span>
              </h1>
              <p style={{
                fontSize: '11px',
                color: '#64748B',
                margin: '2px 0 0 0',
                fontWeight: 600,
                maxWidth: '260px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {t.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Clean Desktop Navigation Links (Uncluttered) */}
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px', alignItems: 'center' }}>
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentTab(item.id)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '13.5px',
                    fontWeight: currentTab === item.id ? 700 : 600,
                    borderRadius: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Search Trigger & User Authentication CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Compact Search Trigger */}
            <button 
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#F8FAFC',
                border: '1px solid var(--border-medium)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#475569',
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
              title="Global portal search (Ctrl+K)"
            >
              <SearchIcon className="w-3.5 h-3.5" style={{ color: 'var(--gov-navy)' }} />
              <span>{language === 'gu' ? 'શોધો' : language === 'hi' ? 'खोजें' : 'Search'}</span>
              <kbd style={{ fontSize: '10px', background: '#FFFFFF', padding: '1px 4px', borderRadius: '3px', border: '1px solid #CBD5E1', color: '#64748B' }}>
                ⌘K
              </kbd>
            </button>

            {!userSession ? (
              <>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setCurrentTab('login')}
                  style={{ fontWeight: 700, padding: '7px 12px', fontSize: '12.5px' }}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{t.login}</span>
                </button>
                <button 
                  className="btn btn-navy btn-sm"
                  onClick={() => setCurrentTab('register')}
                  style={{ fontWeight: 700, padding: '7px 14px', fontSize: '12.5px' }}
                >
                  <span>{t.register}</span>
                </button>
              </>
            ) : (
              <button 
                className="btn btn-navy btn-sm"
                onClick={() => setCurrentTab('dashboard')}
                style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px' }}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
