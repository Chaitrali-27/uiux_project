import React, { useState } from 'react';
import { SearchIcon, CheckIcon, CalendarIcon } from './Icons';

export const AppointmentChecker = ({ onBookSlot }) => {
  const [selectedOffice, setSelectedOffice] = useState('Mumbai');
  const [quotaFilter, setQuotaFilter] = useState('all');
  const [dateHorizon, setDateHorizon] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

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

  // UX-06 Multi-Filter logic
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

  // Sorting
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
            Check live appointment openings across regional jurisdictions with unambiguous appointment date labeling and multi-criteria filters.
          </p>
        </div>

        {/* UX-06 Fix: Multi-Filter Controls Bar */}
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

          {/* Date Range Horizon Filter (UX-06 Fix) */}
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

        {/* Results Metadata & Sorting Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontSize: '13.5px', color: '#64748B' }}>
            Showing <strong>{filteredSlots.length} verified centers</strong> in {selectedOffice} Jurisdiction
          </div>
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
        </div>

        {/* UX-04 Fix: Table Header with Explicit "Next Available Appointment Slot Date" */}
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
                  {/* UX-04 Fix: Unambiguous date badge with calendar icon */}
                  <div className="badge-slot">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{slot.nextDate}</span>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <button 
                      className="btn btn-navy btn-sm"
                      onClick={() => onBookSlot(slot)}
                    >
                      Book This Slot
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
    </section>
  );
};
