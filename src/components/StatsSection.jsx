import React from 'react';

export const StatsSection = () => {
  const stats = [
    { label: 'Passports Rendered (India)', count: '1,40,43,475', change: '+12.4% Annual Growth', icon: '🏛️' },
    { label: 'Passports Rendered (Abroad)', count: '18,93,055', change: 'Across 180+ Missions', icon: '✈️' },
    { label: 'Total Citizen Services Rendered', count: '1,59,36,530', change: 'Audited National Total', icon: '✨' }
  ];

  return (
    <section id="stats" style={{ backgroundColor: '#FFFFFF', padding: '64px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">National Impact & Transparency</span>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--gov-navy)', marginTop: '8px', fontFamily: 'var(--font-serif)' }}>
            Service Metrics for Calendar Year 2026
          </h2>
          <p style={{ color: '#64748B', fontSize: '15.5px' }}>
            Official service delivery figures audited across 550+ Passport Seva Kendras (PSK) and Post Office PSKs.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {stats.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#F9FAFB',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div>
                <div style={{ fontSize: '30px', marginBottom: '14px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--gov-navy)', margin: '8px 0 12px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
                  {item.count}
                </div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F766E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>●</span> {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
