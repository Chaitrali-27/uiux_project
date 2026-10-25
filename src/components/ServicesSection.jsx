import React, { useState } from 'react';
import { ArrowRightIcon, XIcon, CheckIcon, ShieldIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedServices } from '../utils/localizedContent';

export const ServicesSection = ({ language = 'en', onSelectService, onExploreDocs }) => {
  const t = getTranslation(language);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const localizedServices = getLocalizedServices(language);


  const services = [
    {
      id: 'fresh-reissue',
      title: 'Fresh / Re-issue Passport',
      shortDesc: 'Apply for a new 10-year Ordinary Passport or renew an expiring booklet with 36 or 60 pages.',
      fullDesc: 'Standard passport service for all Indian citizens above 18 years. Available in 36-page normal booklet and 60-page jumbo booklet for frequent international travellers.',
      feeNormal: '₹1,500 (36 Pages) / ₹2,000 (60 Pages)',
      feeTatkaal: '₹3,500 (36 Pages) / ₹4,000 (60 Pages)',
      eta: 'Normal: 15–20 days | Tatkaal: 1–3 days',
      docs: ['Aadhaar Card or Valid Address Proof', 'Date of Birth Proof (Birth Cert/PAN/10th)', 'Non-ECR 10th Passing Certificate'],
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
      shortDesc: 'Expedited processing for urgent international travel. Verification process completed within 72 hours.',
      fullDesc: 'Statutory emergency scheme under Schedule IV of Passports Rules 1980. Passports are dispatched within 1 to 3 working days from the appointment date on post-police verification basis.',
      feeNormal: 'Standard Fee + ₹2,000 Expedited Surcharge',
      feeTatkaal: 'Total ₹3,500 (36 Pages)',
      eta: 'Dispatched within 1–3 working days',
      docs: ['2 Scheduled Government Identity Proofs (e.g. Aadhaar + Voter ID/PAN)', 'Standard Address & DOB Proof', 'Annexure F (if applicable)'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      id: 'pcc',
      title: 'Police Clearance Certificate (PCC)',
      shortDesc: 'Official certificate for Indian citizens seeking employment, long-term stay, or immigration abroad.',
      fullDesc: 'Issued to Indian passport holders required to furnish a criminal background clearance to foreign embassies for employment, tourist long-stay, student visas, or permanent residency.',
      feeNormal: '₹500 Flat Statutory Fee',
      feeTatkaal: 'Tatkaal scheme not applicable to PCC',
      eta: 'Normal: 7–14 days (Subject to Local Police Report)',
      docs: ['Original Indian Passport with Self-Attested Photocopy', 'Present Address Proof', 'Proof of Foreign Employment / Visa Letter'],
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
      shortDesc: 'Issued to government dignitaries, diplomats, and authorized official delegates travelling on state duty.',
      fullDesc: 'Processed exclusively through the CPV Division at Patiala House, New Delhi. Official Passports feature white covers, while Diplomatic Passports feature deep maroon covers.',
      feeNormal: 'Gratis (Government Exempted for State Duty)',
      feeTatkaal: 'Processed directly via Ministry Protocol',
      eta: 'Processed via CPV Delhi Protocol',
      docs: ['Official Cadre Clearance / Deputation Order', 'Political Clearance Certificate (MEA)', 'Identity Certificate Annexure B'],
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
      shortDesc: 'Mandatory certificate upon acquisition of foreign citizenship under the Indian Citizenship Act, 1955.',
      fullDesc: 'Required by persons of Indian origin who have acquired foreign citizenship and must formally surrender their Indian Passport to avoid penalties under Section 12 of the Passports Act.',
      feeNormal: '₹500 (Acquired post-2010) / ₹1,000',
      feeTatkaal: 'Normal processing only',
      eta: 'Issued within 5 working days',
      docs: ['Original Indian Passport', 'Foreign Citizenship Certificate / Foreign Passport', 'Copy of Naturalisation Certificate'],
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
      shortDesc: 'Special travel documentation for permanent residents visiting across designated crossing sectors.',
      fullDesc: 'Issued to permanent residents travelling across the Line of Control for familial visits through trade and travel crossing points.',
      feeNormal: 'Free / Nominally Regulated',
      feeTatkaal: 'N/A',
      eta: 'Verification through designated cell',
      docs: ['State Resident Certificate (PRC)', 'Local Sub-Divisional Magistrate Verification', 'Sponsor Details'],
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
    <section className="section" id="services" style={{ backgroundColor: '#F8FAFC', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.servicesTag}</span>
          <h2 className="section-title">{t.servicesTitle}</h2>
          <p className="section-desc">
            {t.servicesDesc}
          </p>
        </div>

        <div className="services-grid">
          {services.map((rawSvc) => {
            const localized = localizedServices.find(l => l.id === rawSvc.id) || rawSvc;
            const svc = { ...rawSvc, ...localized };
            return (
              <div 
                key={svc.id} 
                className="service-card"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid var(--border-medium)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedServiceDetail(svc)}
              >
                <div>
                  <div className="service-icon-wrap" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--gov-navy)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    {svc.icon}
                  </div>
                  <h3 className="service-title" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                    {svc.title}
                  </h3>
                  <p className="service-desc" style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
                    {svc.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#0F766E', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>●</span> {svc.eta}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #E2E8F0',
                    color: 'var(--gov-navy)',
                    fontWeight: 700,
                    fontSize: '13.5px'
                  }}>
                    <span>{t.viewDetailsBtn}</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal (Prevents unexpected wizard popup!) */}
      {selectedServiceDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(4, 16, 33, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 1350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          fontFamily: 'var(--font-serif)'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: 'var(--shadow-modal)',
            border: '2px solid var(--gov-gold)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ fontSize: '11px', marginBottom: '4px' }}>
                  Official Citizen Service
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--gov-navy)', margin: '4px 0 0 0' }}>
                  {selectedServiceDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceDetail(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedServiceDetail.fullDesc}
            </p>

            {/* Tariff Breakdown */}
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Statutory Tariff & Timelines
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '4px' }}>
                <span>Normal Scheme:</span>
                <strong style={{ color: 'var(--gov-navy)' }}>{selectedServiceDetail.feeNormal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '4px' }}>
                <span>Tatkaal Expedited:</span>
                <strong style={{ color: '#0F766E' }}>{selectedServiceDetail.feeTatkaal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #E2E8F0' }}>
                <span>Official Turnaround:</span>
                <span>{selectedServiceDetail.eta}</span>
              </div>
            </div>

            {/* Key Documents Required */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                Key Mandatory Documents:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                {selectedServiceDetail.docs.map((doc, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{doc}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons: Apply only if requested */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-saffron"
                style={{ flex: 1, padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => {
                  setSelectedServiceDetail(null);
                  onSelectService(selectedServiceDetail.id);
                }}
              >
                <span>{t.startAppBtn}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: '12px 18px' }}
                onClick={() => setSelectedServiceDetail(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
