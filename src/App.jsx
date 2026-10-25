import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FeeCalculator } from './components/FeeCalculator';
import { AppointmentChecker } from './components/AppointmentChecker';
import { StatsSection } from './components/StatsSection';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');
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

  return (
    <div className={`app-root font-size-${fontSize}`}>
      {/* Dignified Two-Tier Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={scrollToSection}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Official Government Advisory Banner */}
      <div style={{
        background: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        padding: '9px 0',
        fontSize: '13px',
        color: '#1E3A8A'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#1D4ED8',
              color: 'white',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Citizen Advisory
            </span>
            <span>
              Beware of fraudulent websites. Official passport services are delivered exclusively through <strong>passportindia.gov.in</strong>. No middleman is authorized for appointment booking.
            </span>
          </div>
          <a href="#appointment" onClick={() => scrollToSection('appointment')} style={{ color: '#1D4ED8', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Check Slots →
          </a>
        </div>
      </div>

      <main id="main-content">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onApplyClick={() => scrollToSection('register')}
            onTrackClick={() => scrollToSection('track')}
            onCheckSlotsClick={() => scrollToSection('appointment')}
            onFeeClick={() => scrollToSection('fee-calculator')}
          />
        </div>

        {/* Citizen Services */}
        <div id="services">
          <ServicesSection onSelectService={() => scrollToSection('register')} />
        </div>

        {/* Statistics Section */}
        <div id="stats">
          <StatsSection />
        </div>

        {/* Appointment Availability Finder */}
        <div id="appointment">
          <AppointmentChecker onBookSlot={() => scrollToSection('register')} />
        </div>

        {/* Interactive Fee Calculator */}
        <div id="fee-calculator">
          <FeeCalculator onApplyNow={() => scrollToSection('register')} />
        </div>
      </main>

      {/* Official Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* Registration & Login Modal */}
      <RegistrationModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setUserSession(user);
          alert(`Welcome, ${user.name}! You are authenticated.`);
        }}
      />
    </div>
  );
}
