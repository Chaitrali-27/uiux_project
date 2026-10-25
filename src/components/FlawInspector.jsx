import React, { useState } from 'react';
import { CheckIcon, XIcon, AlertCircleIcon } from './Icons';

export const FlawInspector = ({ isOpen, onClose, onSelectFlaw }) => {
  const [activeTab, setActiveTab] = useState('ui');
  const [selectedId, setSelectedId] = useState('UI-01');

  const uiFlaws = [
    {
      id: 'UI-01',
      title: 'Overcrowded Header',
      problem: 'Too many elements: live date, accessibility options, language, helpline, login, nav bar crammed into one space.',
      fix: 'Separated secondary utilities into a slim 36px top utility bar, and core navigation into a clean 74px primary navbar.',
      target: 'header'
    },
    {
      id: 'UI-02',
      title: 'Poor Color Hierarchy',
      problem: 'Clashing blue->red->purple gradients, muddy beige background, bright yellow quick link boxes, no unified palette.',
      fix: 'Implemented GovTech design tokens: Navy Primary (#0A2540), Emerald Green (#059669), Saffron Accent (#FF671F), and clean Off-White (#F8FAFC).',
      target: 'hero'
    },
    {
      id: 'UI-03',
      title: 'Overuse of Boxes & Cards',
      problem: 'Every section (Quick Links, Info, News, Stats) was trapped in repetitive rectangular bordered boxes.',
      fix: 'Replaced rigid boxes with varied visual presentation, borderless stats ribbons, and subtle elevated modern cards with ample whitespace.',
      target: 'services'
    },
    {
      id: 'UI-04',
      title: 'No Visual Hierarchy on Homepage',
      problem: 'All items shared identical visual weight. Users had no idea where to start.',
      fix: 'Created an authoritative Hero Action Center with high-contrast focal points: "Apply for Passport", "Check Slots", and "Quick Track".',
      target: 'hero'
    },
    {
      id: 'UI-05',
      title: 'Cluttered Navigation Bar (Too Many Links)',
      problem: '12+ links exposed simultaneously with multi-column deep dropdowns that buried citizen actions.',
      fix: 'Consolidated into 5 primary citizen intents with clear labels and intuitive flow.',
      target: 'header'
    },
    {
      id: 'UI-06',
      title: 'Weak Form Design (Fee Calculator)',
      problem: 'Single isolated dropdown floating in empty space, looking unfinished and abandoned.',
      fix: 'Transformed into a comprehensive calculator with service type, age group, booklet size, scheme, and real-time fee breakdown.',
      target: 'fee-calculator'
    },
    {
      id: 'UI-07',
      title: 'No Responsive or Mobile Layout',
      problem: 'Fixed desktop resolution caused horizontal scrolling, cut-off text, and unusable mobile views.',
      fix: 'Built with mobile-first CSS media queries, responsive grids, collapsible mobile menu, and fluid viewport scaling.',
      target: 'header'
    },
    {
      id: 'UI-08',
      title: 'Overuse of All-Caps Text in Forms',
      problem: 'Forms and instructions were in aggressive ALL-CAPS text ("ATTENTION - PLEASE READ BEFORE PROCEEDING").',
      fix: 'Standardized on friendly, highly readable Sentence Case with modern font weights (Inter / Plus Jakarta Sans).',
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
      fix: 'Created unified button system: .btn-primary (Blue), .btn-saffron (CTA), .btn-secondary (Subtle), and .btn-outline.',
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
      fix: 'Harmonized footer using deep navy (#061729), structured 4-column layout, verified security stamps, and accessibility declarations.',
      target: 'footer'
    }
  ];

  if (!isOpen) return null;

  const currentFlaw = uiFlaws.find((f) => f.id === selectedId) || uiFlaws[0];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '460px',
      background: '#FFFFFF',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #E2E8F0'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        background: '#0A2540',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFB703', fontWeight: 700 }}>
            Assignment 1 & 2 Evaluator Mode
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
            UI Flaw & Solution Inspector
          </h2>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: '4px' }}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Flaw Selector Pills */}
      <div style={{
        padding: '12px 16px',
        background: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        overflowX: 'auto',
        display: 'flex',
        gap: '6px'
      }}>
        {uiFlaws.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedId(item.id);
              onSelectFlaw?.(item.target);
            }}
            style={{
              padding: '5px 10px',
              borderRadius: '6px',
              border: selectedId === item.id ? '2px solid #0066CC' : '1px solid #CBD5E1',
              background: selectedId === item.id ? '#0066CC' : '#FFFFFF',
              color: selectedId === item.id ? '#FFFFFF' : '#334155',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {item.id}
          </button>
        ))}
      </div>

      {/* Selected Flaw Detailed Comparison */}
      <div style={{ padding: '24px', flexGrow: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            background: '#0066CC',
            color: '#FFFFFF',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 800
          }}>
            {currentFlaw.id}
          </span>
          <span className="badge-slot">
            <CheckIcon className="w-3.5 h-3.5" /> 100% Resolved in Prototype
          </span>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0A2540', marginBottom: '16px' }}>
          {currentFlaw.title}
        </h3>

        {/* Old Flaw Card */}
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 800, color: '#991B1B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircleIcon className="w-4 h-4" /> Assignment 1 Identified Problem
          </div>
          <p style={{ fontSize: '13.5px', color: '#7F1D1D', lineHeight: 1.5 }}>
            {currentFlaw.problem}
          </p>
        </div>

        {/* Solution Implemented Card */}
        <div style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 800, color: '#065F46', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckIcon className="w-4 h-4" /> Redesign Solution Applied
          </div>
          <p style={{ fontSize: '13.5px', color: '#047857', lineHeight: 1.5 }}>
            {currentFlaw.fix}
          </p>
        </div>

        <button 
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => onSelectFlaw?.(currentFlaw.target)}
        >
          View & Highlight on Page
        </button>
      </div>

      {/* Footer count */}
      <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', fontSize: '12.5px', color: '#64748B', textAlign: 'center' }}>
        Showing UI Flaw {selectedId} of 15 • Click any tab to inspect
      </div>
    </div>
  );
};
