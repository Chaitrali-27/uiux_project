import React, { useState } from 'react';
import { SearchIcon, CheckIcon, CalendarIcon, AlertCircleIcon } from './Icons';

export const AppointmentChecker = ({ onBookSlot }) => {
  const [selectedOffice, setSelectedOffice] = useState('Mumbai');
  const [quotaFilter, setQuotaFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const passportOffices = ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Ahmedabad', 'Kolkata', 'Chennai'];

  const slotsData = [
    {
      id: 1,
      center: 'PSK Lower Parel',
      city: 'Mumbai',
      address: 'Trade Point, Kamala Mills Compound, Lower Parel, Mumbai 400013',
      quota: 'Normal',
      nextDate: '28 October 2026',
      totalAvailable: 142,
      status: 'Available'
    },
    {
      id: 2,
      center: 'PSK Andheri',
      city: 'Mumbai',
      address: 'The Great Oasis Enterprises, MIDC Marol, Andheri (E), Mumbai 400093',
      quota: 'Normal',
      nextDate: '29 October 2026',
      totalAvailable: 88,
      status: 'Available'
    },
    {
      id: 3,
      center: 'PSK Andheri (Tatkaal Cell)',
      city: 'Mumbai',
      address: 'The Great Oasis Enterprises, MIDC Marol, Andheri (E), Mumbai 400093',
      quota: 'Tatkaal',
      nextDate: '26 October 2026',
      totalAvailable: 24,
      status: 'Fast Filling'
    },
    {
      id: 4,
      center: 'POPSK Malad',
      city: 'Mumbai',
      address: 'Post Office Building, Malad West, Mumbai 400064',
      quota: 'Normal',
      nextDate: '02 November 2026',
      totalAvailable: 65,
      status: 'Available'
    },
    {
      id: 5,
      center: 'PSK Herald House',
      city: 'Delhi',
      address: 'ITO, Bahadur Shah Zafar Marg, New Delhi 110002',
      quota: 'Normal',
      nextDate: '27 October 2026',
      totalAvailable: 210,
      status: 'Available'
    },
    {
      id: 6,
      center: 'PSK Shalimar Place',
      city: 'Delhi',
      address: 'A-Block, Shalimar Place, Ring Road, Delhi 110088',
      quota: 'Tatkaal',
      nextDate: '26 October 2026',
      totalAvailable: 35,
      status: 'Fast Filling'
    },
    {
      id: 7,
      center: 'PSK Lalbagh',
      city: 'Bengaluru',
      address: 'No 45 Prestige Libra, Near Urvashi Theatre, Lalbagh Main Road, Bengaluru 560027',
      quota: 'Normal',
      nextDate: '30 October 2026',
      totalAvailable: 175,
      status: 'Available'
    },
    {
      id: 8,
      center: 'PSK Mundhwa',
      city: 'Pune',
      address: 'Zero One IT Park, Near Passport Office, Mundhwa, Pune 411036',
      quota: 'Normal',
      nextDate: '29 October 2026',
      totalAvailable: 120,
      status: 'Available'
    }
  ];

  // Filtering logic
  const filteredSlots = slotsData.filter((slot) => {
    const matchesCity = slot.city === selectedOffice;
    const matchesQuota = quotaFilter === 'all' || slot.quota.toLowerCase() === quotaFilter.toLowerCase();
    const matchesSearch = slot.center.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          slot.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesQuota && matchesSearch;
  });

  return (
    <section className="section" id="appointment" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            Appointment Real-Time Slots
            <span className="flaw-tag solved">UI-11 CSS Grid Solved</span>
          </span>
          <h2 className="section-title">Check Passport Seva Kendra (PSK) Availability</h2>
          <p className="section-desc">
            Replaced legacy nested HTML tables with a modern, responsive CSS grid that maintains pixel-perfect alignment across mobile, tablet, and desktop zoom levels.
          </p>
        </div>

        {/* Filter Controls (UI-11 & UI-14 Spacing) */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
              Appointment Quota Filter
            </label>
            <select 
              id="select-quota" 
              className="form-select"
              value={quotaFilter}
              onChange={(e) => setQuotaFilter(e.target.value)}
            >
              <option value="all">All Quotas (Normal & Tatkaal)</option>
              <option value="normal">Normal Scheme Only</option>
              <option value="tatkaal">Tatkaal Urgent Only</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="search-center">
              Search Center Name / Pincode
            </label>
            <input 
              id="search-center"
              type="text" 
              className="form-input" 
              placeholder="e.g. Andheri, Malad, Lalbagh"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* UI-11 Fix: Modern Table Layout with CSS Grid (Responsive & Accessible) */}
        <div className="modern-table-container">
          <div className="modern-table-header">
            <div>Passport Kendra & Location</div>
            <div>Appointment Quota</div>
            <div>Available Slots</div>
            <div style={{ textAlign: 'right' }}>Next Available Slot Date</div>
          </div>

          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <div key={slot.id} className="modern-table-row">
                <div>
                  <div style={{ fontWeight: 700, color: '#0A2540', fontSize: '15px' }}>
                    {slot.center}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                    {slot.address}
                  </div>
                </div>

                <div>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: slot.quota === 'Tatkaal' ? '#FFF7ED' : '#EFF6FF',
                    color: slot.quota === 'Tatkaal' ? '#C2410C' : '#1D4ED8',
                    border: `1px solid ${slot.quota === 'Tatkaal' ? '#FED7AA' : '#BFDBFE'}`
                  }}>
                    {slot.quota} Scheme
                  </span>
                </div>

                <div>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>
                    {slot.totalAvailable} slots
                  </span>
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '11.5px', 
                    color: slot.status === 'Fast Filling' ? '#DC2626' : '#059669',
                    fontWeight: 600
                  }}>
                    ● {slot.status}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="badge-slot">
                    <CheckIcon className="w-3.5 h-3.5" />
                    <span>{slot.nextDate}</span>
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <button 
                      className="btn btn-outline btn-sm"
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
              No passport centers found matching your search criteria in {selectedOffice}. Try resetting filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
