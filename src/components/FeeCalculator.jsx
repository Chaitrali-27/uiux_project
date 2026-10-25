import React, { useState } from 'react';
import { InfoIcon, ArrowRightIcon, CheckIcon, ShieldIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedFeeCalc } from '../utils/localizedContent';

export const FeeCalculator = ({ language = 'en', onApplyNow }) => {
  const t = getTranslation(language);
  const f = getLocalizedFeeCalc(language);

  const [serviceType, setServiceType] = useState('fresh');
  const [applicantAge, setApplicantAge] = useState('adult');
  const [pages, setPages] = useState('36');
  const [scheme, setScheme] = useState('normal');

  const calculateFee = () => {
    let base = 1500;
    if (pages === '60') base = 2000;
    if (serviceType === 'pcc') return { base: 500, tatkaal: 0, discount: 0, total: 500 };
    if (serviceType === 'surrender') return { base: 500, tatkaal: 0, discount: 0, total: 500 };

    let discount = 0;
    if (applicantAge === 'minor' || applicantAge === 'senior') {
      discount = base * 0.1;
    }

    let tatkaalFee = 0;
    if (scheme === 'tatkaal') {
      tatkaalFee = 2000;
    }

    const total = (base - discount) + tatkaalFee;
    return { base, tatkaal: tatkaalFee, discount, total };
  };

  const { base, tatkaal, discount, total } = calculateFee();

  return (
    <section className="section" id="fee-calculator" style={{ backgroundColor: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.feeCalcTag}</span>
          <h2 className="section-title">{t.feeCalcTitle}</h2>
          <p className="section-desc">
            {t.feeCalcDesc}
          </p>
        </div>

        <div className="fee-calculator-card" style={{ fontFamily: 'var(--font-serif)' }}>
          {/* Left Column: Form Controls with UI-06 Rich Elements */}
          <div>
            <div className="form-group">
              <label className="form-label" htmlFor="fee-service" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{f.serviceCategoryLabel}</span>
                <span className="form-label-helper" style={{ fontStyle: 'italic', color: '#64748B' }}>{f.selectServicePrompt}</span>
              </label>
              <select 
                id="fee-service"
                className="form-select"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                style={{ fontFamily: 'var(--font-serif)', fontSize: '14.5px' }}
              >
                <option value="fresh">{f.freshOption}</option>
                <option value="reissue">{f.reissueOption}</option>
                <option value="pcc">{f.pccOption}</option>
                <option value="surrender">{f.surrenderOption || 'Surrender Certificate'}</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fee-age">
                  {f.ageGroupLabel}
                </label>
                <select 
                  id="fee-age"
                  className="form-select"
                  value={applicantAge}
                  onChange={(e) => setApplicantAge(e.target.value)}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '14px' }}
                >
                  <option value="adult">{f.adultOption}</option>
                  <option value="minor">{f.minorOption}</option>
                  <option value="senior">{f.seniorOption}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="fee-pages">
                  {f.bookletSizeLabel}
                </label>
                <select 
                  id="fee-pages"
                  className="form-select"
                  value={pages}
                  disabled={serviceType === 'pcc' || serviceType === 'surrender'}
                  onChange={(e) => setPages(e.target.value)}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '14px' }}
                >
                  <option value="36">{f.pages36}</option>
                  <option value="60">{f.pages60}</option>
                </select>
              </div>
            </div>

            {/* Scheme Selector with Visual Progress Meter (UI-06 Form Enhancement) */}
            <div className="form-group">
              <label className="form-label">
                {f.schemeLabel}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div 
                  onClick={() => setScheme('normal')}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: scheme === 'normal' ? '2.5px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                    background: scheme === 'normal' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--gov-navy)' }}>{f.normalScheme}</div>
                    {scheme === 'normal' && <CheckIcon className="w-4 h-4" style={{ color: 'var(--gov-navy)' }} />}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B' }}>{f.normalDesc}</div>
                  
                  {/* Visual Speed Meter Bar */}
                  <div style={{ marginTop: '10px', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', background: 'var(--gov-blue-accent)' }} />
                  </div>
                </div>

                <div 
                  onClick={() => setScheme('tatkaal')}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: scheme === 'tatkaal' ? '2.5px solid var(--gov-navy)' : '1px solid var(--border-medium)',
                    background: scheme === 'tatkaal' ? 'var(--bg-subtle-accent)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--gov-navy)' }}>{f.tatkaalScheme}</div>
                    {scheme === 'tatkaal' && <CheckIcon className="w-4 h-4" style={{ color: 'var(--gov-navy)' }} />}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B' }}>{f.tatkaalDesc}</div>
                  
                  {/* Visual Speed Meter Bar */}
                  <div style={{ marginTop: '10px', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '95%', height: '100%', background: 'var(--gov-saffron)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Concession Notice for Minor/Senior */}
            {(applicantAge === 'minor' || applicantAge === 'senior') && (
              <div style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                fontSize: '12.5px',
                color: '#065F46'
              }}>
                <CheckIcon className="w-4 h-4" style={{ color: '#059669', flexShrink: 0 }} />
                <span>
                  <strong>10% Statutory Concession Applied:</strong> Automatic discount under Schedule IV of Passports Rules, 1980 for eligible age categories.
                </span>
              </div>
            )}

            {/* Official Payment Mode Information */}
            <div style={{ display: 'flex', gap: '10px', background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
              <InfoIcon className="w-5 h-5" style={{ color: 'var(--gov-blue-accent)', flexShrink: 0 }} />
              <div style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
                {f.paymentNotice}
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown Panel with UI-06 Rich Tariff Elements */}
          <div className="fee-breakdown-panel" style={{ fontFamily: 'var(--font-serif)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--gov-gold)' }}>
                  {f.estimatedSummary}
                </span>
                <span className="badge-slot" style={{ background: 'rgba(255, 255, 255, 0.12)', color: '#F8FAFC', borderColor: 'rgba(255, 255, 255, 0.25)', fontSize: '11px', fontWeight: 600 }}>
                  <ShieldIcon className="w-3 h-3" style={{ marginRight: '4px' }} />
                  {f.scheduleTariff}
                </span>
              </div>

              <div className="fee-total-amount" style={{ fontFamily: 'var(--font-serif)', marginTop: '8px', marginBottom: '4px' }}>
                ₹{total.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '12px', color: '#CBD5E1', marginBottom: '20px', lineHeight: 1.5 }}>
                {f.inclusiveNotice || 'Inclusive of Government administrative processing & postal delivery charges.'}
              </div>

              <div className="fee-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13.5px' }}>
                <span>{f.baseFeeLabel} ({pages} Pages):</span>
                <strong>₹{base.toLocaleString('en-IN')}</strong>
              </div>

              {discount > 0 && (
                <div className="fee-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13.5px', color: '#4ADE80' }}>
                  <span>{f.concessionLabel}:</span>
                  <strong>- ₹{discount.toLocaleString('en-IN')}</strong>
                </div>
              )}

              {tatkaal > 0 && (
                <div className="fee-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '13.5px', color: '#FDBA74' }}>
                  <span>{f.tatkaalFeeLabel}:</span>
                  <strong>+ ₹{tatkaal.toLocaleString('en-IN')}</strong>
                </div>
              )}

              <div className="fee-row total" style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid rgba(194, 147, 41, 0.5)', marginTop: '8px', fontSize: '16px', fontWeight: 700 }}>
                <span>{f.totalPayableLabel}:</span>
                <span style={{ color: 'var(--gov-gold)', fontSize: '20px' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              className="btn btn-saffron" 
              style={{ width: '100%', marginTop: '24px', fontFamily: 'var(--font-serif)', fontSize: '14.5px', fontWeight: 700 }}
              onClick={onApplyNow}
            >
              <span>{f.proceedApplyBtn}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
