import React, { useState } from 'react';
import { CheckIcon, ArrowRightIcon, InfoIcon } from './Icons';

export const DocumentAdvisor = ({ onStartApplication }) => {
  const [applicantType, setApplicantType] = useState('adult'); // adult, minor, senior
  const [serviceReason, setServiceReason] = useState('fresh'); // fresh, reissue, lost, name_change
  const [educationLevel, setEducationLevel] = useState('graduate'); // graduate, 10th_pass, below_10th

  const getPersonalizedDocuments = () => {
    const docs = [];

    // Proof of Address
    if (applicantType === 'minor') {
      docs.push({
        category: 'Proof of Present Residential Address',
        mandatory: true,
        options: ['Aadhaar Card of Parent (Father/Mother)', 'Valid Passport copy of Parent', 'Registered Rent Agreement with Parent Name']
      });
    } else {
      docs.push({
        category: 'Proof of Present Residential Address (Any One)',
        mandatory: true,
        options: [
          'Aadhaar Card with current address',
          'Active Bank Passbook (Scheduled Public / Private Bank with photo)',
          'Electricity Bill / Water Bill / Gas Connection Bill (Last 2 months)',
          'Registered Rent Agreement (Minimum 1 year validity)'
        ]
      });
    }

    // Proof of Date of Birth
    docs.push({
      category: 'Proof of Date of Birth (DOB) (Any One)',
      mandatory: true,
      options: [
        'Birth Certificate issued by Registrar of Births & Deaths / Municipal Corporation',
        'Aadhaar Card / e-Aadhaar with complete DD/MM/YYYY',
        'Secondary School Leaving Certificate (SSLC) / Matriculation Certificate',
        'PAN Card issued by Income Tax Department'
      ]
    });

    // Non-ECR (Emigration Check Not Required) Status
    if (educationLevel === 'below_10th') {
      docs.push({
        category: 'ECR Category (Emigration Check Required)',
        mandatory: false,
        note: 'Since educational qualification is below 10th standard, an ECR stamp will be endorsed on your passport. No educational degree proof needed.'
      });
    } else {
      docs.push({
        category: 'Non-ECR Proof (Emigration Check Not Required)',
        mandatory: true,
        options: [
          '10th Standard / Matriculation Passing Certificate',
          'Higher Secondary / Diploma / University Degree Certificate',
          'Income Tax Assessment Order / Professional Tax Receipts (if applicable)'
        ]
      });
    }

    // Special cases
    if (serviceReason === 'reissue') {
      docs.push({
        category: 'Existing Passport Documentation',
        mandatory: true,
        options: ['Original Old Passport booklet', 'Self-attested photocopies of first two and last two pages including ECR/Non-ECR page']
      });
    } else if (serviceReason === 'lost') {
      docs.push({
        category: 'Lost / Damaged Passport Protocols',
        mandatory: true,
        options: [
          'Police FIR / Lost Article Report issued by local police station',
          'Affidavit in Annexure "F" declaring how the passport was lost/damaged'
        ]
      });
    }

    return docs;
  };

  const documentList = getPersonalizedDocuments();

  return (
    <section className="section" id="document-advisor" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Interactive Document Advisor</span>
          <h2 className="section-title">Personalized Document Requirements Checklist</h2>
          <p className="section-desc">
            Never face rejection at the PSK. Answer 3 simple questions to generate your exact statutory document checklist tailored to your specific application profile.
          </p>
        </div>

        {/* 3 Interactive Question Selectors */}
        <div style={{
          background: '#F9FAFB',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {/* Question 1: Age */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                1. Applicant Age Category
              </label>
              <select 
                className="form-select"
                value={applicantType}
                onChange={(e) => setApplicantType(e.target.value)}
              >
                <option value="adult">Adult Citizen (18 to 59 Years)</option>
                <option value="minor">Minor Child (Below 18 Years)</option>
                <option value="senior">Senior Citizen (60 Years & Above)</option>
              </select>
            </div>

            {/* Question 2: Reason */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                2. Application Purpose
              </label>
              <select 
                className="form-select"
                value={serviceReason}
                onChange={(e) => setServiceReason(e.target.value)}
              >
                <option value="fresh">Fresh Passport (First-time Applicant)</option>
                <option value="reissue">Re-issue / Normal Renewal</option>
                <option value="lost">Lost / Stolen / Damaged Passport</option>
              </select>
            </div>

            {/* Question 3: Education */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                3. Educational Qualification
              </label>
              <select 
                className="form-select"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="graduate">Graduate Degree / Post-Graduate (Non-ECR)</option>
                <option value="10th_pass">10th Standard / Matriculation Pass (Non-ECR)</option>
                <option value="below_10th">Below 10th Standard (ECR Stamp)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generated Personalized Checklist */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          padding: '32px',
          boxShadow: 'var(--shadow-hover)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--gov-gold)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Tailored Document Checklist
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
                Required Documents for {applicantType === 'adult' ? 'Adult' : applicantType === 'minor' ? 'Minor' : 'Senior'} ({serviceReason === 'fresh' ? 'Fresh Passport' : serviceReason === 'reissue' ? 'Renewal' : 'Lost Case'})
              </h3>
            </div>

            <button 
              className="btn btn-navy btn-sm"
              onClick={() => window.print()}
            >
              🖨️ Print Checklist
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {documentList.map((doc, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--gov-navy)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {idx + 1}
                  </div>
                  <strong style={{ fontSize: '15.5px', color: 'var(--gov-navy)' }}>
                    {doc.category}
                  </strong>
                  {doc.mandatory && (
                    <span style={{ fontSize: '11px', background: '#FEF2F2', color: '#B91C1C', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      Mandatory
                    </span>
                  )}
                </div>

                {doc.options && (
                  <ul style={{ paddingLeft: '32px', fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                    {doc.options.map((opt, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}

                {doc.note && (
                  <div style={{ paddingLeft: '32px', fontSize: '13.5px', color: '#64748B', fontStyle: 'italic' }}>
                    {doc.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#F0FDF4', padding: '16px 20px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '13.5px', color: '#166534' }}>
              ✓ All original documents must be carried for physical inspection along with one set of self-attested photocopies.
            </div>
            <button className="btn btn-saffron btn-sm" onClick={onStartApplication}>
              <span>Proceed to Application with These Documents</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
