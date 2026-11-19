import React from 'react';
import { getTranslation } from '../utils/translations';

export const StatsSection = ({ language = 'en' }) => {
  const t = getTranslation(language);

  const stats = [
    { label: t.statPassportsIndia, count: '1,40,43,475', change: t.growthIndia, icon: '🏛️' },
    { label: t.statPassportsAbroad, count: '18,93,055', change: t.growthAbroad, icon: '✈️' },
    { label: t.statTotalServices, count: '1,59,36,530', change: t.growthTotal, icon: '✨' }
  ];

  return (
    <section id="stats" style={{ backgroundColor: '#FFFFFF', padding: '56px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">{t.statsTag}</span>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--gov-navy)', marginTop: '8px', fontFamily: 'var(--font-serif)' }}>
            {t.statsTitle}
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', maxWidth: '680px', margin: '8px auto 0 auto' }}>
            {t.statsDesc}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {stats.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--gov-navy)', margin: '6px 0 10px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
                  {item.count}
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F766E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>●</span> {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

