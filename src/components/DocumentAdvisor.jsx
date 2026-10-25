import React, { useState } from 'react';
import { CheckIcon, ArrowRightIcon, InfoIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedDocuments } from '../utils/localizedContent';

export const DocumentAdvisor = ({ language = 'en', onStartApplication }) => {
  const t = getTranslation(language);
  const [applicantType, setApplicantType] = useState('adult'); // adult, minor, senior
  const [serviceReason, setServiceReason] = useState('fresh'); // fresh, reissue, lost
  const [educationLevel, setEducationLevel] = useState('graduate'); // graduate, 10th_pass, below_10th

  const { labels, docs: documentList } = getLocalizedDocuments(language, applicantType, serviceReason);

  const translatedType = applicantType === 'adult' ? labels.adult : applicantType === 'minor' ? labels.minor : labels.senior;
  const translatedReason = serviceReason === 'fresh' ? labels.fresh : serviceReason === 'reissue' ? labels.reissue : labels.lost;

  return (
    <section className="section" id="document-advisor" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.docAdvisorTag}</span>
          <h2 className="section-title">{t.docAdvisorTitle}</h2>
          <p className="section-desc">
            {t.docAdvisorDesc}
          </p>
        </div>

        {/* Guided Wizard Form */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '28px',
          maxWidth: '900px',
          margin: '0 auto 36px auto',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {/* Question 1: Applicant Category */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {language === 'kn' ? '1. ಅರ್ಜಿದಾರರ ವರ್ಗ' : language === 'gu' ? '1. અરજદારની શ્રેણી' : language === 'hi' ? '1. आवेदक की श्रेणी' : '1. Applicant Category'}
              </label>
              <select 
                className="form-select"
                value={applicantType}
                onChange={(e) => setApplicantType(e.target.value)}
              >
                <option value="adult">{language === 'kn' ? 'ವಯಸ್ಕರು (18 ವರ್ಷ ಮತ್ತು ಮೇಲ್ಪಟ್ಟವರು)' : language === 'gu' ? 'પુખ્ત (18 વર્ષ અને તેથી વધુ)' : language === 'hi' ? 'वयस्क (18 वर्ष और उससे अधिक)' : 'Adult (18 Years & Above)'}</option>
                <option value="minor">{language === 'kn' ? 'ಅಪ್ರಾಪ್ತರು (18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)' : language === 'gu' ? 'સગીર (18 વર્ષથી ઓછી ઉંમર)' : language === 'hi' ? 'नाबालिग (18 वर्ष से कम)' : 'Minor (Below 18 Years)'}</option>
                <option value="senior">{language === 'kn' ? 'ಹಿರಿಯ ನಾಗರಿಕರು (60+ ವರ್ಷ)' : language === 'gu' ? 'વરિષ્ઠ નાગરિક (60+ વર્ષ)' : language === 'hi' ? 'वरिष्ठ नागरिक (60+ वर्ष)' : 'Senior Citizen (60+ Years)'}</option>
              </select>
            </div>

            {/* Question 2: Service Type */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {language === 'kn' ? '2. ಅಗತ್ಯವಿರುವ ಸೇವೆ' : language === 'gu' ? '2. જરૂરી સેવા' : language === 'hi' ? '2. आवश्यक सेवा' : '2. Service Required'}
              </label>
              <select 
                className="form-select"
                value={serviceReason}
                onChange={(e) => setServiceReason(e.target.value)}
              >
                <option value="fresh">{language === 'kn' ? 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್ (ಮೊದಲ ಬಾರಿಗೆ)' : language === 'gu' ? 'નવો પાસપોર્ટ (પ્રથમ અરજદાર)' : language === 'hi' ? 'नया पासपोर्ट (प्रथम आवेदक)' : 'Fresh Passport (First-time Applicant)'}</option>
                <option value="reissue">{language === 'kn' ? 'ನವೀಕರಣ / ಅವಧಿ ಮುಕ್ತಾಯ' : language === 'gu' ? 'રિન્યુઅલ / સમયસીમા સમાપ્ત' : language === 'hi' ? 'नवीनीकरण / समाप्ति' : 'Renewal / Re-issue of Expiring Booklet'}</option>
                <option value="lost">{language === 'kn' ? 'ಕಳೆದುಹೋದ / ಹಾನಿಗೊಳಗಾದ ಪಾಸ್‌ಪೋರ್ಟ್' : language === 'gu' ? 'ખોવાયેલ / ક્ષતિગ્રસ્ત પાસપોર્ટ' : language === 'hi' ? 'खोया हुआ / क्षतिग्रस्त पासपोर्ट' : 'Replacement of Lost / Damaged Passport'}</option>
              </select>
            </div>

            {/* Question 3: Education */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {language === 'kn' ? '3. ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ' : language === 'gu' ? '3. શૈક્ષણિક લાયકાત' : language === 'hi' ? '3. शैक्षणिक योग्यता' : '3. Educational Qualification'}
              </label>
              <select 
                className="form-select"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="graduate">{language === 'kn' ? 'ಪದವಿ / ಸ್ನಾತಕೋತ್ತರ (ನಾನ್-ಇಸಿಆರ್)' : language === 'gu' ? 'સ્નાતક / અનુસ્નાતક (નોન-ECR)' : 'Graduate Degree / Post-Graduate (Non-ECR)'}</option>
                <option value="10th_pass">{language === 'kn' ? '10 ನೇ ತರಗತಿ / ಮೆಟ್ರಿಕ್ಯುಲೇಶನ್ ಪಾಸ್ (ನಾನ್-ಇಸಿಆರ್)' : language === 'gu' ? '10મું પાસ (નોન-ECR)' : '10th Standard / Matriculation Pass (Non-ECR)'}</option>
                <option value="below_10th">{language === 'kn' ? '10 ನೇ ತರಗತಿಗಿಂತ ಕಡಿಮೆ (ಇಸಿಆರ್ ಸ್ಟಾಂಪ್)' : language === 'gu' ? '10મા ધોરણથી ઓછું (ECR સ્ટેમ્પ)' : 'Below 10th Standard (ECR Stamp)'}</option>
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
              <div style={{ fontSize: '12px', color: 'var(--gov-gold)', textTransform: 'capitalize', letterSpacing: '0.04em', fontWeight: 700 }}>
                {labels.badge}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--gov-navy)', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
                {labels.headingPrefix} {translatedType} ({translatedReason})
              </h3>
            </div>

            <button 
              className="btn btn-navy btn-sm"
              onClick={() => window.print()}
            >
              🖨️ {labels.printBtn}
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
                      {labels.mandatory}
                    </span>
                  )}
                </div>

                {doc.note ? (
                  <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, paddingLeft: '32px' }}>
                    {doc.note}
                  </p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: '36px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                    {doc.options.map((opt, oIdx) => (
                      <li key={oIdx} style={{ marginBottom: '4px' }}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#F0FDF4', padding: '16px 20px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '13.5px', color: '#166534' }}>
              {language === 'kn' 
                ? '✓ ಎಲ್ಲಾ ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಸ್ವಯಂ-ದೃಢೀಕರಿಸಿದ ನಕಲು ಪ್ರತಿಗಳೊಂದಿಗೆ ಪರಿಶೀಲನೆಗೆ ತರಬೇಕು.'
                : language === 'gu'
                ? '✓ તમામ મૂળ દસ્તાવેજો સ્વ-પ્રમાણિત નકલ સાથે ચકાસણી માટે લાવવાના રહેશે.'
                : '✓ All original documents must be carried for physical inspection along with one set of self-attested photocopies.'}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => alert('Official Document Checklist downloaded for your selected category.')}
              >
                📄 {t.downloadPdfBtn}
              </button>
              <button className="btn btn-saffron btn-sm" onClick={onStartApplication} style={{ fontWeight: 700 }}>
                <span>{t.proceedAppBtn}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
