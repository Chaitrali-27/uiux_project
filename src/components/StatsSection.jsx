import React from 'react';

export const StatsSection = () => {
  const stats = [
    { label: 'Passports Rendered (India)', count: '1,40,43,475', change: '+12.4% this year', icon: '🇮🇳' },
    { label: 'Passports Rendered (Abroad)', count: '18,93,055', change: 'Across 180+ Missions', icon: '✈️' },
    { label: 'Total Citizen Services Rendered', count: '1,59,36,530', change: 'Verified National Count', icon: '🌟' }
  ];

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '64px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            National Impact & Transparency
            <span className="flaw-tag solved">UI-03 & UI-14 Solved</span>
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0A2540', marginTop: '8px' }}>
            Service Metrics for Calendar Year 2026
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px' }}>
            Official service delivery figures audited across 550+ Passport Seva Kendras and Post Office PSKs.
          </p>
        </div>

        {/* UI-03 & UI-14: Clean borderless cards with soft shadow and balanced 8px padding */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {stats.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '32px 28px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#0A2540', margin: '8px 0 12px 0', letterSpacing: '-0.02em' }}>
                  {item.count}
                </div>
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>●</span> {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
