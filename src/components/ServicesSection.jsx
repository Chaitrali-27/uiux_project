import React from 'react';
import { ArrowRightIcon } from './Icons';

export const ServicesSection = ({ onSelectService }) => {
  const services = [
    {
      id: 'fresh-reissue',
      title: 'Fresh / Re-issue Passport',
      desc: 'Apply for a new 10-year Ordinary Passport or renew an expiring booklet with 36 or 60 pages.',
      eta: 'Normal: 15–20 days | Tatkaal: 1–3 days',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="7" y1="8" x2="17" y2="8" />
          <line x1="7" y1="12" x2="13" y2="12" />
          <circle cx="15" cy="14" r="2" />
        </svg>
      )
    },
    {
      id: 'tatkaal',
      title: 'Tatkaal Passport Scheme',
      desc: 'Expedited processing for emergency travel. Verification process completed within 72 hours.',
      eta: 'Dispatched within 1–3 working days',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      id: 'pcc',
      title: 'Police Clearance Certificate (PCC)',
      desc: 'Official certificate for Indian citizens seeking employment, long-term stay, or immigration abroad.',
      eta: 'Normal: 7–14 days',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'diplomatic',
      title: 'Diplomatic & Official Passport',
      desc: 'Issued to government dignitaries, diplomats, and authorized official delegates travelling on state duty.',
      eta: 'Processed via CPV Delhi division',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    },
    {
      id: 'surrender',
      title: 'Surrender Certificate',
      desc: 'Mandatory certificate upon acquisition of foreign citizenship under the Indian Citizenship Act, 1955.',
      eta: 'Issued within 5 working days',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      )
    },
    {
      id: 'loc-permit',
      title: 'Line of Control (LoC) Permit',
      desc: 'Special travel documentation for permanent residents visiting across designated crossing sectors.',
      eta: 'Verification through designated cell',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        </svg>
      )
    }
  ];

  return (
    <section className="section" id="services" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Citizen Services</span>
          <h2 className="section-title">Comprehensive Passport & Travel Documentation</h2>
          <p className="section-desc">
            Standardized, accessible application procedures designed with uniform iconography, clear timelines, and transparent guidelines.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc) => (
            <div 
              key={svc.id} 
              className="service-card"
              onClick={() => onSelectService(svc.id)}
            >
              <div>
                <div className="service-icon-wrap">
                  {svc.icon}
                </div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
              </div>

              <div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#0F766E' }}>●</span> {svc.eta}
                </div>
                <div className="service-footer">
                  <span>Start Application</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
