import React from 'react';
import { PhoneIcon, ShieldIcon } from './Icons';
import { getTranslation } from '../utils/translations';

export const Footer = ({ language = 'en' }) => {
  const t = getTranslation(language);

  return (
    <footer className="footer-wrapper" style={{ fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#081E3A',
                border: '1px solid rgba(194, 147, 41, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gov-gold)'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5 6.13 12 2.62l7 3.51L12 9.5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-gold)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {t.brandTitle} • भारत
              </span>
            </div>
            <h2>{t.footerAboutTitle}</h2>
            <p>
              {t.footerAboutText}
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#CBD5E1' }}>
              <ShieldIcon className="w-4 h-4" style={{ color: 'var(--gov-gold)' }} />
              <span>STQC Certified & ISO 27001 Security Compliant</span>
            </div>
          </div>

          {/* Column 1: Citizen Services */}
          <div className="footer-column">
            <h3>{t.footerServicesTitle}</h3>
            <ul className="footer-links">
              <li><a href="#services" className="footer-link">{t.applyPassportBtn}</a></li>
              <li><a href="#services" className="footer-link">{t.docAdvisorBtn}</a></li>
              <li><a href="#appointment" className="footer-link">{t.checkSlotsBtn}</a></li>
              <li><a href="#fee-calculator" className="footer-link">{t.feeCalcTitle}</a></li>
              <li><a href="#faq" className="footer-link">{t.faqTitle}</a></li>
            </ul>
          </div>

          {/* Column 2: Legal & Statutory */}
          <div className="footer-column">
            <h3>{t.footerLegalTitle}</h3>
            <ul className="footer-links">
              <li><a href="#terms" className="footer-link">The Passports Act, 1967</a></li>
              <li><a href="#terms" className="footer-link">Passport Rules & Amendments</a></li>
              <li><a href="#terms" className="footer-link">Right to Information (RTI)</a></li>
              <li><a href="#terms" className="footer-link">Privacy Policy & Data Security</a></li>
              <li><a href="#terms" className="footer-link">Hyperlinking & Copyright Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Help */}
          <div className="footer-column">
            <h3>{language === 'gu' ? 'કટોકટી અને સંપર્ક' : language === 'hi' ? 'आपातकाल एवं संपर्क' : 'Emergency & Contact'}</h3>
            <ul className="footer-links">
              <li style={{ color: '#E2E8F0', fontSize: '13.5px' }}>
                <strong style={{ color: 'var(--gov-gold)' }}>{t.helpline.split(':')[0]}:</strong><br />
                1800-258-1800 ({t.hours.replace('Operating Hours: ', '')})
              </li>
              <li style={{ color: '#E2E8F0', fontSize: '13.5px', marginTop: '6px' }}>
                <strong style={{ color: 'var(--gov-gold)' }}>CPV Division:</strong><br />
                Patiala House, Tilak Marg, New Delhi 110001
              </li>
              <li><a href="#grievance" className="footer-link">MADAD Grievance Redressal</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="footer-bottom">
          <div>
            {t.footerCopyright}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Last Updated: 25 October 2026</span>
            <span>•</span>
            <span>WCAG 2.1 (Level AAA) Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
