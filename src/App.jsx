import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DocumentAdvisor } from './components/DocumentAdvisor';
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
import { LiveTrackerModal } from './components/LiveTrackerModal';
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
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [trackedFileNo, setTrackedFileNo] = useState('BOM069123456726');
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
    setTimeout(() => {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 60);
  };

  const handleTrackFile = (fileNumber) => {
    setTrackedFileNo(fileNumber);
    setTrackerModalOpen(true);
  };

  return (
    <div className={`app-root font-size-${fontSize}`}>
      {/* Header with Bilingual Toggle, SSL Trust Badge, and Global Search */}
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
          {/* Hero Section */}
          <div id="hero">
            <Hero
              language={language}
              onApplyClick={() => setWizardOpen(true)}
              onTrackClick={handleTrackFile}
              onCheckSlotsClick={() => handleNavigation('appointment')}
              onDocAdvisorClick={() => handleNavigation('document-advisor')}
              onFeeClick={() => handleNavigation('fee-calculator')}
            />
          </div>

          {/* Announcement & Circular Center (Active vs Archived) */}
          <AnnouncementCenter language={language} />

          {/* Interactive Document Advisor Engine */}
          <div id="document-advisor">
            <DocumentAdvisor language={language} onStartApplication={() => setWizardOpen(true)} />
          </div>

          {/* Citizen Services */}
          <div id="services">
            <ServicesSection language={language} onSelectService={() => setWizardOpen(true)} />
          </div>

          {/* Statistics Section */}
          <div id="stats">
            <StatsSection language={language} />
          </div>

          {/* Appointment Availability Finder (Table & Heatmap View) */}
          <div id="appointment">
            <AppointmentChecker language={language} onBookSlot={() => setWizardOpen(true)} />
          </div>

          {/* Interactive Fee Calculator */}
          <div id="fee-calculator">
            <FeeCalculator language={language} onApplyNow={() => setWizardOpen(true)} />
          </div>

          {/* Centralized FAQ Knowledge Base */}
          <div id="faq">
            <FaqSection language={language} onContactHelp={() => setChatbotOpen(true)} />
          </div>
        </>
      )}

      {/* Official Harmonized Footer */}
      <div id="footer">
        <Footer language={language} />
      </div>

      {/* Registration & Login Modal with Guidance */}
      <RegistrationModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={(user) => {
          setUserSession(user);
          setCurrentTab('dashboard');
        }}
      />

      {/* Multi-Step Application Wizard with Draft Auto-Save */}
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

      {/* Global Site-Wide Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleNavigation}
      />

      {/* Intelligent Citizen Assistant Chatbot with Account-Bound Memory */}
      <CitizenChatbot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        onNavigate={handleNavigation}
        userSession={userSession}
      />

      {/* Official Security & SSL Trust Modal */}
      <SecurityTrustModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />

      {/* Live 5-Stage Dispatch Tracker Modal */}
      <LiveTrackerModal
        isOpen={trackerModalOpen}
        fileNo={trackedFileNo}
        onClose={() => setTrackerModalOpen(false)}
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
          <span>
            {language === 'mr' ? 'सेवा मित्र सहाय्यक' : language === 'hi' ? 'सेवा मित्र सहायक' : language === 'kn' ? 'ಸೇವಾ ಮಿತ್ರ ಸಹಾಯಕ' : language === 'gu' ? 'સેવા મિત્ર સહાયક' : 'Ask Seva Mitra Assistant'}
          </span>
        </button>
      )}
    </div>
  );
}
