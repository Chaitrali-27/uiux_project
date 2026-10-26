import React, { useState } from 'react';
import { CheckIcon, ArrowRightIcon, InfoIcon } from './Icons';
import { getTranslation } from '../utils/translations';
import { getLocalizedDocuments } from '../utils/localizedContent';

const docAdvisorQuestionsDict = {
  en: {
    q1Label: '1. Applicant Category',
    adultOption: 'Adult (18 Years & Above)',
    minorOption: 'Minor (Below 18 Years)',
    seniorOption: 'Senior Citizen (60+ Years)',
    q2Label: '2. Service Required',
    freshOption: 'Fresh Passport (First-time Applicant)',
    reissueOption: 'Renewal / Re-issue of Expiring Booklet',
    lostOption: 'Replacement of Lost / Damaged Passport',
    q3Label: '3. Educational Qualification',
    gradOption: 'Graduate Degree / Post-Graduate (Non-ECR)',
    pass10Option: '10th Standard / Matriculation Pass (Non-ECR)',
    below10Option: 'Below 10th Standard (ECR Stamp)',
    advisoryNote: '✓ All original documents must be carried for physical inspection along with one set of self-attested photocopies.'
  },
  hi: {
    q1Label: '1. आवेदक की श्रेणी',
    adultOption: 'वयस्क (18 वर्ष और उससे अधिक)',
    minorOption: 'नाबालिग (18 वर्ष से कम)',
    seniorOption: 'वरिष्ठ नागरिक (60+ वर्ष)',
    q2Label: '2. आवश्यक सेवा',
    freshOption: 'नया पासपोर्ट (प्रथम आवेदक)',
    reissueOption: 'नवीनीकरण / समाप्ति',
    lostOption: 'खोया हुआ / क्षतिग्रस्त पासपोर्ट',
    q3Label: '3. शैक्षणिक योग्यता',
    gradOption: 'स्नातक / स्नातकोत्तर (नॉन-ईसीआर)',
    pass10Option: '10वीं कक्षा / मैट्रिकुलेशन पास (नॉन-ईसीआर)',
    below10Option: '10वीं कक्षा से कम (ईसीआर स्टाम्प)',
    advisoryNote: '✓ सभी मूल दस्तावेज़ सत्यापन हेतु स्व-सत्यापित प्रतियों के एक सेट के साथ लाना अनिवार्य है।'
  },
  gu: {
    q1Label: '1. અરજદારની શ્રેણી',
    adultOption: 'પુખ્ત (18 વર્ષ અને તેથી વધુ)',
    minorOption: 'સગીર (18 વર્ષથી ઓછી ઉંમર)',
    seniorOption: 'વરિષ્ઠ નાગરિક (60+ વર્ષ)',
    q2Label: '2. જરૂરી સેવા',
    freshOption: 'નવો પાસપોર્ટ (પ્રથમ અરજદાર)',
    reissueOption: 'રિન્યુઅલ / સમયસીમા સમાપ્ત',
    lostOption: 'ખોવાયેલ / ક્ષતિગ્રસ્ત પાસપોર્ટ',
    q3Label: '3. શૈક્ષણિક લાયકાત',
    gradOption: 'સ્નાતક / અનુસ્નાતક (નોન-ECR)',
    pass10Option: '10મું પાસ (નોન-ECR)',
    below10Option: '10મા ધોરણથી ઓછું (ECR સ્ટેમ્પ)',
    advisoryNote: '✓ તમામ મૂળ દસ્તાવેજો સ્વ-પ્રમાણિત નકલ સાથે ચકાસણી માટે લાવવાના રહેશે.'
  },
  mr: {
    q1Label: '१. अर्जदाराची श्रेणी',
    adultOption: 'प्रौढ (१८ वर्षे आणि त्याहून अधिक)',
    minorOption: 'अल्पवयीन (१८ वर्षांपेक्षा कमी)',
    seniorOption: 'ज्येष्ठ नागरिक (६०+ वर्षे)',
    q2Label: '२. आवश्यक सेवा',
    freshOption: 'नवीन पासपोर्ट (प्रथम अर्जदार)',
    reissueOption: 'नूतनीकरण / कालबाह्य पुस्तिका',
    lostOption: 'हरवलेला / खराब झालेला पासपोर्ट',
    q3Label: '३. शैक्षणिक पात्रता',
    gradOption: 'पदवी / पदव्युत्तर (नॉन-ईसीआर)',
    pass10Option: '१०वी उत्तीर्ण (नॉन-ईसीआर)',
    below10Option: '१०वी पेक्षा कमी (ईसीआर शिक्का)',
    advisoryNote: '✓ सर्व मूळ कागदपत्रे स्व-साक्षांकित छायाप्रतींच्या एका संचासह तपासणीसाठी आणणे अनिवार्य आहे.'
  },
  kn: {
    q1Label: '1. ಅರ್ಜಿದಾರರ ವರ್ಗ',
    adultOption: 'ವಯಸ್ಕರು (18 ವರ್ಷ ಮತ್ತು ಮೇಲ್ಪಟ್ಟವರು)',
    minorOption: 'ಅಪ್ರಾಪ್ತರು (18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)',
    seniorOption: 'ಹಿರಿಯ ನಾಗರಿಕರು (60+ ವರ್ಷ)',
    q2Label: '2. ಅಗತ್ಯವಿರುವ ಸೇವೆ',
    freshOption: 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್ (ಮೊದಲ ಬಾರಿಗೆ)',
    reissueOption: 'ನವೀಕರಣ / ಅವಧಿ ಮುಕ್ತಾಯ',
    lostOption: 'ಕಳೆದುಹೋದ / ಹಾನಿಗೊಳಗಾದ ಪಾಸ್‌ಪೋರ್ಟ್',
    q3Label: '3. ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ',
    gradOption: 'ಪದವಿ / ಸ್ನಾತಕೋತ್ತರ (ನಾನ್-ಇಸಿಆರ್)',
    pass10Option: '10 ನೇ ತರಗತಿ / ಮೆಟ್ರಿಕ್ಯುಲೇಶನ್ ಪಾಸ್ (ನಾನ್-ಇಸಿಆರ್)',
    below10Option: '10 ನೇ ತರಗತಿಗಿಂತ ಕಡಿಮೆ (ಇಸಿಆರ್ ಸ್ಟಾಂಪ್)',
    advisoryNote: '✓ ಎಲ್ಲಾ ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಸ್ವಯಂ-ದೃಢೀಕರಿಸಿದ ನಕಲು ಪ್ರತಿಗಳೊಂದಿಗೆ ಪರಿಶೀಲನೆಗೆ ತರಬೇಕು.'
  },
  ta: {
    q1Label: '1. விண்ணப்பதாரர் பிரிவு',
    adultOption: 'பெரியவர்கள் (18 வயது மற்றும் அதற்கு மேல்)',
    minorOption: 'சிறியவர்கள் (18 வயதுக்கு கீழ்)',
    seniorOption: 'முதியவர்கள் (60+ வயது)',
    q2Label: '2. தேவையான சேவை',
    freshOption: 'புதிய பாஸ்போர்ட் (முதல் விண்ணப்பதாரர்)',
    reissueOption: 'புதுப்பித்தல் / காலாவதியான புத்தகம்',
    lostOption: 'தொலைந்த / சேதமடைந்த பாஸ்போர்ட்',
    q3Label: '3. கல்வித் தகுதி',
    gradOption: 'பட்டதாரி / முதுகலை (ECR விலக்கு)',
    pass10Option: '10-ஆம் வகுப்பு தேர்ச்சி (ECR விலக்கு)',
    below10Option: '10-ஆம் வகுப்பிற்கு கீழ் (ECR முத்திரை)',
    advisoryNote: '✓ அனைத்து அசல் ஆவணங்களும் சுய சான்றொப்பமிட்ட நகல்களுடன் சரிபார்ப்பிற்கு கொண்டு வரப்பட வேண்டும்.'
  },
  te: {
    q1Label: '1. దరఖాస్తుదారు వర్గం',
    adultOption: 'పెద్దలు (18 సంవత్సరాలు మరియు అంతకంటే ఎక్కువ)',
    minorOption: 'మైనర్లు (18 సంవత్సరాల లోపు)',
    seniorOption: 'సీనియర్ సిటిజన్లు (60+ సంవత్సరాలు)',
    q2Label: '2. అవసరమైన సేవ',
    freshOption: 'కొత్త పాస్‌పోర్ట్ (మొదటిసారి దరఖాస్తుదారు)',
    reissueOption: 'పునరుద్ధరణ / గడువు ముగిసిన బుక్‌లెట్',
    lostOption: 'కోల్పోయిన / దెబ్బతిన్న పాస్‌పోర్ట్',
    q3Label: '3. విద్యా అర్హత',
    gradOption: 'గ్రాడ్యుయేట్ / పోస్ట్ గ్రాడ్యుయేట్ (నాన్-ఈసీఆర్)',
    pass10Option: '10వ తరగతి పాస్ (నాన్-ఈసీఆర్)',
    below10Option: '10వ తరగతి కంటే తక్కువ (ఈసీఆర్ స్టాంప్)',
    advisoryNote: '✓ అన్ని అసలు పత్రాలు స్వీయ-ధృవీకరించిన నకలులతో పాటు భౌతిక తనిఖీ కోసం తీసుకురావాలి.'
  },
  bn: {
    q1Label: '১. আবেদনকারীর বিভাগ',
    adultOption: 'প্রাপ্তবয়স্ক (১৮ বছর বা তার বেশি)',
    minorOption: 'নাবালক (১৮ বছরের নিচে)',
    seniorOption: 'প্রবীণ নাগরিক (৬০+ বছর)',
    q2Label: '২. প্রয়োজনীয় পরিষেবা',
    freshOption: 'নতুন পাসপোর্ট (প্রথম আবেদনকারী)',
    reissueOption: 'পুনর্নবীকরণ / মেয়াদোত্তীর্ণ পুস্তিকা',
    lostOption: 'হারিয়ে যাওয়া / ক্ষতিগ্রস্ত পাসপোর্ট',
    q3Label: '৩. শিক্ষাগত যোগ্যতা',
    gradOption: 'স্নাতক / স্নাতকোত্তর (নন-ইসিআর)',
    pass10Option: 'দশম শ্রেণি পাস (নন-ইসিআর)',
    below10Option: 'দশম শ্রেণির নিচে (ইসিআর স্ট্যাম্প)',
    advisoryNote: '✓ সমস্ত মূল নথিপত্র স্ব-প্রত্যয়িত ফটোকপির একটি সেট সহ পরিদর্শনের জন্য আনতে হবে।'
  },
  ml: {
    q1Label: '1. അപേക്ഷകന്റെ വിഭാഗം',
    adultOption: 'മുതിർന്നവർ (18 വയസ്സും അതിൽ കൂടുതലും)',
    minorOption: 'കുട്ടികൾ (18 വയസ്സിൽ താഴെ)',
    seniorOption: 'മുതിർന്ന പൗരന്മാർ (60+ വയസ്സ്)',
    q2Label: '2. ആവശ്യമായ സേവനം',
    freshOption: 'പുതിയ പാസ്‌പോർട്ട് (ആദ്യ അപേക്ഷകൻ)',
    reissueOption: 'പുതുക്കൽ / കാലാവധി കഴിഞ്ഞ ബുക്ക്‌ലെറ്റ്',
    lostOption: 'നഷ്ടപ്പെട്ട / കേടുവന്ന പാസ്‌പോർട്ട്',
    q3Label: '3. വിദ്യാഭ്യാസ യോഗ്യത',
    gradOption: 'ബിരുദം / ബിരുദാനന്തര ബിരുദം (നോൺ-ഇസിആർ)',
    pass10Option: 'പത്താം ക്ലാസ് പാസ് (നോൺ-ഇസിആർ)',
    below10Option: 'പത്താം ക്ലാസിന് താഴെ (ഇസിആർ സ്റ്റാമ്പ്)',
    advisoryNote: '✓ എല്ലാ ഒറിജിനൽ രേഖകളും സാക്ഷ്യപ്പെടുത്തിയ പകർപ്പുകളോടൊപ്പം പരിശോധനയ്ക്കായി കൊണ്ടുവരണം.'
  },
  pa: {
    q1Label: '1. ਬਿਨੈਕਾਰ ਦੀ ਸ਼੍ਰੇਣੀ',
    adultOption: 'ਬਾਲਗ (18 ਸਾਲ ਅਤੇ ਇਸ ਤੋਂ ਵੱਧ)',
    minorOption: 'ਨਾਬਾਲਗ (18 ਸਾਲ ਤੋਂ ਘੱਟ)',
    seniorOption: 'ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨ (60+ ਸਾਲ)',
    q2Label: '2. ਲੋੜੀਂਦੀ ਸੇਵਾ',
    freshOption: 'ਨਵਾਂ ਪਾਸਪੋਰਟ (ਪਹਿਲੀ ਵਾਰ ਬਿਨੈਕਾਰ)',
    reissueOption: 'ਨਵਿਆਉਣਾ / ਮਿਆਦ ਪੁੱਗੀ ਪੁਸਤਿਕਾ',
    lostOption: 'ਗੁੰਮ ਹੋਇਆ / ਖਰਾਬ ਪਾਸਪੋਰਟ',
    q3Label: '3. ਵਿਦਿਅਕ ਯੋਗਤਾ',
    gradOption: 'ਗ੍ਰੈਜੂਏਟ / ਪੋਸਟ-ਗ੍ਰੈਜੂਏਟ (ਨਾਨ-ਈਸੀਆਰ)',
    pass10Option: '10ਵੀਂ ਪਾਸ (ਨਾਨ-ਈਸੀਆਰ)',
    below10Option: '10ਵੀਂ ਤੋਂ ਘੱਟ (ਈਸੀਆਰ ਮੋਹਰ)',
    advisoryNote: '✓ ਸਾਰੇ ਅਸਲ ਦਸਤਾਵੇਜ਼ ਸਵੈ-ਤਸਦੀਕਸ਼ੁਦਾ ਕਾਪੀਆਂ ਸਮੇਤ ਜਾਂਚ ਲਈ ਲਿਆਉਣੇ ਲਾਜ਼ਮੀ ਹਨ।'
  },
  or: {
    q1Label: '୧. ଆବେଦନକାରୀଙ୍କ ବର୍ଗ',
    adultOption: 'ବୟସ୍କ (୧୮ ବର୍ଷ ଏବଂ ତା\'ଠାରୁ ଅଧିକ)',
    minorOption: 'ନାବାଳକ (୧୮ ବର୍ଷରୁ କମ୍)',
    seniorOption: 'ବରିଷ୍ଠ ନାଗରିକ (୬୦+ ବର୍ଷ)',
    q2Label: '୨. ଆବଶ୍ୟକ ସେବା',
    freshOption: 'ନୂତନ ପାସପୋର୍ଟ (ପ୍ରଥମ ଆବେଦନକାରୀ)',
    reissueOption: 'ନବୀକରଣ / ଅବଧି ସମାପ୍ତ ପୁସ୍ତିକା',
    lostOption: 'ହଜିଯାଇଥିବା / ନଷ୍ଟ ହୋଇଥିବା ପାସପୋର୍ଟ',
    q3Label: '୩. ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା',
    gradOption: 'ସ୍ନାତକ / ସ୍ନାତକୋତ୍ତର (ନନ୍-ଇସିଆର୍)',
    pass10Option: '୧୦ମ ପାସ୍ (ନନ୍-ଇସିଆର୍)',
    below10Option: '୧୦ମ ଶ୍ରେଣୀରୁ କମ୍ (ଇସିଆର୍ ଷ୍ଟାମ୍ପ)',
    advisoryNote: '✓ ସମସ୍ତ ମୂଳ ଦଲିଲ ସ୍ୱ-ପ୍ରମାଣିତ ନକଲ ସହିତ ଯାଞ୍ଚ ପାଇଁ ଆଣିବା ବାଧ୍ୟତାମୂଳକ।'
  },
  as: {
    q1Label: '১. আবেদনকাৰীৰ শ্ৰেণী',
    adultOption: 'প্ৰাপ্তবয়স্ক (১৮ বছৰ বা ততোধিক)',
    minorOption: 'নাবালক (১৮ বছৰৰ তলৰ)',
    seniorOption: 'জ্যেষ্ঠ নাগৰিক (৬০+ বছৰ)',
    q2Label: '২. প্ৰয়োজনীয় সেৱা',
    freshOption: 'নতুন পাছপ’ৰ্ট (প্ৰথম আবেদনকাৰী)',
    reissueOption: 'নৱীকৰণ / ম্যাদ উকলি যোৱা পুস্তিকা',
    lostOption: 'হেৰোৱা / নষ্ট হোৱা পাছপ’ৰ্ট',
    q3Label: '৩. শৈক্ষিক অৰ্হতা',
    gradOption: 'স্নাতক / স্নাতকোত্তৰ (নন-ইচিআৰ)',
    pass10Option: 'দশম শ্ৰেণী উত্তীৰ্ণ (নন-ইচিআৰ)',
    below10Option: 'দশম শ্ৰেণীতকৈ কম (ইচিআৰ মোহৰ)',
    advisoryNote: '✓ সকলো মূল নথি-পত্ৰ স্ব-প্ৰত্যায়িত প্ৰতিলিপিৰ সৈতে পৰীক্ষাৰ বাবে আনিব লাগিব।'
  }
};

export const DocumentAdvisor = ({ language = 'en', onStartApplication }) => {
  const t = getTranslation(language);
  const qDict = docAdvisorQuestionsDict[language] || docAdvisorQuestionsDict.en || docAdvisorQuestionsDict.hi;
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
                {qDict.q1Label}
              </label>
              <select 
                className="form-select"
                value={applicantType}
                onChange={(e) => setApplicantType(e.target.value)}
              >
                <option value="adult">{qDict.adultOption}</option>
                <option value="minor">{qDict.minorOption}</option>
                <option value="senior">{qDict.seniorOption}</option>
              </select>
            </div>

            {/* Question 2: Service Type */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {qDict.q2Label}
              </label>
              <select 
                className="form-select"
                value={serviceReason}
                onChange={(e) => setServiceReason(e.target.value)}
              >
                <option value="fresh">{qDict.freshOption}</option>
                <option value="reissue">{qDict.reissueOption}</option>
                <option value="lost">{qDict.lostOption}</option>
              </select>
            </div>

            {/* Question 3: Education */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">
                {qDict.q3Label}
              </label>
              <select 
                className="form-select"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="graduate">{qDict.gradOption}</option>
                <option value="10th_pass">{qDict.pass10Option}</option>
                <option value="below_10th">{qDict.below10Option}</option>
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
              {qDict.advisoryNote}
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
