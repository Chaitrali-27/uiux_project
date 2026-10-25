import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FeeCalculator } from './components/FeeCalculator';
import { AppointmentChecker } from './components/AppointmentChecker';
import { StatsSection } from './components/StatsSection';
import { FaqSection } from './components/FaqSection';
import { AnnouncementCenter } from './components/AnnouncementCenter';
import { RegistrationModal } from './components/RegistrationModal';
import { ApplicationWizard } from './components/ApplicationWizard';
import { ApplicantDashboard } from './components/ApplicantDashboard';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CitizenChatbot } from './components/CitizenChatbot';
import { SecurityTrustModal } from './components/SecurityTrustModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');

  // Modals & Drawers State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const handleNavigation = (targetId) => {
    if (targetId === 'login') {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    if (targetId === 'register') {
      setAuthMode('register');
      setAuthModalOpen(true);
      return;
    }
    if (targetId === 'apply-wizard') {
      // UX-15 Fix: Seamlessly opens the application wizard directly without loop
      setWizardOpen(true);
      return;
    }
    if (targetId === 'dashboard') {
      setCurrentTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'open-search') {
      setSearchOpen(true);
      return;
    }

    setCurrentTab(targetId);
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`app-root font-size-${fontSize}`}>
      {/* Header with Bilingual Toggle, SSL Trust Badge, and Global Search (UX-02, UX-07, UX-10) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNavigation}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        userSession={userSession}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSecurityTrust={() => setSecurityModalOpen(true)}
      />

      {/* Main View: Public Portal vs Logged-In Dashboard */}
      {currentTab === 'dashboard' && userSession ? (
        /* UX-08 & UX-09: Streamlined Dashboard with Persistent FAQ Help */
        <ApplicantDashboard
          user={userSession}
          onLogout={() => {
            setUserSession(null);
            setCurrentTab('home');
          }}
          onNewApplication={() => setWizardOpen(true)}
          onOpenFaq={() => handleNavigation('faq')}
          onCheckSlots={() => handleNavigation('appointment')}
        />
      ) : (
        <>
          {/* Hero Section with Focal CTAs */}
          <div id="hero">
            <Hero
              onApplyClick={() => setWizardOpen(true)}
              onTrackClick={() => handleNavigation('hero')}
              onCheckSlotsClick={() => handleNavigation('appointment')}
              onFeeClick={() => handleNavigation('fee-calculator')}
            />
          </div>

          {/* UX-03: Announcement Center with Active vs Archived Notices */}
          <AnnouncementCenter />

          {/* Citizen Services */}
          <div id="services">
            <ServicesSection onSelectService={() => setWizardOpen(true)} />
          </div>

          {/* Statistics Section */}
          <div id="stats">
            <StatsSection />
          </div>

          {/* UX-04 & UX-06: Appointment Slot Availability Finder */}
          <div id="appointment">
            <AppointmentChecker onBookSlot={() => setWizardOpen(true)} />
          </div>

          {/* Interactive Fee Calculator */}
          <div id="fee-calculator">
            <FeeCalculator onApplyNow={() => setWizardOpen(true)} />
          </div>

          {/* UX-05 & UX-09: Centralized FAQ Knowledge Base */}
          <div id="faq">
            <FaqSection onContactHelp={() => setChatbotOpen(true)} />
          </div>
        </>
      )}

      {/* Harmonized Footer */}
      <div id="footer">
        <Footer />
      </div>

      {/* UX-14: Registration & Login Modal with Inline Guidance */}
      <RegistrationModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setUserSession(user);
          setCurrentTab('dashboard');
        }}
      />

      {/* UX-11, UX-12, UX-13, UX-15: Multi-Step Application Wizard */}
      <ApplicationWizard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onFinish={() => {
          alert('Application successfully initiated! Reference number generated: BOM069123456726. Redirecting to your dashboard.');
          setWizardOpen(false);
          setUserSession({ name: 'Chaitrali Kamble', email: 'chaitrali@example.com' });
          setCurrentTab('dashboard');
        }}
      />

      {/* UX-10: Global Site-Wide Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleNavigation}
      />

      {/* UX-01: Intelligent Citizen Assistant Chatbot */}
      <CitizenChatbot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        onNavigate={handleNavigation}
      />

      {/* UX-02: Official Security & SSL Trust Modal */}
      <SecurityTrustModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />

      {/* Floating AI Citizen Assistant (Seva Mitra) Launcher */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
            color: '#FFFFFF',
            border: '2px solid var(--gov-gold)',
            borderRadius: '9999px',
            padding: '12px 20px',
            boxShadow: 'var(--shadow-hover)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-serif)',
            fontSize: '14.5px',
            fontWeight: 700
          }}
          title="Ask Seva Mitra Citizen Digital Assistant"
        >
          <span style={{ fontSize: '18px' }}>💬</span>
          <span>Ask Seva Mitra Assistant</span>
        </button>
      )}
    </div>
  );
}
