import React, { useState } from 'react';
import { Header } from './components/Header';
import { CheckIcon } from './components/Icons';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');
  const [showInspector, setShowInspector] = useState(true);

  return (
    <div className={`app-root font-size-${fontSize}`}>
      {/* UI-01: Redesigned Separated Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showInspector={showInspector}
        setShowInspector={setShowInspector}
      />

      <main className="container" style={{ padding: '40px 16px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              background: '#ECFDF5',
              color: '#059669',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckIcon className="w-4 h-4" /> UI-01 Solved: Overcrowded Header Resolved
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0A2540', marginBottom: '12px' }}>
            Step 1 Implemented: Two-Tier Clean Header
          </h2>
          <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, maxWidth: '800px' }}>
            We separated the cluttered old header into two distinct levels:
          </p>
          <ul style={{ margin: '16px 0 24px 20px', color: '#334155', fontSize: '14.5px', lineHeight: 1.8 }}>
            <li><strong>Tier 1: Top Utility Bar (Dark Navy #07192C)</strong> — houses secondary utilities (24/7 Call Centre 1800-258-1800, Screen Reader Access, Font Resizers A-/A/A+, and English/Hindi language toggle).</li>
            <li><strong>Tier 2: Primary Navigation Bar (Clean White)</strong> — showcases the clean Government of India emblem, core citizen actions (Home, Services, Appointment Slots, Fee Calculator, Track Status), and distinct Login / Register buttons.</li>
          </ul>

          <div style={{
            background: '#F8FAFC',
            padding: '16px 20px',
            borderRadius: '10px',
            borderLeft: '4px solid #0066CC',
            fontSize: '14px',
            color: '#1E293B'
          }}>
            <strong>Next up: UI-02 (Poor Color Hierarchy)</strong> — We will define and establish the uniform GovTech color system across hero banners, cards, and buttons!
          </div>
        </div>
      </main>
    </div>
  );
}
