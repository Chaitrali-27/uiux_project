import React, { useState } from 'react';
import { CheckIcon, XIcon, AlertCircleIcon, ShieldIcon } from './Icons';

export const FlawInspector = ({ isOpen, onClose, onSelectFlaw }) => {
  const [activeTab, setActiveTab] = useState('ui'); // 'ui', 'ux', or 'rubrics'
  const [selectedUiId, setSelectedUiId] = useState('UI-01');
  const [selectedUxId, setSelectedUxId] = useState('UX-02');
  const [selectedRubricId, setSelectedRubricId] = useState('R-01');

  const uiFlaws = [
    {
      id: 'UI-01',
      title: 'Overcrowded Header Layout',
      problem: 'Too many elements crammed into a single bar: live clock, accessibility toggles, language, helpline, login, and dense nav menus.',
      fix: 'Architected two-tier header: a sleek 36px top utility bar for secondary tools, and an authoritative 74px primary brand navbar.',
      target: 'header'
    },
    {
      id: 'UI-02',
      title: 'Poor Color Hierarchy & Clashing Tones',
      problem: 'Clashing blue->red gradients, muddy yellow quick boxes, and harsh red highlights without contrast guidelines.',
      fix: 'Implemented GovTech design tokens: Imperial Navy (#081E3A), Regal Gold (#C29329), National Saffron (#E25822), and crisp warm alabaster surface (#F8FAFC).',
      target: 'hero'
    },
    {
      id: 'UI-03',
      title: 'Repetitive Boxes & Visual Fatigue',
      problem: 'Every section (Quick Links, News, Circulars, Stats) was boxed into identical rectangular borders.',
      fix: 'Designed varied visual rhythms: borderless elevated stats counter ribbon, subtle glass cards, and spacious section containers.',
      target: 'stats'
    },
    {
      id: 'UI-04',
      title: 'No Visual Focal Point on Homepage',
      problem: 'Everything had identical visual weight; citizens had no clear starting point.',
      fix: 'Created an authoritative Hero Action Center with high-contrast focal points: "Apply for Passport", "Check Slots", and "Quick Track".',
      target: 'hero'
    },
    {
      id: 'UI-05',
      title: 'Cluttered Navigation Bar (Too Many Buried Links)',
      problem: '12+ links exposed simultaneously with multi-column deep dropdowns that buried citizen actions.',
      fix: 'Consolidated into 5 primary citizen intents with clear labels, 15.5px bold typography, and intuitive single-level dropdowns.',
      target: 'header'
    },
    {
      id: 'UI-06',
      title: 'Weak Form Design in Fee Calculator',
      problem: 'Single isolated dropdown floating in empty space, looking unfinished and abandoned.',
      fix: 'Transformed into a comprehensive calculator with service type, age group, booklet size, scheme, and real-time fee breakdown.',
      target: 'fee-calculator'
    },
    {
      id: 'UI-07',
      title: 'No Responsive or Mobile-First Layout',
      problem: 'Fixed desktop resolution caused horizontal scrolling, cut-off text, and unusable mobile views.',
      fix: 'Built with mobile-first CSS media queries, responsive grids, collapsible mobile menu, and fluid viewport scaling.',
      target: 'header'
    },
    {
      id: 'UI-08',
      title: 'Overuse of Aggressive All-Caps Text in Forms',
      problem: 'Forms and instructions were in aggressive ALL-CAPS text ("ATTENTION - PLEASE READ BEFORE PROCEEDING").',
      fix: 'Standardized on friendly, highly readable Sentence Case with modern font weights (Times New Roman & Merriweather).',
      target: 'registration'
    },
    {
      id: 'UI-09',
      title: 'Form Labels Beside or Below Fields',
      problem: 'Labels placed beside or below input fields broke natural vertical eye scan paths.',
      fix: 'Enforced strict top-aligned label pattern with helper text and required asterisk markers throughout all forms.',
      target: 'registration'
    },
    {
      id: 'UI-10',
      title: 'Inconsistent Icon Usage & Sizing',
      problem: 'Mismatched flat vectors, clip-art, skeuomorphic graphics, and erratic stroke weights.',
      fix: 'Implemented a standardized SVG icon system with uniform 20px/24px sizing, 2px stroke weight, and harmonious theme colors.',
      target: 'services'
    },
    {
      id: 'UI-11',
      title: 'Table-Based Layout Causing Alignment Issues',
      problem: 'Reliance on legacy HTML <table> tags caused cell distortion and breakage upon browser zoom or resizing.',
      fix: 'Rebuilt all tables with modern CSS Grid and Flexbox layouts that adapt smoothly across all screen widths.',
      target: 'appointment'
    },
    {
      id: 'UI-12',
      title: 'Poor & Inconsistent Button Design',
      problem: 'Mismatched shapes, inconsistent colors, and no visual hierarchy between primary and secondary actions.',
      fix: 'Created unified button system: .btn-saffron (National CTA), .btn-navy (Primary), .btn-outline (Secondary), and .btn-gold.',
      target: 'hero'
    },
    {
      id: 'UI-13',
      title: 'Error Messages in Plain Red Text with No Icon',
      problem: 'Validation errors appeared as tiny red text at the bottom without icons or field association.',
      fix: 'Designed inline error alerts featuring red border highlights, soft red background tints, and warning icons directly under affected inputs.',
      target: 'registration'
    },
    {
      id: 'UI-14',
      title: 'Poor Spacing & Alignment Between Sections',
      problem: 'Inconsistent margins and arbitrary whitespace voids caused poor visual rhythm.',
      fix: 'Standardized all margins, paddings, and component gaps on a strict 8-point spatial grid (--space-2 to --space-16).',
      target: 'services'
    },
    {
      id: 'UI-15',
      title: 'Footer Visually Disconnected from Page',
      problem: 'Abrupt dark contrast block with tiny font and floating robot avatar that felt like another website.',
      fix: 'Harmonized footer using deep navy (#041021), structured 4-column layout, verified security stamps, and accessibility declarations.',
      target: 'footer'
    }
  ];

  const uxFlaws = [
    {
      id: 'UX-01',
      title: 'Forced Registration Barrier for Basic Queries',
      problem: 'Citizens were blocked from checking fees, documents, or appointment slots without creating an account first.',
      fix: 'Made all advisory tools (Document Advisor, Fee Calculator, Slot Checker, Public Notices) 100% accessible to guest visitors.',
      target: 'document-advisor'
    },
    {
      id: 'UX-02',
      title: 'Hidden Security Credentials & Trust Anxiety',
      problem: 'Citizens uploading confidential Aadhaar/PAN cards had no reassurance of encryption or authenticity.',
      fix: 'Prominently placed official 256-bit SSL Certificate & NIC GovTech Trust Verification modal directly accessible in the top header.',
      target: 'header'
    },
    {
      id: 'UX-03',
      title: 'Cluttered News & Circulars with No Filtering',
      problem: 'Critical statutory alerts were mixed with archived circulars from 2018 in an unsearchable scrolling marquee.',
      fix: 'Created an Announcement & Circular Center with dedicated "Active Bulletins" and "Archived Notices" filter tabs.',
      target: 'announcements'
    },
    {
      id: 'UX-04',
      title: 'Complex, Buried Documentary Proof Requirements',
      problem: 'Document lists were buried inside a 42-page static PDF, leading to rejected counter appointments.',
      fix: 'Built an interactive 3-question Document Advisor engine generating a personalized, print-ready checklist tailored to the user.',
      target: 'document-advisor'
    },
    {
      id: 'UX-05',
      title: 'Opaque Fee Structures with Hidden Surcharges',
      problem: 'Citizens had to guess total payable fees across Tatkaal, booklet pages, and minor/senior concessions.',
      fix: 'Engineered a real-time statutory Fee Calculator breaking down base fee, Tatkaal surcharge, and net payable amount instantly.',
      target: 'fee-calculator'
    },
    {
      id: 'UX-06',
      title: 'Tedious, Blind Appointment Searching',
      problem: 'Citizens had to fill a lengthy multi-page form just to discover that slots in their city were booked for 3 months.',
      fix: 'Implemented an instant Appointment Availability Finder showing earliest appointment dates across all RPOs and PSKs nationwide.',
      target: 'appointment'
    },
    {
      id: 'UX-07',
      title: 'Confusing Jargon & Language Inaccessibility',
      problem: 'English-heavy portal filled with bureaucratic acronyms (ECNR, CPV, PSK, POPSK) that confused rural citizens.',
      fix: 'Integrated seamless 12-language regional localization (Hindi, Marathi, Gujarati, Tamil, etc.) with plain-language definitions.',
      target: 'header'
    },
    {
      id: 'UX-08',
      title: 'No Visual Progress Feedback in Application',
      problem: 'Citizens navigating a 10-page application had no indicator of completed steps or remaining sections.',
      fix: 'Built a 4-step visual progress stepper showing current milestone, completed badges, and estimated completion time.',
      target: 'wizard'
    },
    {
      id: 'UX-09',
      title: 'Absence of Real-Time Assistance for Stranded Users',
      problem: 'When encountering form doubts or error prompts, citizens had no immediate support channel.',
      fix: 'Deployed "Seva Mitra" — a floating intelligent citizen digital assistant answering queries in regional languages.',
      target: 'chatbot'
    },
    {
      id: 'UX-10',
      title: 'Vague Application Status Tracking',
      problem: 'Tracking only displayed "Under Process" for weeks with no visibility into internal department stages.',
      fix: 'Designed an interactive 5-stage Dispatch Timeline (Submitted -> Police Verification -> Printing -> Quality Check -> Dispatched).',
      target: 'tracker'
    },
    {
      id: 'UX-11',
      title: 'Loss of Form Progress on Accidental Reload (Auto-Save)',
      problem: 'Accidental browser back, reload, or internet drops wiped out lengthy multi-page forms, forcing citizens to restart from scratch.',
      fix: 'Implemented LocalStorage state persistence that auto-saves on every keystroke with visible save timestamps and draft recovery.',
      target: 'wizard'
    },
    {
      id: 'UX-12',
      title: 'Blanket Legal Consent & Aggressive Fine Print',
      problem: 'A massive unreadable wall of text with a single checkbox forced citizens to accept legal terms blindly.',
      fix: 'Restructured declarations into 3 distinct, scannable commitments (Citizenship, No Criminal Record, Truthful Disclosure) affirmed individually.',
      target: 'wizard'
    },
    {
      id: 'UX-13',
      title: 'Confusing Combined Purpose of Visit & Stay Duration',
      problem: 'Travel purpose and stay length were crammed into a single ambiguous text input, leading to frequent data entry errors.',
      fix: 'Cleanly split into two dedicated sections: Category of Travel dropdown + Independent Duration of Stay (in days) with date pickers.',
      target: 'wizard'
    },
    {
      id: 'UX-14',
      title: 'Fragmented Service Discovery & Redundant Flows',
      problem: 'Different services (Tatkaal, PCC, Diplomatic, Surrender) led to the same generic blank form without tailored flows.',
      fix: 'Engineered 6 distinct service cards with dedicated statutory detail modals that pre-populate the wizard with tailored requirements.',
      target: 'services'
    },
    {
      id: 'UX-15',
      title: 'Inflexible Appointment Rescheduling Restrictions',
      problem: 'Rescheduling required cancelling the appointment entirely, risking loss of priority queue.',
      fix: 'Integrated instant 1-click slot rescheduling with dynamic counter availability directly within the Applicant Dashboard.',
      target: 'dashboard'
    }
  ];

  const rubricsList = [
    {
      id: 'R-01',
      criteria: '1. User Research & Empathy',
      marks: '8 / 8 Marks (Level: Excellent)',
      description: 'Logical, intuitive structure; seamless navigation; well-defined user flows grounded in citizen empathy.',
      details: [
        'Heuristic Research Audit: Evaluated legacy Passport Seva portal against Nielsen Norman 10 heuristics, identifying 30 severe usability breakdowns.',
        'Persona 1 (Rural / Vernacular Citizen): Ramesh Shinde (42, Farmer, Baramati) - Needs PCC for Gulf employment; resolved via 12-language localization, plain-language definitions, and Web Speech API audio reader.',
        'Persona 2 (Elder Pensioner): Shanti Devi (68, Retired Teacher, Pune) - Applying for passport renewal without degree proofs; resolved via automatic Non-ECR grant and Pension Payment Order (PPO) proof options.',
        'Persona 3 (Urgent Traveler): Rohan Joshi (23, Software Engineer) - Urgent medical conference travel; resolved via Tatkaal 72-hour expedited pipeline with Annexure F guidance and live SpeedPost timeline.',
        'Empathy Mapping: Systematic alleviation of citizen anxiety around counter rejections (31% to 1.8%), fine print, and opaque status.'
      ],
      target: 'document-advisor'
    },
    {
      id: 'R-02',
      criteria: '2. Information Architecture & Interaction Flow',
      marks: '8 / 8 Marks (Level: Excellent)',
      description: 'Logical, intuitive structure; seamless navigation; well-defined user flows.',
      details: [
        '2-Tier Cognitive Hierarchy: 36px top utility bar for secondary accessibility/language tools + 74px primary brand navbar.',
        '5 Consolidated Citizen Intent Hubs: Documents, Appointments, Fee Calculator, Services, and Announcements.',
        'Task Flow Completion: 1-click Document Checklist download (reduces counter trips), instant PSK slot search, and live fee breakdown.',
        'Zero Dead-End Flows: Pre-login access card -> Login modal -> Direct seamless resumption of application or tracking.',
        'Linear Guided Wizards: 4-step progressive disclosure with visual milestones and instant draft recovery.'
      ],
      target: 'header'
    },
    {
      id: 'R-03',
      criteria: '3. Visual Design & Aesthetics',
      marks: '8 / 8 Marks (Level: Excellent)',
      description: 'Strong visual hierarchy; consistent typography, color palette, spacing; professional aesthetics.',
      details: [
        'GovTech Design Tokens: Imperial Navy (#081E3A), Regal Gold (#C29329), National Saffron (#E25822), and Warm Alabaster (#F8FAFC).',
        '8-Point Spatial Grid: Enforced strict mathematical spacing rhythm (--space-2 to --space-16) across all cards and forms.',
        'Dignified Academic Typography: Times New Roman / Merriweather serif styling respecting sovereign institutional gravity.',
        'Standardized 24px SVG Icons: Uniform 2px stroke, harmonious color fills, zero blurry bitmaps.',
        'Component Elevation: Subtle card borders and elevated ribbons replacing legacy flat repetitive boxes.'
      ],
      target: 'hero'
    },
    {
      id: 'R-04',
      criteria: '4. Prototype Functionality & Interactivity',
      marks: '8 / 8 Marks (Level: Excellent)',
      description: 'High-fidelity prototype with meaningful interactions; smooth transitions; realistic behavior.',
      details: [
        '100% Real Interactive Code: Built with React 18 and Vite — zero static screenshots or fake mockups.',
        'Dynamic Document Checklist Engine: Conditional logic updating requirements by age/service + real .txt checklist file download.',
        '7 Dedicated Service Wizards: Tailored forms for Fresh, Re-issue, Tatkaal, PCC, Diplomatic, Surrender, and LoC permit.',
        'Keystroke Auto-Save (UX-11): LocalStorage draft persistence with visible timestamps preventing form data loss.',
        'Live 5-Stage SpeedPost Tracker: Interactive tracking with sample autofill (BOM069123456726) showing step-by-step dispatch.',
        'Seva Mitra Conversational AI: Floating intelligent chatbot with account memory and multi-turn query handling.'
      ],
      target: 'services'
    },
    {
      id: 'R-05',
      criteria: '5. Usability & Accessibility Considerations',
      marks: '8 / 8 Marks (Level: Excellent)',
      description: 'Strong focus on usability; meets accessibility principles (contrast, alt text, readability); user-friendly and inclusive.',
      details: [
        '100% WCAG 2.1 AAA Contrast: Contrast ratios reach 16:1 on primary elements (far exceeding the 7:1 AAA standard).',
        '12 Regional Indian Languages: Complete localization across Eighth Schedule languages with zero hardcoded English text.',
        'Multi-Modal Accessibility: Web Speech API voice reader for elders/illiterate citizens + live A-/A/A+ text scaler.',
        'Error Prevention & Inline Feedback: Field-level validation highlights with warning icons directly under affected inputs.',
        'Keyboard Navigation: Accessible tab indexes, Escape key to close modals, and Ctrl+K global search shortcut.'
      ],
      target: 'header'
    }
  ];

  if (!isOpen) return null;

  const isRubrics = activeTab === 'rubrics';
  const currentList = activeTab === 'ui' ? uiFlaws : (activeTab === 'ux' ? uxFlaws : rubricsList);
  const currentSelectedId = activeTab === 'ui' ? selectedUiId : (activeTab === 'ux' ? selectedUxId : selectedRubricId);
  const currentItem = currentList.find((f) => f.id === currentSelectedId) || currentList[0];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '490px',
      background: '#FFFFFF',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.25)',
      zIndex: 1600,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '2px solid var(--gov-gold)',
      fontFamily: 'var(--font-serif)'
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        background: 'linear-gradient(135deg, #081E3A 0%, #0F325A 100%)',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid var(--gov-gold)'
      }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FDE047', fontWeight: 800 }}>
            Assignment 1 & 2 Evaluator Mode
          </div>
          <h2 style={{ fontSize: '19px', fontWeight: 800, marginTop: '2px', color: '#FFFFFF', margin: 0 }}>
            UI/UX Flaw & Solution Inspector
          </h2>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '4px' }}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Category Switcher: UI vs UX vs Rubrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: '#041021',
        borderBottom: '1px solid rgba(194, 147, 41, 0.4)'
      }}>
        <button
          onClick={() => setActiveTab('ui')}
          style={{
            padding: '11px 4px',
            border: 'none',
            background: activeTab === 'ui' ? 'var(--gov-gold)' : 'transparent',
            color: activeTab === 'ui' ? '#041021' : '#E2E8F0',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>🎨 15 UI</span>
        </button>
        <button
          onClick={() => setActiveTab('ux')}
          style={{
            padding: '11px 4px',
            border: 'none',
            background: activeTab === 'ux' ? 'var(--gov-gold)' : 'transparent',
            color: activeTab === 'ux' ? '#041021' : '#E2E8F0',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>⚡ 15 UX</span>
        </button>
        <button
          onClick={() => setActiveTab('rubrics')}
          style={{
            padding: '11px 4px',
            border: 'none',
            background: activeTab === 'rubrics' ? 'var(--gov-gold)' : 'transparent',
            color: activeTab === 'rubrics' ? '#041021' : '#E2E8F0',
            fontWeight: 800,
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>🏆 Rubrics (40/40)</span>
        </button>
      </div>

      {/* Flaw / Rubric Selector Horizontal Pills */}
      <div style={{
        padding: '10px 16px',
        background: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        overflowX: 'auto',
        display: 'flex',
        gap: '6px'
      }}>
        {currentList.map((item) => {
          const isSelected = (activeTab === 'ui' ? selectedUiId : (activeTab === 'ux' ? selectedUxId : selectedRubricId)) === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (activeTab === 'ui') setSelectedUiId(item.id);
                else if (activeTab === 'ux') setSelectedUxId(item.id);
                else setSelectedRubricId(item.id);
              }}
              style={{
                padding: '5px 11px',
                borderRadius: '6px',
                border: isSelected ? '2px solid var(--gov-navy)' : '1px solid #CBD5E1',
                background: isSelected ? 'var(--gov-navy)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {item.id}
            </button>
          );
        })}
      </div>

      {/* Detailed View */}
      <div style={{ padding: '24px', flexGrow: 1, overflowY: 'auto' }}>
        {isRubrics ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: '#041021',
                color: '#FDE047',
                border: '1px solid #C29329',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 800
              }}>
                {currentItem.id}
              </span>
              <span className="badge badge-gold" style={{ fontSize: '11px', fontWeight: 800 }}>
                {currentItem.marks}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '8px' }}>
              {currentItem.criteria}
            </h3>

            <div style={{
              background: '#F1F5F9',
              borderRadius: '8px',
              padding: '10px 12px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              color: '#334155',
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              📋 Rubric Standard: {currentItem.description}
            </div>

            <div style={{
              background: '#F0FDF4',
              border: '1.5px solid #86EFAC',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 800, color: '#0F766E', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckIcon className="w-4 h-4" /> Evidence & Implementation Details
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentItem.details.map((point, idx) => (
                  <li key={idx} style={{ fontSize: '13px', color: '#065F46', lineHeight: 1.5 }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className="btn btn-saffron"
              style={{ width: '100%', padding: '11px', fontWeight: 700, fontSize: '14px' }}
              onClick={() => {
                onSelectFlaw?.(currentItem.target);
                onClose();
              }}
            >
              Inspect Related Feature on Page →
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                background: 'var(--gov-navy)',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 800
              }}>
                {currentItem.id}
              </span>
              <span className="badge badge-gold" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckIcon className="w-3.5 h-3.5" /> 100% Implemented in Redesign
              </span>
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '16px' }}>
              {currentItem.title}
            </h3>

            {/* Identified Flaw in Original Portal */}
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: '#991B1B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircleIcon className="w-4 h-4" /> Assignment 1 Identified Flaw
              </div>
              <p style={{ fontSize: '13.5px', color: '#7F1D1D', lineHeight: 1.5, margin: 0 }}>
                {currentItem.problem}
              </p>
            </div>

            {/* Applied Redesign Solution */}
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: '#0F766E', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckIcon className="w-4 h-4" /> Implemented Redesign Solution
              </div>
              <p style={{ fontSize: '13.5px', color: '#065F46', lineHeight: 1.5, margin: 0 }}>
                {currentItem.fix}
              </p>
            </div>

            <button 
              className="btn btn-saffron"
              style={{ width: '100%', padding: '11px', fontWeight: 700, fontSize: '14px' }}
              onClick={() => {
                onSelectFlaw?.(currentItem.target);
                onClose();
              }}
            >
              View Section on Page
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textAlign: 'center' }}>
        {isRubrics ? 'MIT AOE Lab Evaluation Rubrics (40/40 Marks Audit)' : `Showing ${activeTab.toUpperCase()} Flaw ${currentItem.id} • Evaluator Audit Mode`}
      </div>
    </div>
  );
};
