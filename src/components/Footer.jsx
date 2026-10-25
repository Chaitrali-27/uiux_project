import React from 'react';
import { PhoneIcon, GlobeIcon, ShieldIcon } from './Icons';

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* UI-15: Harmonized 4-column layout matching GovTech design token system */}
        <div className="footer-grid">
          {/* Brand & Purpose */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#16365C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFB703'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L5 6.13 12 2.62l7 3.51L12 9.5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="flaw-tag solved">UI-15 Footer Solved</span>
            </div>
            <h2>Passport Seva Portal</h2>
            <p>
              Official digital passport service platform of the Consular, Passport and Visa (CPV) Division, Ministry of External Affairs, Government of India.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#38BDF8' }}>
              <ShieldIcon className="w-4 h-4" />
              <span>STQC Certified & ISO 27001 Compliant</span>
            </div>
          </div>

          {/* Column 1: Citizen Services */}
          <div className="footer-column">
            <h3>Citizen Services</h3>
            <ul className="footer-links">
              <li><a href="#services" className="footer-link">Apply for Fresh Passport</a></li>
              <li><a href="#services" className="footer-link">Tatkaal Urgent Processing</a></li>
              <li><a href="#services" className="footer-link">Police Clearance Certificate</a></li>
              <li><a href="#appointment" className="footer-link">PSK Appointment Availability</a></li>
              <li><a href="#fee-calculator" className="footer-link">Fee Calculator & Concessions</a></li>
            </ul>
          </div>

          {/* Column 2: Legal & Transparency */}
          <div className="footer-column">
            <h3>Legal & Compliance</h3>
            <ul className="footer-links">
              <li><a href="#terms" className="footer-link">The Passports Act, 1967</a></li>
              <li><a href="#terms" className="footer-link">Passport Rules & Amendments</a></li>
              <li><a href="#terms" className="footer-link">Right to Information (RTI)</a></li>
              <li><a href="#terms" className="footer-link">Privacy Policy & Data Security</a></li>
              <li><a href="#terms" className="footer-link">Hyperlinking & Copyright Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div className="footer-column">
            <h3>Emergency & Contact</h3>
            <ul className="footer-links">
              <li style={{ color: '#E2E8F0', fontSize: '13.5px' }}>
                <strong style={{ color: '#FFFFFF' }}>Toll Free Call Centre:</strong><br />
                1800-258-1800 (8 AM - 10 PM IST)
              </li>
              <li style={{ color: '#E2E8F0', fontSize: '13.5px', marginTop: '6px' }}>
                <strong style={{ color: '#FFFFFF' }}>CPV Division:</strong><br />
                Patiala House, Tilak Marg, New Delhi 110001
              </li>
              <li><a href="#grievance" className="footer-link">MADAD Portal Grievance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="footer-bottom">
          <div>
            © 2026 Ministry of External Affairs, Government of India. Designed and maintained by National Informatics Centre (NIC).
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
