import React, { useState } from 'react';
import { SearchIcon, CheckIcon, CalendarIcon, XIcon, ArrowRightIcon } from './Icons';

export const AppointmentChecker = ({ onBookSlot }) => {
  const [selectedOffice, setSelectedOffice] = useState('Mumbai');
  const [quotaFilter, setQuotaFilter] = useState('all');
  const [dateHorizon, setDateHorizon] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
  const [slotDetail, setSlotDetail] = useState(null);

  const passportOffices = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Ahmedabad', 'Kolkata', 'Chennai'];

  const slotsData = [
    {
      id: 1,
      center: 'PSK Lower Parel',
      city: 'Mumbai',
      pincode: '400013',
      address: 'Trade Point, Kamala Mills Compound, Lower Parel, Mumbai 400013',
      quota: 'Normal',
      nextDate: '28 October 2026',
      daysFromNow: 2,
      totalAvailable: 142,
      status: 'Available'
    },
    {
      id: 2,
      center: 'PSK Andheri',
      city: 'Mumbai',
      pincode: '400093',
      address: 'The Great Oasis Enterprises, MIDC Marol, Andheri (E), Mumbai 400093',
      quota: 'Normal',
      nextDate: '29 October 2026',
      daysFromNow: 3,
      totalAvailable: 88,
      status: 'Available'
    },
    {
      id: 3,
      center: 'PSK Andheri (Tatkaal Cell)',
      city: 'Mumbai',
      pincode: '400093',
      address: 'The Great Oasis Enterprises, MIDC Marol, Andheri (E), Mumbai 400093',
      quota: 'Tatkaal',
      nextDate: '26 October 2026',
      daysFromNow: 0,
      totalAvailable: 24,
      status: 'Fast Filling'
    },
    {
      id: 4,
      center: 'POPSK Malad',
      city: 'Mumbai',
      pincode: '400064',
      address: 'Post Office Building, Malad West, Mumbai 400064',
      quota: 'Normal',
      nextDate: '02 November 2026',
      daysFromNow: 7,
      totalAvailable: 65,
      status: 'Available'
    },
    {
      id: 5,
      center: 'PSK Herald House',
      city: 'Delhi',
      pincode: '110002',
      address: 'ITO, Bahadur Shah Zafar Marg, New Delhi 110002',
      quota: 'Normal',
      nextDate: '27 October 2026',
      daysFromNow: 1,
      totalAvailable: 210,
      status: 'Available'
    },
    {
      id: 6,
      center: 'PSK Shalimar Place',
      city: 'Delhi',
      pincode: '110088',
      address: 'A-Block, Shalimar Place, Ring Road, Delhi 110088',
      quota: 'Tatkaal',
      nextDate: '26 October 2026',
      daysFromNow: 0,
      totalAvailable: 35,
      status: 'Fast Filling'
    },
    {
      id: 7,
      center: 'PSK Lalbagh',
      city: 'Bengaluru',
      pincode: '560027',
      address: 'No 45 Prestige Libra, Near Urvashi Theatre, Lalbagh Main Road, Bengaluru 560027',
      quota: 'Normal',
      nextDate: '30 October 2026',
      daysFromNow: 4,
      totalAvailable: 175,
      status: 'Available'
    },
    {
      id: 8,
      center: 'PSK Mundhwa',
      city: 'Pune',
      pincode: '411036',
      address: 'Zero One IT Park, Near Passport Office, Mundhwa, Pune 411036',
      quota: 'Normal',
      nextDate: '29 October 2026',
      daysFromNow: 3,
      totalAvailable: 120,
      status: 'Available'
    }
  ];

  // Calendar Heatmap Days Data
  const calendarDays = [
    { day: 'Mon', date: '26 Oct', slots: 59, status: 'Fast Filling', color: '#EA580C', bg: '#FFF7ED' },
    { day: 'Tue', date: '27 Oct', slots: 210, status: 'Available', color: '#0F766E', bg: '#F0FDF4' },
    { day: 'Wed', date: '28 Oct', slots: 142, status: 'Available', color: '#0F766E', bg: '#F0FDF4' },
    { day: 'Thu', date: '29 Oct', slots: 208, status: 'Available', color: '#0F766E', bg: '#F0FDF4' },
    { day: 'Fri', date: '30 Oct', slots: 175, status: 'Available', color: '#0F766E', bg: '#F0FDF4' },
    { day: 'Sat', date: '31 Oct', slots: 95, status: 'Special Camp', color: '#0369A1', bg: '#EFF6FF' },
    { day: 'Sun', date: '01 Nov', slots: 0, status: 'Closed', color: '#64748B', bg: '#F1F5F9' }
  ];

  let filteredSlots = slotsData.filter((slot) => {
    const matchesCity = slot.city === selectedOffice;
    const matchesQuota = quotaFilter === 'all' || slot.quota.toLowerCase() === quotaFilter.toLowerCase();
    const matchesHorizon = 
      dateHorizon === 'all' ? true :
      dateHorizon === '7days' ? slot.daysFromNow <= 7 :
      dateHorizon === '14days' ? slot.daysFromNow <= 14 : true;
    const matchesSearch = 
      slot.center.toLowerCase().includes(searchTerm.toLowerCase()) || 
      slot.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.pincode.includes(searchTerm);
    return matchesCity && matchesQuota && matchesHorizon && matchesSearch;
  });

  if (sortBy === 'slots') {
    filteredSlots.sort((a, b) => b.totalAvailable - a.totalAvailable);
  } else {
    filteredSlots.sort((a, b) => a.daysFromNow - b.daysFromNow);
  }

  return (
    <section className="section" id="appointment" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Appointment Real-Time Availability</span>
          <h2 className="section-title">Passport Seva Kendra (PSK) Slot Status</h2>
          <p className="section-desc">
            Check live appointment openings across regional jurisdictions with unambiguous appointment date labeling, calendar heatmap, and multi-criteria filters.
          </p>
        </div>

        {/* Multi-Criteria Filters Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          alignItems: 'end'
        }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="select-rpo">
              Regional Passport Office (RPO)
            </label>
            <select 
              id="select-rpo" 
              className="form-select"
              value={selectedOffice}
              onChange={(e) => setSelectedOffice(e.target.value)}
            >
              {passportOffices.map((office) => (
                <option key={office} value={office}>{office} Jurisdiction</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="select-quota">
              Appointment Quota
            </label>
            <select 
              id="select-quota" 
              className="form-select"
              value={quotaFilter}
              onChange={(e) => setQuotaFilter(e.target.value)}
            >
              <option value="all">All Quotas (Normal & Tatkaal)</option>
              <option value="normal">Normal Scheme Only</option>
              <option value="tatkaal">Tatkaal Expedited Only</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="select-horizon">
              Slot Time Horizon
            </label>
            <select 
              id="select-horizon" 
              className="form-select"
              value={dateHorizon}
              onChange={(e) => setDateHorizon(e.target.value)}
            >
              <option value="all">Any Available Date</option>
              <option value="7days">Earliest Slots (Within Next 7 Days)</option>
              <option value="14days">Within Next 14 Days</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="search-center">
              Search Kendra or PIN
            </label>
            <input 
              id="search-center"
              type="text" 
              className="form-input" 
              placeholder="e.g. Andheri, Malad, 400013"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* View Toggle Bar (Table View vs. Calendar Heatmap View) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: viewMode === 'table' ? '2px solid var(--gov-navy)' : '1px solid #CBD5E1',
                background: viewMode === 'table' ? 'var(--gov-navy)' : '#FFFFFF',
                color: viewMode === 'table' ? '#FFFFFF' : 'var(--text-body)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              📋 List Table View
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: viewMode === 'calendar' ? '2px solid var(--gov-navy)' : '1px solid #CBD5E1',
                background: viewMode === 'calendar' ? 'var(--gov-navy)' : '#FFFFFF',
                color: viewMode === 'calendar' ? '#FFFFFF' : 'var(--text-body)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              📅 7-Day Slot Heatmap
            </button>
          </div>

          {viewMode === 'table' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748B' }}>Sort results by:</span>
              <select 
                className="form-select" 
                style={{ width: 'auto', padding: '6px 12px', fontSize: '12.5px' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Earliest Appointment Date</option>
                <option value="slots">Maximum Available Slots</option>
              </select>
            </div>
          )}
        </div>

        {/* View 1: Calendar Heatmap Mode */}
        {viewMode === 'calendar' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)' }}>
                Weekly Capacity Heatmap — {selectedOffice} Jurisdiction
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                <span style={{ color: '#0F766E', fontWeight: 700 }}>● High Capacity (&gt;100)</span>
                <span style={{ color: '#EA580C', fontWeight: 700 }}>● Fast Filling (&lt;100)</span>
                <span style={{ color: '#64748B', fontWeight: 700 }}>● Weekend / Closed</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {calendarDays.map((cDay, idx) => (
                <div
                  key={idx}
                  style={{
                    background: cDay.bg,
                    borderRadius: '12px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    border: `1px solid ${cDay.color}40`,
                    transition: 'all 0.2s ease',
                    cursor: cDay.slots > 0 ? 'pointer' : 'default'
                  }}
                  onClick={() => cDay.slots > 0 && setSlotDetail({ 
                    center: `PSK ${selectedOffice}`, 
                    address: `Regional Passport Seva Kendra, ${selectedOffice} Main Complex`, 
                    nextDate: `${cDay.date} 2026`,
                    quota: 'Normal',
                    totalAvailable: cDay.slots
                  })}
                >
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                    {cDay.day}
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--gov-navy)', margin: '4px 0', fontFamily: 'var(--font-serif)' }}>
                    {cDay.date}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: cDay.color }}>
                    {cDay.slots > 0 ? `${cDay.slots} Slots` : 'Closed'}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: cDay.color, marginTop: '4px' }}>
                    {cDay.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Modern Table View with Explicit Labeling */}
        <div className="modern-table-container">
          <div className="modern-table-header">
            <div>Passport Kendra & Physical Location</div>
            <div>Appointment Quota</div>
            <div>Capacity & Status</div>
            <div style={{ textAlign: 'right' }}>
              <div>Next Available Appointment Slot Date</div>
              <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'none', fontWeight: 500 }}>
                (The actual date you will visit the center)
              </div>
            </div>
          </div>

          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <div key={slot.id} className="modern-table-row">
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--gov-navy)', fontSize: '15.5px', fontFamily: 'var(--font-serif)' }}>
                    {slot.center}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                    {slot.address}
                  </div>
                </div>

                <div>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: slot.quota === 'Tatkaal' ? '#FFF7ED' : '#EFF6FF',
                    color: slot.quota === 'Tatkaal' ? '#C2410C' : '#0369A1',
                    border: `1px solid ${slot.quota === 'Tatkaal' ? '#FED7AA' : '#BAE6FD'}`
                  }}>
                    {slot.quota} Scheme
                  </span>
                </div>

                <div>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>
                    {slot.totalAvailable} slots open
                  </span>
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '11.5px', 
                    color: slot.status === 'Fast Filling' ? '#B91C1C' : '#0F766E',
                    fontWeight: 600
                  }}>
                    ● {slot.status}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="badge-slot">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{slot.nextDate}</span>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <button 
                      className="btn btn-navy btn-sm"
                      onClick={() => setSlotDetail(slot)}
                    >
                      Inspect & Reserve Slot
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              No passport centers found matching your filter criteria. Try expanding the time horizon or clearing the search query.
            </div>
          )}
        </div>
      </div>

      {/* Slot Inspection Modal */}
      {slotDetail && (
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
            maxWidth: '540px',
            padding: '28px',
            boxShadow: 'var(--shadow-modal)',
            border: '2px solid var(--gov-gold)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-emerald" style={{ fontSize: '11px', marginBottom: '4px' }}>
                  Official PSK Appointment Opening
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gov-navy)', margin: '4px 0 0 0' }}>
                  {slotDetail.center}
                </h3>
              </div>
              <button
                onClick={() => setSlotDetail(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                Physical Location: <strong>{slotDetail.address}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
                <span>Scheduled Visit Date:</span>
                <strong style={{ color: 'var(--gov-navy)' }}>{slotDetail.nextDate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginTop: '4px' }}>
                <span>Available Quota:</span>
                <strong style={{ color: '#0F766E' }}>{slotDetail.totalAvailable} Seats ({slotDetail.quota || 'Normal'} Scheme)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                <span>Reporting Hours:</span>
                <span>09:00 AM – 04:30 PM IST</span>
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
              ℹ️ Applicants must carry their original documents (Aadhaar, DOB, 10th cert) and one set of self-attested photocopies. Live biometric capture and photography is conducted inside Counter A.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-navy"
                style={{ flex: 1, padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => {
                  const s = slotDetail;
                  setSlotDetail(null);
                  onBookSlot(s);
                }}
              >
                <span>Proceed to Online Application Form</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              <button
                className="btn btn-outline"
                style={{ padding: '12px 18px' }}
                onClick={() => setSlotDetail(null)}
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
