import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FeeCalculator } from './components/FeeCalculator';
import { AppointmentChecker } from './components/AppointmentChecker';
import { StatsSection } from './components/StatsSection';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';
import { FlawInspector } from './components/FlawInspector';
import { CheckIcon } from './components/Icons';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');
  const [showInspector, setShowInspector] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [userSession, setUserSession] = useState(null);

  const scrollToSection = (sectionId) => {
    setCurrentTab(sectionId);
    if (sectionId === 'login') {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    if (sectionId === 'register') {
      setAuthMode('register');
      setAuthModalOpen(true);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectFlaw = (targetId) => {
    if (targetId === 'registration') {
      setAuthMode('register');
      setAuthModalOpen(true);
    } else {
      scrollToSection(targetId);
    }
  };

  return (
    <div className={`app-root font-size-${fontSize}`}>
      {/* UI-01 & UI-05: Clean Two-Tier Header & Streamlined Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={scrollToSection}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showInspector={showInspector}
        setShowInspector={setShowInspector}
      />

      {/* Live Advisory Strip (Clean, unobtrusive ticker) */}
      <div style={{
        background: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        padding: '8px 0',
        fontSize: '13px',
        color: '#1E40AF'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#2563EB',
              color: 'white',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              Active Advisory
            </span>
            <span>
              Applicants are advised to book appointments through official portal only. Special Saturday appointment camps open at select PSKs.
            </span>
          </div>
          <a href="#services" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View Details →
          </a>
        </div>
      </div>

      <main id="main-content">
        {/* UI-02 & UI-04: Hero Section with Visual Hierarchy & Action Focal Point */}
        <div id="hero">
          <Hero
            onApplyClick={() => scrollToSection('register')}
            onTrackClick={() => scrollToSection('track')}
            onCheckSlotsClick={() => scrollToSection('appointment')}
            onFeeClick={() => scrollToSection('fee-calculator')}
          />
        </div>

        {/* UI-03 & UI-10: Comprehensive Services with Uniform Iconography */}
        <div id="services">
          <ServicesSection onSelectService={() => scrollToSection('register')} />
        </div>

        {/* UI-03 & UI-14: Transparent Metrics Ribbon */}
        <div id="stats">
          <StatsSection />
        </div>

        {/* UI-07 & UI-11: Responsive Modern Table for PSK Slot Availability */}
        <div id="appointment">
          <AppointmentChecker onBookSlot={() => scrollToSection('register')} />
        </div>

        {/* UI-06: Interactive Fee Calculator with Balanced Form Layout */}
        <div id="fee-calculator">
          <FeeCalculator onApplyNow={() => scrollToSection('register')} />
        </div>
      </main>

      {/* UI-15: Harmonized GovTech Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* UI-08, UI-09, UI-12, UI-13: Registration & Login Modal */}
      <RegistrationModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setUserSession(user);
          alert(`Welcome, ${user.name}! You are logged in.`);
        }}
      />

      {/* Assignment 1 Evaluator Flaw Inspector Side Drawer */}
      <FlawInspector
        isOpen={showInspector}
        onClose={() => setShowInspector(false)}
        onSelectFlaw={handleSelectFlaw}
      />

      {/* Floating Evaluator Mode Launcher Pill */}
      {!showInspector && (
        <button
          className="flaw-inspector-pill"
          onClick={() => setShowInspector(true)}
          title="Open Assignment 1 UI Problem vs Solution Inspector"
        >
          <span>🔍 Inspect UI Flaws Solved</span>
          <span className="flaw-count-badge">15/15 Solved</span>
        </button>
      )}
    </div>
  );
}
