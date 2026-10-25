// Comprehensive Localized Content Provider for Services, Document Advisor, Fee Calculator, Announcements, and FAQs
// Supports English (en), Kannada (kn), Gujarati (gu), Hindi (hi), Marathi (mr), Tamil (ta), Telugu (te), Bengali (bn)

export const getLocalizedServices = (lang = 'en') => {
  const data = {
    kn: [
      {
        id: 'fresh-reissue',
        title: 'ಹೊಸ / ಮರು-ವಿತರಣೆ ಪಾಸ್‌ಪೋರ್ಟ್',
        shortDesc: 'ಹೊಸ 10 ವರ್ಷಗಳ ಸಾಮಾನ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಅಥವಾ 36 ಅಥವಾ 60 ಪುಟಗಳೊಂದಿಗೆ ನವೀಕರಿಸಿ.',
        fullDesc: '18 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಎಲ್ಲಾ ಭಾರತೀಯ ನಾಗರಿಕರಿಗೆ ಸಾಮಾನ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವೆ. ಆಗಾಗ್ಗೆ ವಿದೇಶ ಪ್ರಯಾಣ ಮಾಡುವವರಿಗೆ 36 ಮತ್ತು 60 ಪುಟಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ.',
        feeNormal: '₹1,500 (36 ಪುಟಗಳು) / ₹2,000 (60 ಪುಟಗಳು)',
        feeTatkaal: '₹3,500 (36 ಪುಟಗಳು) / ₹4,000 (60 ಪುಟಗಳು)',
        eta: 'ಸಾಮಾನ್ಯ: 15–20 ದಿನಗಳು | ತತ್ಕಾಲ್: 1–3 ದಿನಗಳು',
        docs: ['ಪ್ರಸ್ತುತ ವಿಳಾಸ ಹೊಂದಿರುವ ಆಧಾರ್ ಕಾರ್ಡ್', 'ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಪುರಾವೆ (ಜನನ ಪ್ರಮಾಣಪತ್ರ/ಪ್ಯಾನ್/10ನೇ ತರಗತಿ)', 'ನಾನ್-ಇಸಿಆರ್ 10ನೇ ತರಗತಿ ಪ್ರಮಾಣಪತ್ರ']
      },
      {
        id: 'tatkaal',
        title: 'ತತ್ಕಾಲ್ ಪಾಸ್‌ಪೋರ್ಟ್ ಯೋಜನೆ',
        shortDesc: 'ತುರ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣಕ್ಕಾಗಿ ತ್ವರಿತ ಪ್ರಕ್ರಿಯೆ. 72 ಗಂಟೆಗಳಲ್ಲಿ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳ್ಳುತ್ತದೆ.',
        fullDesc: 'ಪಾಸ್‌ಪೋರ್ಟ್ ನಿಯಮಗಳು 1980 ರ ಅಡಿಯಲ್ಲಿ ತುರ್ತು ಯೋಜನೆ. ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದಿನಾಂಕದಿಂದ 1 ರಿಂದ 3 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ಪಾಸ್‌ಪೋರ್ಟ್ ರವಾನಿಸಲಾಗುತ್ತದೆ.',
        feeNormal: 'ಪ್ರಮಾಣಿತ ಶುಲ್ಕ + ₹2,000 ತುರ್ತು ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ',
        feeTatkaal: 'ಒಟ್ಟು ₹3,500 (36 ಪುಟಗಳು)',
        eta: '1–3 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ರವಾನೆ',
        docs: ['2 ನಿಗದಿತ ಸರ್ಕಾರಿ ಗುರುತಿನ ಪುರಾವೆಗಳು (ಆಧಾರ್ + ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ/ಪ್ಯಾನ್)', 'ವಿಳಾಸ ಮತ್ತು ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಪುರಾವೆ']
      },
      {
        id: 'pcc',
        title: 'ಪೊಲೀಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಪ್ರಮಾಣಪತ್ರ (PCC)',
        shortDesc: 'ಉದ್ಯೋಗ, ದೀರ್ಘಾವಧಿ ವಾಸ್ತವ್ಯ ಅಥವಾ ವಿದೇಶ ವಲಸೆಗಾಗಿ ಭಾರತೀಯ ನಾಗರಿಕರಿಗೆ ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ.',
        fullDesc: 'ವಿದೇಶಿ ರಾಯಭಾರ ಕಚೇರಿಗಳಿಗೆ ಕ್ರಿಮಿನಲ್ ಹಿನ್ನೆಲೆ ಕ್ಲಿಯರೆನ್ಸ್ ಒದಗಿಸಲು ಅಗತ್ಯವಿರುವ ಭಾರತೀಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಹೊಂದಿರುವವರಿಗೆ ನೀಡಲಾಗುತ್ತದೆ.',
        feeNormal: '₹500 ನಿಗದಿತ ಸರ್ಕಾರಿ ಶುಲ್ಕ',
        feeTatkaal: 'PCC ಗೆ ತತ್ಕಾಲ್ ಯೋಜನೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ',
        eta: 'ಸಾಮಾನ್ಯ: 7–14 ದಿನಗಳು (ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ವರದಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ)',
        docs: ['ಮೂಲ ಭಾರತೀಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಮತ್ತು ನಕಲು ಪ್ರತಿ', 'ಪ್ರಸ್ತುತ ವಿಳಾಸದ ಪುರಾವೆ', 'ವಿದೇಶಿ ಉದ್ಯೋಗ / ವೀಸಾ ಪತ್ರ']
      },
      {
        id: 'diplomatic',
        title: 'ರಾಜತಾಂತ್ರಿಕ ಮತ್ತು ಅಧಿಕೃತ ಪಾಸ್‌ಪೋರ್ಟ್',
        shortDesc: 'ಸರ್ಕಾರಿ ಗಣ್ಯರು, ರಾಜತಾಂತ್ರಿಕರು ಮತ್ತು ಅಧಿಕೃತ ನಿಯೋಗಿಗಳಿಗೆ ಅಧಿಕೃತ ಕರ್ತವ್ಯದ ಮೇರೆಗೆ ನೀಡಲಾಗುತ್ತದೆ.',
        fullDesc: 'ನವದೆಹಲಿಯ ಪಟಿಯಾಲ ಹೌಸ್‌ನಲ್ಲಿರುವ CPV ವಿಭಾಗದ ಮೂಲಕ ಪ್ರತ್ಯೇಕವಾಗಿ ನೀಡಲಾಗುತ್ತದೆ. ಅಧಿಕೃತ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು ಬಿಳಿ ಬಣ್ಣ ಮತ್ತು ರಾಜತಾಂತ್ರಿಕ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು ಮೆರೂನ್ ಬಣ್ಣವನ್ನು ಹೊಂದಿರುತ್ತವೆ.',
        feeNormal: 'ಉಚಿತ (ಸರ್ಕಾರಿ ಕರ್ತವ್ಯಕ್ಕಾಗಿ ವಿನಾಯಿತಿ)',
        feeTatkaal: 'ನೇರವಾಗಿ ಸಚಿವಾಲಯ ಪ್ರೋಟೋಕಾಲ್ ಮೂಲಕ',
        eta: 'CPV ದೆಹಲಿ ಪ್ರೋಟೋಕಾಲ್ ಮೂಲಕ',
        docs: ['ಅಧಿಕೃತ ಕೇಡರ್ ಕ್ಲಿಯರೆನ್ಸ್ / ನಿಯೋಜನೆ ಆದೇಶ', 'ರಾಜಕೀಯ ಕ್ಲಿಯರೆನ್ಸ್ ಪ್ರಮಾಣಪತ್ರ (MEA)']
      },
      {
        id: 'surrender',
        title: 'ಸರೆಂಡರ್ ಪ್ರಮಾಣಪತ್ರ',
        shortDesc: 'ವಿದೇಶಿ ಪೌರತ್ವ ಪಡೆದ ನಂತರ ಭಾರತೀಯ ಪೌರತ್ವ ಕಾಯ್ದೆ 1955 ರ ಅಡಿಯಲ್ಲಿ ಕಡ್ಡಾಯ ಪ್ರಮಾಣಪತ್ರ.',
        fullDesc: 'ವಿದೇಶಿ ಪೌರತ್ವ ಪಡೆದ ಭಾರತೀಯ ಮೂಲದ ವ್ಯಕ್ತಿಗಳು ಪಾಸ್‌ಪೋರ್ಟ್ ಕಾಯ್ದೆಯಡಿ ದಂಡವನ್ನು ತಪ್ಪಿಸಲು ತಮ್ಮ ಭಾರತೀಯ ಪಾಸ್‌ಪೋರ್ಟ್ ಅನ್ನು ಒಪ್ಪಿಸಬೇಕು.',
        feeNormal: '₹500 (2010 ರ ನಂತರ) / ₹1,000',
        feeTatkaal: 'ಸಾಮಾನ್ಯ ಪ್ರಕ್ರಿಯೆ ಮಾತ್ರ',
        eta: '5 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ವಿತರಣೆ',
        docs: ['ಮೂಲ ಭಾರತೀಯ ಪಾಸ್‌ಪೋರ್ಟ್', 'ವಿದೇಶಿ ಪೌರತ್ವ ಪ್ರಮಾಣಪತ್ರ / ವಿದೇಶಿ ಪಾಸ್‌ಪೋರ್ಟ್']
      },
      {
        id: 'loc-permit',
        title: 'ಗಡಿ ನಿಯಂತ್ರಣ ರೇಖೆ (LoC) ಪರವಾನಗಿ',
        shortDesc: 'ಗಡಿ ದಾಟುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಕುಟುಂಬ ಭೇಟಿಗಾಗಿ ಕಾಯಂ ನಿವಾಸಿಗಳಿಗೆ ವಿಶೇಷ ಪ್ರಯಾಣ ದಾಖಲೆ.',
        fullDesc: 'ವ್ಯಾಪಾರ ಮತ್ತು ಪ್ರಯಾಣ ಕ್ರಾಸಿಂಗ್ ಪಾಯಿಂಟ್‌ಗಳ ಮೂಲಕ ಕೌಟುಂಬಿಕ ಭೇಟಿಗಳಿಗಾಗಿ ಗಡಿ ನಿಯಂತ್ರಣ ರೇಖೆಯಾದ್ಯಂತ ಪ್ರಯಾಣಿಸುವ ಕಾಯಂ ನಿವಾಸಿಗಳಿಗೆ ನೀಡಲಾಗುತ್ತದೆ.',
        feeNormal: 'ಉಚಿತ / ನಾಮಮಾತ್ರ ನಿಯಂತ್ರಿತ',
        feeTatkaal: 'ಅನ್ವಯಿಸುವುದಿಲ್ಲ',
        eta: 'ವಿಶೇಷ ವಿಭಾಗದ ಮೂಲಕ ಪರಿಶೀಲನೆ',
        docs: ['ರಾಜ್ಯ ನಿವಾಸಿ ಪ್ರಮಾಣಪತ್ರ (PRC)', 'ಸ್ಥಳೀಯ ಉಪವಿಭಾಗಾಧಿಕಾರಿ ಪರಿಶೀಲನೆ']
      }
    ],
    gu: [
      {
        id: 'fresh-reissue',
        title: 'નવો / રિન્યુઅલ પાસપોર્ટ',
        shortDesc: 'નવા 10 વર્ષના સામાન્ય પાસપોર્ટ માટે અરજી કરો અથવા 36 કે 60 પાના સાથે રિન્યુ કરો.',
        fullDesc: '18 વર્ષથી વધુ ઉંમરના તમામ ભારતીય નાગરિકો માટે માનક પાસપોર્ટ સેવા. વારંવાર પ્રવાસ કરનારાઓ માટે 36 અને 60 પાનામાં ઉપલબ્ધ.',
        feeNormal: '₹1,500 (36 પાના) / ₹2,000 (60 પાના)',
        feeTatkaal: '₹3,500 (36 પાના) / ₹4,000 (60 પાના)',
        eta: 'સામાન્ય: 15–20 દિવસ | તત્કાલ: 1–3 દિવસ',
        docs: ['હાલના સરનામાનો પુરાવો (આધાર કાર્ડ)', 'જન્મ તારીખનો પુરાવો (જન્મ પ્રમાણપત્ર/પાન/10મું)', 'નોન-ECR 10મું પાસ પ્રમાણપત્ર']
      },
      {
        id: 'tatkaal',
        title: 'તત્કાલ પાસપોર્ટ યોજના',
        shortDesc: 'તાકીદના આંતરરાષ્ટ્રીય પ્રવાસ માટે ઝડપી પ્રક્રિયા. 72 કલાકમાં વેરિફિકેશન પૂર્ણ.',
        fullDesc: 'પાસપોર્ટ નિયમો 1980 હેઠળ કટોકટી યોજના. એપોઇન્ટમેન્ટ તારીખથી 1 થી 3 કામકાજના દિવસોમાં ડિસ્પેચ.',
        feeNormal: 'માનક ફી + ₹2,000 તત્કાલ સરચાર્જ',
        feeTatkaal: 'કુલ ₹3,500 (36 પાના)',
        eta: '1–3 કામકાજના દિવસોમાં ડિસ્પેચ',
        docs: ['2 નિર્ધારિત સરકારી ઓળખ પુરાવા (આધાર + ચૂંટણી કાર્ડ/પાન કાર્ડ)', 'સરનામું અને જન્મ તારીખનો પુરાવો']
      },
      {
        id: 'pcc',
        title: 'પોલીસ ક્લિયરન્સ સર્ટિફિકેટ (PCC)',
        shortDesc: 'વિદેશમાં રોજગાર, લાંબા ગાળાના રોકાણ અથવા સ્થળાંતર માટે સત્તાવાર પ્રમાણપત્ર.',
        fullDesc: 'વિદેશી દૂતાવાસોમાં ક્લિયરન્સ રજૂ કરવા માટે ભારતીય પાસપોર્ટ ધારકોને આપવામાં આવે છે.',
        feeNormal: '₹500 નિયત સરકારી ફી',
        feeTatkaal: 'PCC માટે તત્કાલ યોજના લાગુ નથી',
        eta: 'સામાન્ય: 7–14 દિવસ (સ્થાનિક પોલીસ રિપોર્ટને આધીન)',
        docs: ['ઓરિજિનલ ભારતીય પાસપોર્ટ અને નકલ', 'હાલના સરનામાનો પુરાવો', 'વિદેશી રોજગાર / વિઝા પત્ર']
      },
      {
        id: 'diplomatic',
        title: 'રાજદ્વારી અને સત્તાવાર પાસપોર્ટ',
        shortDesc: 'સરકારી મહાનુભાવો, રાજદ્વારીઓ અને સત્તાવાર પ્રતિનિધિઓ માટે જારી કરાય છે.',
        fullDesc: 'નવી દિલ્હીના પટિયાલા હાઉસ ખાતે CPV વિભાગ દ્વારા સંચાલિત.',
        feeNormal: 'નિઃશુલ્ક (સરકારી ફરજ માટે)',
        feeTatkaal: 'મંત્રાલય પ્રોટોકોલ દ્વારા',
        eta: 'CPV દિલ્હી પ્રોટોકોલ દ્વારા',
        docs: ['સત્તાવાર કેડર ક્લિયરન્સ / ડેપ્યુટેશન ઓર્ડર', 'પોલિટિકલ ક્લિયરન્સ સર્ટિફિકેટ']
      },
      {
        id: 'surrender',
        title: 'સરેન્ડર સર્ટિફિકેટ',
        shortDesc: 'વિદેશી નાગરિકત્વ મેળવ્યા પછી ભારતીય પાસપોર્ટ જમા કરાવવા માટેનું કાનૂની પ્રમાણપત્ર.',
        fullDesc: 'ભારતીય નાગરિકતા અધિનિયમ 1955 હેઠળ પાસપોર્ટ ઔપચારિક રીતે જમા કરાવવો ફરજિયાત છે.',
        feeNormal: '₹500 (2010 પછી) / ₹1,000',
        feeTatkaal: 'સામાન્ય પ્રક્રિયા માત્ર',
        eta: '5 કામકાજના દિવસોમાં જારી',
        docs: ['ઓરિજિનલ ભારતીય પાસપોર્ટ', 'વિદેશી નાગરિકત્વ પ્રમાણપત્ર / વિદેશી પાસપોર્ટ']
      },
      {
        id: 'loc-permit',
        title: 'લાઈન ઓફ કંટ્રોલ (LoC) પરમિટ',
        shortDesc: 'નિયુક્ત ક્રોસિંગ સેક્ટરોમાં કૌટુંબિક મુલાકાતો માટે કાયમી રહેવાસીઓ માટે વિશેષ દસ્તાવેજ.',
        fullDesc: 'વેપાર અને મુસાફરી ક્રોસિંગ પોઈન્ટ્સ દ્વારા મુલાકાત માટે જારી કરવામાં આવે છે.',
        feeNormal: 'મફત / નજીવો ચાર્જ',
        feeTatkaal: 'લાગુ નથી',
        eta: 'વિશેષ સેલ દ્વારા ચકાસણી',
        docs: ['કાયમી રહેવાસી પ્રમાણપત્ર', 'સ્થાનિક એસડીએમ ચકાસણી']
      }
    ],
    hi: [
      {
        id: 'fresh-reissue',
        title: 'नया / नवीनीकरण पासपोर्ट',
        shortDesc: 'नए 10-वर्षीय साधारण पासपोर्ट के लिए आवेदन करें या 36 या 60 पृष्ठों के साथ नवीनीकृत करें।',
        fullDesc: '18 वर्ष से अधिक आयु के सभी भारतीय नागरिकों के लिए मानक सेवा। बार-बार यात्रा करने वालों के लिए 36 और 60 पृष्ठों में उपलब्ध।',
        feeNormal: '₹1,500 (36 पृष्ठ) / ₹2,000 (60 पृष्ठ)',
        feeTatkaal: '₹3,500 (36 पृष्ठ) / ₹4,000 (60 पृष्ठ)',
        eta: 'सामान्य: 15–20 दिन | तत्काल: 1–3 दिन',
        docs: ['वर्तमान पते का प्रमाण (आधार कार्ड)', 'जन्म तिथि का प्रमाण (जन्म प्रमाण पत्र/पैन/10वीं)', 'नॉन-ईसीआर 10वीं उत्तीर्ण प्रमाण पत्र']
      },
      {
        id: 'tatkaal',
        title: 'तत्काल पासपोर्ट योजना',
        shortDesc: 'आपातकालीन अंतर्राष्ट्रीय यात्रा हेतु त्वरित सेवा। 72 घंटों में सत्यापन प्रक्रिया पूर्ण।',
        fullDesc: 'पासपोर्ट नियम 1980 के तहत आपातकालीन योजना। नियुक्ति तिथि से 1 से 3 कार्य दिवसों में प्रेषण।',
        feeNormal: 'मानक शुल्क + ₹2,000 तत्काल अधिभार',
        feeTatkaal: 'कुल ₹3,500 (36 पृष्ठ)',
        eta: '1–3 कार्य दिवसों में प्रेषण',
        docs: ['2 निर्धारित सरकारी पहचान पत्र (आधार + वोटर आईडी/पैन कार्ड)', 'पता और जन्म तिथि प्रमाण']
      },
      {
        id: 'pcc',
        title: 'पुलिस क्लीयरेंस सर्टिफिकेट (PCC)',
        shortDesc: 'विदेश में रोजगार, दीर्घकालिक प्रवास या आव्रजन हेतु आधिकारिक प्रमाण पत्र।',
        fullDesc: 'विदेशी दूतावासों में आपराधिक रिकॉर्ड क्लीयरेंस प्रस्तुत करने हेतु भारतीय पासपोर्ट धारकों को जारी।',
        feeNormal: '₹500 वैधानिक सरकारी शुल्क',
        feeTatkaal: 'PCC के लिए तत्काल योजना लागू नहीं है',
        eta: 'सामान्य: 7–14 दिन (स्थानीय पुलिस रिपोर्ट के अधीन)',
        docs: ['मूल पासपोर्ट व स्वप्रमाणित प्रति', 'वर्तमान पते का प्रमाण', 'विदेशी रोजगार / वीज़ा पत्र']
      },
      {
        id: 'diplomatic',
        title: 'राजनयिक एवं आधिकारिक पासपोर्ट',
        shortDesc: 'सरकारी गणमान्य व्यक्तियों, राजनयिकों और अधिकृत प्रतिनिधियों के लिए आधिकारिक कर्तव्य हेतु।',
        fullDesc: 'पटियाला हाउस, नई दिल्ली स्थित सीपीवी प्रभाग द्वारा विशेष रूप से संसाधित।',
        feeNormal: 'निःशुल्क (सरकारी कर्तव्य हेतु)',
        feeTatkaal: 'मंत्रालय प्रोटोकॉल द्वारा',
        eta: 'सीपीवी दिल्ली प्रोटोकॉल द्वारा',
        docs: ['आधिकारिक कैडर क्लीयरेंस / प्रतिनियुक्ति आदेश', 'राजनीतिक मंजूरी प्रमाण पत्र']
      },
      {
        id: 'surrender',
        title: 'समर्पण प्रमाण पत्र (Surrender Certificate)',
        shortDesc: 'विदेशी नागरिकता प्राप्त करने पर भारतीय पासपोर्ट समर्पित करने हेतु अनिवार्य प्रमाण पत्र।',
        fullDesc: 'भारतीय नागरिकता अधिनियम 1955 के तहत पासपोर्ट औपचारिक रूप से जमा करना आवश्यक है।',
        feeNormal: '₹500 (2010 के बाद) / ₹1,000',
        feeTatkaal: 'केवल सामान्य प्रक्रिया',
        eta: '5 कार्य दिवसों में जारी',
        docs: ['मूल भारतीय पासपोर्ट', 'विदेशी नागरिकता प्रमाण पत्र / विदेशी पासपोर्ट']
      },
      {
        id: 'loc-permit',
        title: 'नियंत्रण रेखा (LoC) परमिट',
        shortDesc: 'निर्धारित क्रॉसिंग क्षेत्रों में पारिवारिक यात्राओं हेतु स्थायी निवासियों के लिए विशेष यात्रा दस्तावेज।',
        fullDesc: 'व्यापार एवं यात्रा क्रॉसिंग बिंदुओं के माध्यम से यात्रा हेतु जारी।',
        feeNormal: 'निःशुल्क / नाममात्र विनियमित',
        feeTatkaal: 'लागू नहीं',
        eta: 'नामित सेल द्वारा सत्यापन',
        docs: ['स्थायी निवासी प्रमाण पत्र', 'स्थानीय एसडीएम सत्यापन']
      }
    ],
    en: [
      {
        id: 'fresh-reissue',
        title: 'Fresh / Re-issue Passport',
        shortDesc: 'Apply for a new 10-year Ordinary Passport or renew an expiring booklet with 36 or 60 pages.',
        fullDesc: 'Standard passport service for all Indian citizens above 18 years. Available in 36-page normal booklet and 60-page jumbo booklet for frequent international travellers.',
        feeNormal: '₹1,500 (36 Pages) / ₹2,000 (60 Pages)',
        feeTatkaal: '₹3,500 (36 Pages) / ₹4,000 (60 Pages)',
        eta: 'Normal: 15–20 days | Tatkaal: 1–3 days',
        docs: ['Aadhaar Card or Valid Address Proof', 'Date of Birth Proof (Birth Cert/PAN/10th)', 'Non-ECR 10th Passing Certificate']
      },
      {
        id: 'tatkaal',
        title: 'Tatkaal Passport Scheme',
        shortDesc: 'Expedited processing for urgent international travel. Verification process completed within 72 hours.',
        fullDesc: 'Statutory emergency scheme under Schedule IV of Passports Rules 1980. Passports are dispatched within 1 to 3 working days from the appointment date on post-police verification basis.',
        feeNormal: 'Standard Fee + ₹2,000 Expedited Surcharge',
        feeTatkaal: 'Total ₹3,500 (36 Pages)',
        eta: 'Dispatched within 1–3 working days',
        docs: ['2 Scheduled Government Identity Proofs (e.g. Aadhaar + Voter ID/PAN)', 'Standard Address & DOB Proof', 'Annexure F (if applicable)']
      },
      {
        id: 'pcc',
        title: 'Police Clearance Certificate (PCC)',
        shortDesc: 'Official certificate for Indian citizens seeking employment, long-term stay, or immigration abroad.',
        fullDesc: 'Issued to Indian passport holders required to furnish a criminal background clearance to foreign embassies for employment, tourist long-stay, student visas, or permanent residency.',
        feeNormal: '₹500 Flat Statutory Fee',
        feeTatkaal: 'Tatkaal scheme not applicable to PCC',
        eta: 'Normal: 7–14 days (Subject to Local Police Report)',
        docs: ['Original Indian Passport with Self-Attested Photocopy', 'Present Address Proof', 'Proof of Foreign Employment / Visa Letter']
      },
      {
        id: 'diplomatic',
        title: 'Diplomatic & Official Passport',
        shortDesc: 'Issued to government dignitaries, diplomats, and authorized official delegates travelling on state duty.',
        fullDesc: 'Processed exclusively through the CPV Division at Patiala House, New Delhi. Official Passports feature white covers, while Diplomatic Passports feature deep maroon covers.',
        feeNormal: 'Gratis (Government Exempted for State Duty)',
        feeTatkaal: 'Processed directly via Ministry Protocol',
        eta: 'Processed via CPV Delhi Protocol',
        docs: ['Official Cadre Clearance / Deputation Order', 'Political Clearance Certificate (MEA)', 'Identity Certificate Annexure B']
      },
      {
        id: 'surrender',
        title: 'Surrender Certificate',
        shortDesc: 'Mandatory certificate upon acquisition of foreign citizenship under the Indian Citizenship Act, 1955.',
        fullDesc: 'Required by persons of Indian origin who have acquired foreign citizenship and must formally surrender their Indian Passport to avoid penalties under Section 12 of the Passports Act.',
        feeNormal: '₹500 (Acquired post-2010) / ₹1,000',
        feeTatkaal: 'Normal processing only',
        eta: 'Issued within 5 working days',
        docs: ['Original Indian Passport', 'Foreign Citizenship Certificate / Foreign Passport', 'Copy of Naturalisation Certificate']
      },
      {
        id: 'loc-permit',
        title: 'Line of Control (LoC) Permit',
        shortDesc: 'Special travel documentation for permanent residents visiting across designated crossing sectors.',
        fullDesc: 'Issued to permanent residents travelling across the Line of Control for familial visits through trade and travel crossing points.',
        feeNormal: 'Free / Nominally Regulated',
        feeTatkaal: 'N/A',
        eta: 'Verification through designated cell',
        docs: ['State Resident Certificate (PRC)', 'Local Sub-Divisional Magistrate Verification', 'Sponsor Details']
      }
    ]
  };

  return data[lang] || data.kn || data.hi || data.en;
};

export const getLocalizedDocuments = (lang = 'en', applicantType = 'adult', reason = 'fresh') => {
  const isKn = lang === 'kn';
  const isGu = lang === 'gu';
  const isHi = lang === 'hi';

  const labels = {
    badge: isKn ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ' : isGu ? 'વિશેષ દસ્તાવેજ ચેકલિસ્ટ' : isHi ? 'दस्तावेज़ चेकलिस्ट' : 'Tailored Document Checklist',
    mandatory: isKn ? 'ಕಡ್ಡಾಯ' : isGu ? 'ફરજિયાત' : isHi ? 'अनिवार್ಯ' : 'Mandatory',
    printBtn: isKn ? 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಮುದ್ರಿಸಿ' : isGu ? 'ચેકલિસ્ટ પ્રિન્ટ કરો' : isHi ? 'चेकलिस्ट प्रिंट करें' : 'Print Checklist',
    headingPrefix: isKn ? 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:' : isGu ? 'માટે જરૂરી દસ્તાવેજો:' : isHi ? 'के लिए आवश्यक दस्तावेज़:' : 'Required Documents for',
    adult: isKn ? 'ವಯಸ್ಕರು' : isGu ? 'પુખ્ત' : isHi ? 'वयस्क' : 'Adult',
    minor: isKn ? 'ಅಪ್ರಾಪ್ತರು' : isGu ? 'સગીર' : isHi ? 'नाबालिग' : 'Minor',
    senior: isKn ? 'ಹಿರಿಯ ನಾಗರಿಕರು' : isGu ? 'વરિષ્ઠ નાગરિક' : isHi ? 'वरिष्ठ नागरिक' : 'Senior',
    fresh: isKn ? 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್' : isGu ? 'નવો પાસપોર્ટ' : isHi ? 'नया पासपोर्ट' : 'Fresh Passport',
    reissue: isKn ? 'ನವೀಕರಣ' : isGu ? 'રિન્યુઅલ' : isHi ? 'नवीनीकरण' : 'Renewal',
    lost: isKn ? 'ಕಳೆದುಹೋದ ಪ್ರಕರಣ' : isGu ? 'ખોવાયેલ કેસ' : isHi ? 'खोया हुआ केस' : 'Lost Case'
  };

  const docs = [
    {
      category: isKn 
        ? 'ಪ್ರಸ್ತುತ ವಸತಿ ವಿಳಾಸದ ಪುರಾವೆ (ಯಾವುದಾದರೂ ಒಂದು)' 
        : isGu ? 'હાલના સરનામાનો પુરાવો (કોઈપણ એક)' 
        : isHi ? 'वर्तमान पते का प्रमाण (कोई एक)' 
        : 'Proof of Present Residential Address (Any One)',
      mandatory: true,
      options: isKn ? [
        'ಪ್ರಸ್ತುತ ವಿಳಾಸ ಹೊಂದಿರುವ ಆಧಾರ್ ಕಾರ್ಡ್',
        'ಫೋಟೋ ಹೊಂದಿರುವ ಸಕ್ರಿಯ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ರಾಷ್ಟ್ರೀಕೃತ/ಖಾಸಗಿ ಬ್ಯಾಂಕ್)',
        'ವಿದ್ಯುತ್ ಬಿಲ್ / ನೀರು ಬಿಲ್ / ಗ್ಯಾಸ್ ಬಿಲ್ (ಕಳೆದ 2 ತಿಂಗಳು)',
        'ನೋಂದಾಯಿತ ಬಾಡಿಗೆ ಒಪ್ಪಂದ (ಕನಿಷ್ಠ 1 ವರ್ಷದ ಸಿಂಧುತ್ವ)'
      ] : isGu ? [
        'હાલના સરનામા સાથેનું આધાર કાર્ડ',
        'ફોટો સાથે સક્રિય બેંક પાસબુક (જાહેર / ખાનગી બેંક)',
        'લાઈટ બિલ / પાણી બિલ / ગેસ બિલ (છેલ્લા ૨ મહિના)',
        'નોંધણી થયેલ ભાડા કરાર (ઓછામાં ઓછા ૧ વર્ષની માન્યતા)'
      ] : isHi ? [
        'वर्तमान पते वाला आधार कार्ड',
        'फोटो सहित सक्रिय बैंक पासबुक (राष्ट्रीयकृत/निजी बैंक)',
        'बिजली बिल / पानी का बिल / गैस कनेक्शन बिल (पिछले 2 महीने)',
        'पंजीकृत किराया समझौता (न्यूनतम 1 वर्ष की वैधता)'
      ] : [
        'Aadhaar Card with current address',
        'Active Bank Passbook (Scheduled Public / Private Bank with photo)',
        'Electricity Bill / Water Bill / Gas Connection Bill (Last 2 months)',
        'Registered Rent Agreement (Minimum 1 year validity)'
      ]
    },
    {
      category: isKn 
        ? 'ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಪುರಾವೆ (ಯಾವುದಾದರೂ ಒಂದು)' 
        : isGu ? 'જન્મ તારીખનો પુરાવો (કોઈપણ એક)' 
        : isHi ? 'जन्म तिथि का प्रमाण (कोई एक)' 
        : 'Proof of Date of Birth (DOB) (Any One)',
      mandatory: true,
      options: isKn ? [
        'ಜನನ ಮತ್ತು ಮರಣಗಳ ನೋಂದಣಿದಾರರಿಂದ ನೀಡಲಾದ ಜನನ ಪ್ರಮಾಣಪತ್ರ',
        'ಪೂರ್ಣ ದಿನಾಂಕದೊಂದಿಗೆ ಆಧಾರ್ ಕಾರ್ಡ್ / ಇ-ಆಧಾರ್ (DD/MM/YYYY)',
        '10 ನೇ ತರಗತಿ ಶಾಲಾ ಬಿಡುವ ಪ್ರಮಾಣಪತ್ರ / ಮೆಟ್ರಿಕ್ಯುಲೇಶನ್ ಪ್ರಮಾಣಪತ್ರ',
        'ಆದಾಯ ತೆರಿಗೆ ಇಲಾಖೆ ನೀಡಿದ ಪ್ಯಾನ್ ಕಾರ್ಡ್'
      ] : isGu ? [
        'મ્યુનિસિપલ સત્તામંડળ દ્વારા જારી કરાયેલ જન્મ પ્રમાણપત્ર',
        'સંપૂર્ણ જન્મ તારીખ સાથેનું આધાર કાર્ડ / ઇ-આધાર',
        '10મું ધોરણ સ્કૂલ લિવિંગ સર્ટિફિકેટ / મેટ્રિક પ્રમાણપત્ર',
        'આવકવેરા વિભાગ દ્વારા જારી કરાયેલ પાન કાર્ડ'
      ] : isHi ? [
        'नगर निगम / जन्म एवं मृत्यु रजिस्ट्रार द्वारा जारी जन्म प्रमाण पत्र',
        'पूर्ण जन्मतिथि युक्त आधार कार्ड / ई-आधार (DD/MM/YYYY)',
        '10वीं कक्षा स्कूल छोड़ने का प्रमाण पत्र / मैट्रिकुलेशन प्रमाण पत्र',
        'आयकर विभाग द्वारा जारी पैन कार्ड'
      ] : [
        'Birth Certificate issued by Registrar of Births & Deaths / Municipal Corporation',
        'Aadhaar Card / e-Aadhaar with complete DD/MM/YYYY',
        'Secondary School Leaving Certificate (SSLC) / Matriculation Certificate',
        'PAN Card issued by Income Tax Department'
      ]
    },
    {
      category: isKn 
        ? 'ನಾನ್-ಇಸಿಆರ್ ಪುರಾವೆ (ವಲಸೆ ತಪಾಸಣೆ ಅಗತ್ಯವಿಲ್ಲ)' 
        : isGu ? 'નોન-ECR પુરાવો (ઈમિગ્રેશન ચેક જરૂરી નથી)' 
        : isHi ? 'नॉन-ईसीआर प्रमाण (उत्प्रवास जांच आवश्यक नहीं)' 
        : 'Non-ECR Proof (Emigration Check Not Required)',
      mandatory: true,
      options: isKn ? [
        '10 ನೇ ತರಗತಿ / ಮೆಟ್ರಿಕ್ಯುಲೇಶನ್ ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣಪತ್ರ',
        'ಉನ್ನತ ಮಾಧ್ಯಮಿಕ / ಡಿಪ್ಲೊಮಾ / ವಿಶ್ವವಿದ್ಯಾಲಯ ಪದವಿ ಪ್ರಮಾಣಪತ್ರ',
        'ಆದಾಯ ತೆರಿಗೆ ಮೌಲ್ಯಮಾಪನ ಆದೇಶ / ವೃತ್ತಿಪರ ತೆರಿಗೆ ರಸೀದಿ'
      ] : isGu ? [
        '10મું ધોરણ / મેટ્રિક્યુલેશન પાસ પ્રમાણપત્ર',
        'ઉચ્ચતર માધ્યમિક / ડિપ્લોમા / ડિગ્રી સર્ટિફિકેટ',
        'આવકવેરા આકારણી હુકમ'
      ] : isHi ? [
        '10वीं कक्षा / मैट्रिकुलेशन उत्तीर्ण प्रमाण पत्र',
        'उच्चतर माध्यमिक / डिप्लोमा / विश्वविद्यालय डिग्री प्रमाण पत्र',
        'आयकर निर्धारण आदेश'
      ] : [
        '10th Standard / Matriculation Passing Certificate',
        'Higher Secondary / Diploma / University Degree Certificate',
        'Income Tax Assessment Order / Professional Tax Receipts (if applicable)'
      ]
    }
  ];

  return { labels, docs };
};

export const getLocalizedFeeCalc = (lang = 'en') => {
  const isKn = lang === 'kn';
  const isGu = lang === 'gu';
  const isHi = lang === 'hi';

  return {
    serviceCategoryLabel: isKn ? 'ಅರ್ಜಿ ಸೇವಾ ವರ್ಗ' : isGu ? 'અરજી સેવા શ્રેણી' : isHi ? 'आवेदन सेवा श्रेणी' : 'Application Service Category',
    selectServicePrompt: isKn ? 'ಸೇವಾ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' : isGu ? 'સેવા પ્રકાર પસંદ કરો' : isHi ? 'सेवा प्रकार चुनें' : 'Select service type',
    freshOption: isKn ? 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್ (ಮೊದಲ ಬಾರಿಗೆ)' : isGu ? 'નવો પાસપોર્ટ (પ્રથમ અરજદાર)' : isHi ? 'नया पासपोर्ट (प्रथम आवेदक)' : 'Fresh Passport (First-time Applicant)',
    reissueOption: isKn ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ನವೀಕರಣ / ಮರು-ವಿತರಣೆ' : isGu ? 'પાસપોર્ટ રિન્યુઅલ' : isHi ? 'पासपोर्ट नवीनीकरण' : 'Re-issue of Passport',
    pccOption: isKn ? 'ಪೊಲೀಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಪ್ರಮಾಣಪತ್ರ (PCC)' : isGu ? 'પોલીસ ક્લિયરન્સ સર્ટિફિકેટ (PCC)' : isHi ? 'पुलिस क्लीयरेंस सर्टिफिकेट (PCC)' : 'Police Clearance Certificate (PCC)',
    
    ageGroupLabel: isKn ? 'ಅರ್ಜಿದಾರರ ವಯೋಮಿತಿ' : isGu ? 'અરજદારની વય શ્રેણી' : isHi ? 'आवेदक आयु वर्ग' : 'Applicant Age Group',
    adultOption: isKn ? 'ವಯಸ್ಕರು (18 ರಿಂದ 59 ವರ್ಷ)' : isGu ? 'પુખ્ત (18 થી 59 વર્ષ)' : isHi ? 'वयस्क (18 से 59 वर्ष)' : 'Adult (18 to 59 years)',
    minorOption: isKn ? 'ಅಪ್ರಾಪ್ತರು (18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)' : isGu ? 'સગીર (18 વર્ષથી ઓછી)' : isHi ? 'नाबालिग (18 वर्ष से कम)' : 'Minor (Below 18 years)',
    seniorOption: isKn ? 'ಹಿರಿಯ ನಾಗರಿಕರು (60+ ವರ್ಷ)' : isGu ? 'વરિષ્ઠ નાગરિક (60+ વર્ષ)' : isHi ? 'वरिष्ठ नागरिक (60+ वर्ष)' : 'Senior Citizen (60+ years)',

    bookletSizeLabel: isKn ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ಬುಕ್‌ಲೆಟ್ ಪುಟಗಳು' : isGu ? 'પાસપોર્ટ પુસ્તિકા કદ' : isHi ? 'पासपोर्ट पुस्तिका आकार' : 'Passport Booklet Size',
    pages36: isKn ? 'ಪ್ರಮಾಣಿತ ಬುಕ್‌ಲೆಟ್ (36 ಪುಟಗಳು)' : isGu ? 'સામાન્ય પુસ્તિકા (36 પાના)' : isHi ? 'मानक पुस्तिका (36 पृष्ठ)' : 'Standard Booklet (36 Pages)',
    pages60: isKn ? 'ಜಂಬೋ ಬುಕ್‌ಲೆಟ್ (60 ಪುಟಗಳು)' : isGu ? 'જમ્બો પુસ્તિકા (60 પાના)' : isHi ? 'जंबो पुस्तिका (60 पृष्ठ)' : 'Jumbo Booklet (60 Pages)',

    schemeLabel: isKn ? 'ಅಗತ್ಯವಿರುವ ಪ್ರಕ್ರಿಯೆ ಯೋಜನೆ' : isGu ? 'જરૂરી પ્રક્રિયા યોજના' : isHi ? 'आवश्यक प्रसंस्करण योजना' : 'Required Processing Scheme',
    normalScheme: isKn ? 'ಸಾಮಾನ್ಯ ಯೋಜನೆ' : isGu ? 'સામાન્ય યોજના' : isHi ? 'सामान्य योजना' : 'Normal Scheme',
    normalDesc: isKn ? 'ಸಾಮಾನ್ಯ ಪ್ರಕ್ರಿಯೆ (15-20 ದಿನಗಳು)' : isGu ? 'સામાન્ય પ્રક્રિયા (15-20 દિવસ)' : isHi ? 'मानक प्रसंस्करण (15-20 दिन)' : 'Standard processing (15–20 days)',
    tatkaalScheme: isKn ? 'ತತ್ಕಾಲ್ ಯೋಜನೆ (+₹2,000)' : isGu ? 'તત્કાલ યોજના (+₹2,000)' : isHi ? 'तत्काल योजना (+₹2,000)' : 'Tatkaal Scheme (+₹2,000)',
    tatkaalDesc: isKn ? 'ತುರ್ತು ಪ್ರಕ್ರಿಯೆ (1-3 ದಿನಗಳು)' : isGu ? 'તાકીદની પ્રક્રિયા (1-3 દિવસ)' : isHi ? 'त्वरित प्रसंस्करण (1-3 दिन)' : 'Urgent processing (1–3 days)',

    estimatedSummary: isKn ? 'ಅಂದಾಜು ಶುಲ್ಕ ಸಾರಾಂಶ' : isGu ? 'અંદાજિત ફી સારાંશ' : isHi ? 'अनुमानित शुल्क सारांश' : 'Estimated Fee Summary',
    scheduleTariff: isKn ? 'ಅನುಸೂಚಿ IV ದರ' : isGu ? 'શેડ્યૂલ IV ટેરિફ' : isHi ? 'अनुसूची IV दर' : 'Schedule IV Tariff',
    baseFeeLabel: isKn ? 'ಮೂಲ ಅರ್ಜಿ ಶುಲ್ಕ' : isGu ? 'મૂળ અરજી ફી' : isHi ? 'मूल आवेदन शुल्क' : 'Base Application Fee',
    tatkaalFeeLabel: isKn ? 'ತತ್ಕಾಲ್ ತುರ್ತು ಸರ್ಚಾರ್ಜ್' : isGu ? 'તત્કાલ સરચાર્જ' : isHi ? 'तत्काल अधिभार' : 'Tatkaal Expedited Surcharge',
    concessionLabel: isKn ? 'ಕಾನೂನುಬದ್ಧ ರಿಯಾಯಿತಿ (10%)' : isGu ? 'સરકારી છૂટછાટ (10%)' : isHi ? 'वैधानिक छूट (10%)' : 'Statutory Concession (10%)',
    totalPayableLabel: isKn ? 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ' : isGu ? 'કુલ ચૂકવવાપાત્ર રકમ' : isHi ? 'कुल देय राशि' : 'Total Amount Payable',
    proceedApplyBtn: isKn ? 'ಈ ಶುಲ್ಕದೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ →' : isGu ? 'આ ફી સાથે અરજી કરો →' : isHi ? 'इस शुल्क के साथ आवेदन करें →' : 'Proceed to Apply with This Fee →',
    paymentNotice: isKn 
      ? 'ಎಸ್.ಬಿ.ಐ ಇಂಟರ್ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್, ಡೆಬಿಟ್/ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್, ಯುಪಿಐ ಅಥವಾ ನಗದು ಚಲನ್ ಮೂಲಕ ಪಾವತಿಸಬಹುದು.'
      : isGu ? 'SBI ઇન્ટરનેટ બેંકિંગ, ક્રેડિટ/ડેબિટ કાર્ડ્સ, UPI અથવા બેંક ચલણ દ્વારા ઓનલાઇન ચુકવણી કરી શકાય છે.'
      : isHi ? 'एसबीआई इंटरनेट बैंकिंग, क्रेडिट/डेबिट कार्ड, यूपीआई या चालान द्वारा भुगतान किया जा सकता है।'
      : 'Statutory payment can be completed online via SBI Internet Banking, Credit/Debit cards, UPI, or through SBI Bank Challan at any branch nationwide.'
  };
};

export const getLocalizedAnnouncements = (lang = 'en') => {
  const isKn = lang === 'kn';
  const isGu = lang === 'gu';
  const isHi = lang === 'hi';

  return {
    activeBadge: isKn ? '● ಸಕ್ರಿಯ ಪ್ರಕಟಣೆ' : isGu ? '● સક્રિય જાહેરાત' : isHi ? '● सक्रिय सूचना' : '● Active Announcement',
    archivedBadge: isKn ? 'ಸಂಗ್ರಹಿಸಲಾಗಿದೆ (ಕಾರ್ಯಕ್ರಮ ಮುಕ್ತಾಯ)' : isGu ? 'આર્કાઇવ કરેલ (ઇવેન્ટ પૂર્ણ)' : isHi ? 'अभिलेखागार (समाप्त)' : 'Archived (Event Concluded)',
    jurisdictionLabel: isKn ? 'ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ:' : isGu ? 'અધિકારક્ષેત્ર:' : isHi ? 'अधिकार क्षेत्र:' : 'Jurisdiction:',
    statusLabel: isKn ? 'ಸ್ಥಿತಿ:' : isGu ? 'સ્થિતિ:' : isHi ? 'स्थिति:' : 'Status:',
    activeNotices: [
      {
        id: 1,
        title: isKn 
          ? 'ವಿಶೇಷ ಶನಿವಾರದ ಪಾಸ್‌ಪೋರ್ಟ್ ಸಂಸ್ಕರಣಾ ಶಿಬಿರಗಳು'
          : isGu ? 'વિશેષ શનિવાર પાસપોર્ટ પ્રોસેસિંગ કેમ્પ'
          : isHi ? 'विशेष शनिवार पासपोर्ट प्रोसेसिंग शिविर'
          : 'Special Saturday Passport Processing Camps',
        rpo: isKn ? 'ಮುಂಬೈ, ಪುಣೆ ಮತ್ತು ಬೆಂಗಳೂರು ಆರ್‌ಪಿಒಗಳು' : isGu ? 'મુંબઈ, પુણે અને બેંગલુરુ RPO' : 'Mumbai, Pune & Bengaluru RPOs',
        published: '20 October 2026',
        validTill: isKn ? '30 ನವೆಂಬರ್ 2026 ರವರೆಗೆ ಸಕ್ರಿಯವಾಗಿದೆ' : isGu ? '30 નવેમ્બર 2026 સુધી સક્રિય' : isHi ? '30 नवंबर 2026 तक सक्रिय' : 'Active until 30 November 2026',
        desc: isKn
          ? 'ವೃತ್ತಿಪರರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅನುಕೂಲವಾಗುವಂತೆ ಆಯ್ದ ಕೇಂದ್ರಗಳು ಪರ್ಯಾಯ ಶನಿವಾರದಂದು ತೆರೆದಿರುತ್ತವೆ. ಆನ್‌ಲೈನ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಡ್ಡಾಯ.'
          : isGu ? 'કામકાજી વ્યાવસાયિકો અને વિદ્યાર્થીઓ માટે પસંદગીના કેન્દ્રો વૈકલ્પિક શનિવારે ચાલુ રહેશે. ઓનલાઇન એપોઇન્ટમેન્ટ ફરજિયાત.'
          : isHi ? 'कार्यरत पेशेवरों एवं छात्रों की सुविधा हेतु चयनित केंद्र शनिवार को खुलेंगे। ऑनलाइन अपॉइंटमेंट अनिवार्य है।'
          : 'To facilitate working professionals and students, select Passport Seva Kendras will operate on alternate Saturdays. Online appointment booking mandatory.',
        status: 'active'
      },
      {
        id: 2,
        title: isKn
          ? 'ಅನಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಕುರಿತು ಎಚ್ಚರಿಕೆ ಸಲಹೆ'
          : isGu ? 'બિન-સત્તાવાર વેબસાઇટ્સ અંગે સાવચેતી સલાહ'
          : isHi ? 'अनधिकृत / फर्जी वेबसाइटों से सावधान रहने की सलाह'
          : 'Advisory on Non-Official / Lookalike Websites',
        rpo: isKn ? 'ಅಖಿಲ ಭಾರತ ಪಿಎಸ್‌ಕೆಗಳು' : isGu ? 'ઓલ ઇન્ડિયા PSK' : 'All India PSKs',
        published: '15 October 2026',
        validTill: isKn ? 'ಶಾಶ್ವತ ನಾಗರಿಕ ಸಲಹೆ' : isGu ? 'કાયમી નાગરિક સલાહ' : isHi ? 'स्थायी नागरिक परामर्श' : 'Permanent Citizen Advisory',
        desc: isKn
          ? 'ಅನಧಿಕೃತ ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಏಜೆನ್ಸಿಗಳ ವಿರುದ್ಧ ನಾಗರಿಕರಿಗೆ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ. ಎಲ್ಲಾ ಸೇವೆಗಳು passportindia.gov.in ಮೂಲಕವೇ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಡೆಯುತ್ತವೆ.'
          : isGu ? 'અનધિકૃત એજન્સીઓથી સાવચેત રહો. તમામ સેવાઓ માત્ર passportindia.gov.in દ્વારા જ સંચાલિત થાય છે.'
          : isHi ? 'अनधिकृत एजेंसियों से सावधान रहें। सभी आवेदन केवल passportindia.gov.in के माध्यम से ही करें।'
          : 'Applicants are cautioned against unauthorized third-party agencies charging arbitrary fees. All appointment scheduling is conducted strictly via passportindia.gov.in.',
        status: 'active'
      }
    ],
    archivedNotices: [
      {
        id: 3,
        title: isKn ? 'ಮೊಬೈಲ್ ವ್ಯಾನ್ ಶಿಬಿರ - ವಿಜಯ ಕ್ರಾಸ್ ರಸ್ತೆ' : 'Mobile Passport Van Camp at PSK Vijay Cross Road',
        rpo: 'Ahmedabad Jurisdiction',
        published: '21 July 2026',
        validTill: 'Concluded on 24 July 2026',
        desc: 'Special van camp operations completed. All records migrated to RPO Ahmedabad.',
        status: 'archived'
      },
      {
        id: 4,
        title: isKn ? 'ಪರಿಷ್ಕೃತ ಶುಲ್ಕ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆ' : 'Revised Passport Fee Notification (Historical Gazette)',
        rpo: 'National CPV Division',
        published: '1 July 2025',
        validTill: 'Superseded by Schedule IV',
        desc: 'Schedule IV fee adjustments completed. Current fees are now calculated live via the interactive portal calculator.',
        status: 'archived'
      }
    ]
  };
};

export const getLocalizedFaqs = (lang = 'en') => {
  const isKn = lang === 'kn';
  const isGu = lang === 'gu';
  const isHi = lang === 'hi';

  const categories = isKn ? [
    'ಎಲ್ಲವೂ',
    'ಅರ್ಜಿ ಮತ್ತು ಫಾರ್ಮ್',
    'ತತ್ಕಾಲ್ ಯೋಜನೆ',
    'ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ',
    'ಶುಲ್ಕ ಮತ್ತು ಪಾವತಿ',
    'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
    'ದಾಖಲೆಗಳು ಮತ್ತು ನಿಯಮಗಳು'
  ] : isGu ? [
    'બધા',
    'અરજી અને ફોર્મ',
    'તત્કાલ યોજના',
    'પોલીસ ચકાસણી',
    'ફી અને ચુકવણી',
    'એપોઇન્ટમેન્ટ્સ',
    'દસ્તાવેજો અને નિયમો'
  ] : isHi ? [
    'सभी',
    'आवेदन एवं फॉर्म',
    'तत्काल योजना',
    'पुलिस सत्यापन',
    'शुल्क एवं भुगतान',
    'अपॉइंटमेंट',
    'दस्तावेज़ एवं नियम'
  ] : [
    'All',
    'Application & Form',
    'Tatkaal Scheme',
    'Police Verification',
    'Fees & Payment',
    'Appointments & Slots',
    'Documents & Rules'
  ];

  const faqs = [
    {
      id: 1,
      category: isKn ? 'ದಾಖಲೆಗಳು ಮತ್ತು ನಿಯಮಗಳು' : isGu ? 'દસ્તાવેજો અને નિયમો' : isHi ? 'दस्तावेज़ एवं नियम' : 'Documents & Rules',
      question: isKn
        ? 'ವಯಸ್ಕರಿಗೆ ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?'
        : isGu ? 'પુખ્ત વયના વ્યક્તિ માટે નવા પાસપોર્ટ માટે કયા દસ્તાવેજો જરૂરી છે?'
        : isHi ? 'वयस्क के नए पासपोर्ट हेतु कौन से दस्तावेज़ आवश्यक हैं?'
        : 'What documents are required to apply for a Fresh Passport for an Adult?',
      answer: isKn
        ? `ಅರ್ಜಿದಾರರಿಗೆ ಕೇವಲ ಮೂರು ಮುಖ್ಯ ದಾಖಲೆಗಳು ಬೇಕಾಗುತ್ತವೆ:
1. ಪ್ರಸ್ತುತ ವಸತಿ ವಿಳಾಸದ ಪುರಾವೆ: ಆಧಾರ್ ಕಾರ್ಡ್, ಫೋಟೋ ಹೊಂದಿರುವ ಸಕ್ರಿಯ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್, ವಿದ್ಯುತ್/ನೀರು ಬಿಲ್ ಅಥವಾ ನೋಂದಾಯಿತ ಬಾಡಿಗೆ ಒಪ್ಪಂದ.
2. ಹುಟ್ಟಿದ ದಿನಾಂಕದ ಪುರಾವೆ (DOB): ಜನನ ಪ್ರಮಾಣಪತ್ರ, ಆಧಾರ್ ಕಾರ್ಡ್, 10ನೇ ತರಗತಿ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಪ್ಯಾನ್ ಕಾರ್ಡ್.
3. ನಾನ್-ಇಸಿಆರ್ ವರ್ಗದ ಪುರಾವೆ: 10ನೇ ತರಗತಿ ಮೆಟ್ರಿಕ್ಯುಲೇಶನ್ ಅಥವಾ ಪದವಿ ಪ್ರಮಾಣಪತ್ರ.
ಮೂಲ ದಾಖಲೆಗಳೊಂದಿಗೆ ಒಂದು ಸ್ವಯಂ-ದೃಢೀಕರಿಸಿದ ನಕಲು ಪ್ರತಿಯನ್ನು PSK ನಲ್ಲಿ ಹಾಜರುಪಡಿಸಬೇಕು.`
        : isGu ? `અરજદારોને ફક્ત ત્રણ મુખ્ય દસ્તાવેજોની જરૂર છે:
1. રહેઠાણ સરનામાનો પુરાવો: આધાર કાર્ડ, ફોટો સાથેની સક્રિય બેંક પાસબુક, લાઈટ/પાણીનું બિલ.
2. જન્મ તારીખનો પુરાવો: જન્મ પ્રમાણપત્ર, આધાર કાર્ડ, 10મું પ્રમાણપત્ર અથવા પાન કાર્ડ.
3. નોન-ECR પુરાવો: 10મું ધોરણ પાસ પ્રમાણપત્ર.
મૂળ દસ્તાવેજો સાથે સ્વ-પ્રમાણિત નકલ એપોઇન્ટમેન્ટના દિવસે PSK ખાતે રજૂ કરવી આવશ્યક છે.`
        : `Applicants need only three core documents:
1. Proof of Present Residential Address: Aadhaar Card, Active Bank Passbook with photograph, Electricity / Water bill (last 2 months), or Registered Rent Agreement.
2. Proof of Date of Birth (DOB): Birth Certificate issued by municipal authority, Aadhaar Card, 10th Standard School Leaving Certificate, or PAN Card.
3. Proof for Non-ECR Category: 10th standard matriculation pass certificate or degree from a recognized institution.
Original documents along with one self-attested photocopy must be presented on your appointment day at the PSK.`,
      keywords: 'documents address proof dob birth certificate aadhaar pan non-ecr 10th fresh adult ದಾಖಲೆ ವಿಳಾಸ'
    },
    {
      id: 2,
      category: isKn ? 'ತತ್ಕಾಲ್ ಯೋಜನೆ' : isGu ? 'તત્કાલ યોજના' : isHi ? 'तत्काल योजना' : 'Tatkaal Scheme',
      question: isKn
        ? 'ತತ್ಕಾಲ್ ಯೋಜನೆಗೆ ಪ್ರಕ್ರಿಯೆ ಸಮಯ, ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ ಮತ್ತು ನಿಯಮಗಳೇನು?'
        : isGu ? 'તત્કાલ યોજના હેઠળ પ્રોસેસિંગ સમય, સરચાર્જ અને નિયમો શું છે?'
        : isHi ? 'तत्काल योजना के तहत प्रसंस्करण समय, अधिभार और नियम क्या हैं?'
        : 'What is the processing time, surcharge, and document rule for Tatkaal Scheme?',
      answer: isKn
        ? `ತತ್ಕಾಲ್ ಯೋಜನೆಯ ಪ್ರಮುಖ ನಿಯಮಗಳು:
• ವೇಗದ ವಿತರಣೆ: ಪೊಲೀಸ್ ಪರಿಶೀಲನೆಗೆ ಕಾಯದೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದಿನಾಂಕದಿಂದ 1 ರಿಂದ 3 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ರವಾನೆ.
• ಶುಲ್ಕ: ಸಾಮಾನ್ಯ ಅರ್ಜಿ ಶುಲ್ಕಕ್ಕಿಂತ ₹2,000 ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ (36 ಪುಟಗಳ ಬುಕ್‌ಲೆಟ್‌ಗೆ ಒಟ್ಟು ₹3,500).
• ಕಡ್ಡಾಯ ಗುರುತಿನ ಪುರಾವೆ: ಕನಿಷ್ಠ ಎರಡು ಪರಿಶೀಲಿಸಿದ ಸರ್ಕಾರಿ ದಾಖಲೆಗಳು (ಆಧಾರ್ + ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಅಥವಾ ಪ್ಯಾನ್ ಕಾರ್ಡ್).`
        : `Key regulations under the Tatkaal Scheme:
• Fast-Track Turnaround: Processed on high priority and dispatched within 1 to 3 working days from the appointment date without waiting for prior police verification.
• Statutory Tariff: Additional surcharge of ₹2,000 applies over the normal application fee (Total ₹3,500 for a standard 36-page booklet).
• Mandatory Identity Proofs: Applicants must produce at least two verified documents from the government schedule (e.g. Aadhaar Card + Voter ID or PAN Card).`,
      keywords: 'tatkaal tatkal urgent emergency fast fee charge 2000 3500 surcharge days processing ತತ್ಕಾಲ್'
    },
    {
      id: 3,
      category: isKn ? 'ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ' : isGu ? 'પોલીસ ચકાસણી' : isHi ? 'पुलिस सत्यापन' : 'Police Verification',
      question: isKn
        ? 'ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ ಹೇಗೆ ನಡೆಯುತ್ತದೆ ಮತ್ತು ನಾನು ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಭೇಟಿ ನೀಡಬೇಕೇ?'
        : isGu ? 'પોલીસ વેરિફિકેશન કેવી રીતે થાય છે અને શું મારે પોલીસ સ્ટેશન જવું પડે છે?'
        : isHi ? 'पुलिस सत्यापन कैसे होता है और क्या मुझे थाने जाना पड़ेगा?'
        : 'How is Police Verification conducted, and do I need to visit the police station?',
      answer: isKn
        ? `ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ ಪ್ರಕ್ರಿಯೆ:
• PSK ನಲ್ಲಿ ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಂತರ ನಿಮ್ಮ ಫೈಲ್ ಅನ್ನು ಜಿಲ್ಲಾ ಪೊಲೀಸ್ ಅಧೀಕ್ಷಕರ ಕಚೇರಿಗೆ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಆಗಿ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.
• ಪರಿಶೀಲನಾ ಅಧಿಕಾರಿ ನಿಮ್ಮ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ವಿಳಾಸ ಪರಿಶೀಲನೆ ನಡೆಸುತ್ತಾರೆ.
• ಭೇಟಿ ನೀಡುವ ಅಧಿಕಾರಿಗೆ ಯಾವುದೇ ನಗದು ಶುಲ್ಕ ನೀಡಬೇಕಾಗಿಲ್ಲ. ಸ್ಪಷ್ಟವಾಗಿ ಕರೆಯದ ಹೊರತು ನೀವು ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಭೇಟಿ ನೀಡುವ ಅಗತ್ಯವಿಲ್ಲ.`
        : `Police Verification Process:
• After your appointment at the PSK, your file is dispatched electronically to the District Superintendent of Police (SP Office).
• A field police officer will contact you via your registered mobile number for physical address verification.
• In cities enabled with the mPassport Police App, verification is done paperlessly and completed in under 5 days.
• Note: No cash fee is required to be paid to the visiting police officer. You do not need to visit the police station unless explicitly summoned.`,
      keywords: 'police verification pvp thana chowki inspector enquiry mpassport bribe cash fee ಪೊಲೀಸ್'
    },
    {
      id: 4,
      category: isKn ? 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು' : isGu ? 'એપોઇન્ટમેન્ટ્સ' : isHi ? 'अपॉइंटमेंट' : 'Appointments & Slots',
      question: isKn
        ? 'ದೃಢಪಡಿಸಿದ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಅನ್ನು ಎಷ್ಟು ಬಾರಿ ಮರುಹೊಂದಿಸಬಹುದು?'
        : isGu ? 'કન્ફર્મ થયેલ પાસપોર્ટ એપોઇન્ટમેન્ટ કેટલી વાર રીશેડ્યુલ કરી શકાય?'
        : isHi ? 'पुष्टि किए गए अपॉइंटमेंट को कितनी बार पुनर्निर्धारित किया जा सकता है?'
        : 'How many times can I reschedule my confirmed passport appointment?',
      answer: isKn
        ? `ಮರುಹೊಂದಿಸುವ ನಿಯಮಗಳು:
• ಅರ್ಜಿದಾರರು ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ ಪಾವತಿಸದೆ ಶುಲ್ಕ ಪಾವತಿ ದಿನಾಂಕದಿಂದ 12 ತಿಂಗಳೊಳಗೆ 3 ಬಾರಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮರುಹೊಂದಿಸಬಹುದು ಅಥವಾ ರದ್ದುಗೊಳಿಸಬಹುದು.
• ಬುಕ್ ಮಾಡಿದ ಸಮಯಕ್ಕೆ ಕನಿಷ್ಠ 24 ಗಂಟೆಗಳ ಮೊದಲು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಮರುಹೊಂದಿಸಬೇಕು.`
        : `Rescheduling Rules:
• Applicants are entitled to reschedule or cancel a confirmed appointment up to 3 times within 12 months from the original fee payment date without paying any extra charges.
• Rescheduling must be completed online at least 24 hours prior to the original booked slot time.`,
      keywords: 'reschedule cancel appointment slot postpone date change 3 times 12 months ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್'
    },
    {
      id: 5,
      category: isKn ? 'ಶುಲ್ಕ ಮತ್ತು ಪಾವತಿ' : isGu ? 'ફી અને ચુકવણી' : isHi ? 'शुल्क एवं भुगतान' : 'Fees & Payment',
      question: isKn
        ? 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ರದ್ದಾದರೆ ಅಥವಾ ವಿಳಂಬವಾದರೆ ಶುಲ್ಕ ಮರುಪಾವತಿಸಲಾಗುತ್ತದೆಯೇ?'
        : isGu ? 'જો મારી એપોઇન્ટમેન્ટ વિલંબિત કે રદ થાય તો શું ફી રિફંડ મળે?'
        : isHi ? 'क्या अपॉइंटमेंट रद्द होने पर पासपोर्ट शुल्क वापस मिलता है?'
        : 'Is the passport fee refundable if my appointment is delayed or cancelled?',
      answer: isKn
        ? `ಶುಲ್ಕ ಸಿಂಧುತ್ವ ಮತ್ತು ಮರುಪಾವತಿ ನಿಯಮಗಳು:
• ಪಾವತಿಸಿದ ಅರ್ಜಿ ಶುಲ್ಕವು ಪಾವತಿ ರಶೀದಿಯ ದಿನಾಂಕದಿಂದ 365 ದಿನಗಳವರೆಗೆ (ಒಂದು ವರ್ಷ) ಮಾನ್ಯವಾಗಿರುತ್ತದೆ.
• ಈ 1 ವರ್ಷದ ಅವಧಿಯಲ್ಲಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮರುಹೊಂದಿಸಬಹುದು.
• ಪಾಸ್‌ಪೋರ್ಟ್ ನಿಯಮಗಳು 1980 ರ ನಿಯಮ 12 ರ ಪ್ರಕಾರ, ಸರ್ಕಾರಿ ಶುಲ್ಕವನ್ನು ಮರುಪಾವತಿಸಲಾಗುವುದಿಲ್ಲ (ತಾಂತ್ರಿಕ ಬ್ಯಾಂಕಿಂಗ್ ದೋಷದ ಸಂದರ್ಭದಲ್ಲಿ ಹೊರತುಪಡಿಸಿ).`
        : `Fee Validity & Refund Policy:
• Application fees paid remain valid for 365 days (one full calendar year) from the payment receipt date.
• You can reuse the payment receipt to book appointments within this 1-year window.
• Once paid, statutory government fees are non-refundable as per Rule 12 of the Passports Rules, 1980, unless a duplicate transaction occurred due to technical banking failure.`,
      keywords: 'fee refund money back cancel payment sbi epay validity 1 year 365 days ಶುಲ್ಕ ಮರುಪಾವತಿ'
    },
    {
      id: 6,
      category: isKn ? 'ಅರ್ಜಿ ಮತ್ತು ಫಾರ್ಮ್' : isGu ? 'અરજી અને ફોર્મ' : isHi ? 'आवेदन एवं फॉर्म' : 'Application & Form',
      question: isKn
        ? 'ಸಾಮಾನ್ಯ, ಅಧಿಕೃತ ಮತ್ತು ರಾಜತಾಂತ್ರಿಕ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?'
        : isGu ? 'સામાન્ય, સત્તાવાર અને રાજદ્વારી પાસપોર્ટ વચ્ચે શું તફાવત છે?'
        : isHi ? 'साधारण, आधिकारिक और राजनयिक पासपोर्ट में क्या अंतर है?'
        : 'What is the difference between Ordinary, Official, and Diplomatic Passports?',
      answer: isKn
        ? `ಭಾರತೀಯ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳ ವರ್ಗೀಕರಣ:
• ಸಾಮಾನ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್ (ಟೈಪ್ ಪಿ, ನೀಲಿ ಕವರ್): ಸಾಮಾನ್ಯ ನಾಗರಿಕರಿಗೆ ವೈಯಕ್ತಿಕ, ವ್ಯಾಪಾರ, ರಜೆ ಅಥವಾ ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕಾಗಿ ನೀಡಲಾಗುತ್ತದೆ.
• ಅಧಿಕೃತ ಪಾಸ್‌ಪೋರ್ಟ್ (ಟೈಪ್ ಎಸ್, ಬಿಳಿ ಕವರ್): ಸರ್ಕಾರಿ ಕರ್ತವ್ಯದ ಮೇರೆಗೆ ವಿದೇಶಕ್ಕೆ ಪ್ರಯಾಣಿಸುವ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳಿಗೆ ನೀಡಲಾಗುತ್ತದೆ.
• ರಾಜತಾಂತ್ರಿಕ ಪಾಸ್‌ಪೋರ್ಟ್ (ಟೈಪ್ ಡಿ, ಮೆರೂನ್ ಕವರ್): ರಾಜತಾಂತ್ರಿಕರು ಮತ್ತು ಸಚಿವರಿಗೆ ರಾಜತಾಂತ್ರಿಕ ಕಾರ್ಯಗಳಿಗಾಗಿ ನವದೆಹಲಿಯ CPV ವಿಭಾಗದಿಂದ ನೀಡಲಾಗುತ್ತದೆ.`
        : `Classification of Indian Passports:
• Ordinary Passport (Type P, Deep Navy Blue Cover): Issued to general citizens for personal travel, business, vacation, or education.
• Official Passport (Type S, White Cover): Issued to designated government officials travelling on official sovereign state duty.
• Diplomatic Passport (Type D, Maroon Cover): Issued to diplomats and ministers through CPV Division, New Delhi.`,
      keywords: 'types blue white maroon official diplomatic ordinary passport p s d cpv delhi ಪಾಸ್‌ಪೋರ್ಟ್ ಪ್ರಕಾರಗಳು'
    },
    {
      id: 7,
      category: isKn ? 'ದಾಖಲೆಗಳು ಮತ್ತು ನಿಯಮಗಳು' : isGu ? 'દસ્તાવેજો અને નિયમો' : isHi ? 'दस्तावेज़ एवं नियम' : 'Documents & Rules',
      question: isKn
        ? 'ಅಪ್ರಾಪ್ತ ವಯಸ್ಕರ (18 ವರ್ಷದೊಳಗಿನ) ಪಾಸ್‌ಪೋರ್ಟ್‌ಗೆ ನಿಯಮಗಳು ಮತ್ತು ಸಮ್ಮತಿ ಯಾವುದು?'
        : isGu ? 'સગીર વયના બાળકોના પાસપોર્ટ માટે કયા નિયમો અને સંમતિ જરૂરી છે?'
        : isHi ? 'नाबालिगों (18 वर्ष से कम) के पासपोर्ट हेतु क्या नियम व सहमति आवश्यक है?'
        : 'What are the rules and consent requirements for Minor Passports (Under 18)?',
      answer: isKn
        ? `ಅಪ್ರಾಪ್ತರ ಪಾಸ್‌ಪೋರ್ಟ್ ಮಾರ್ಗಸೂಚಿಗಳು:
• ಸಿಂಧುತ್ವ: 5 ವರ್ಷಗಳವರೆಗೆ ಅಥವಾ ಮಗುವಿಗೆ 18 ವರ್ಷ ತುಂಬುವವರೆಗೆ, ಯಾವುದು ಮೊದಲೋ ಅದು.
• ರಿಯಾಯಿತಿ: ಮೂಲ ಶುಲ್ಕದಲ್ಲಿ 10% ಶಾಸನಬದ್ಧ ರಿಯಾಯಿತಿ ಅನ್ವಯಿಸುತ್ತದೆ.
• ಪೋಷಕರ ಸಮ್ಮತಿ: ಇಬ್ಬರೂ ಪೋಷಕರು ಅನುಬಂಧ 'D' ಗೆ ಸಹಿ ಮಾಡಬೇಕು.
• ಜೊತೆಯಲ್ಲಿ ಬರುವುದು: ಪೋಷಕರಲ್ಲಿ ಒಬ್ಬರು ತಮ್ಮ ಮೂಲ ಪಾಸ್‌ಪೋರ್ಟ್‌ನೊಂದಿಗೆ ಮಗುವಿನ ಜೊತೆಗೆ PSK ಗೆ ಬರಬೇಕು.`
        : `Minors Passport Guidelines:
• Validity: Valid for 5 years or until the child turns 18 years of age, whichever is earlier.
• Concession: 10% statutory concession applies to base fees.
• Parental Consent: Both parents must sign Annexure 'D'.
• Accompaniment: Either parent must accompany the minor with their original passport to the PSK.`,
      keywords: 'minor child baby kid son daughter under 18 annexure d consent 5 years ಅಪ್ರಾಪ್ತ ಮಕ್ಕಳು'
    },
    {
      id: 8,
      category: isKn ? 'ಅರ್ಜಿ ಮತ್ತು ಫಾರ್ಮ್' : isGu ? 'અરજી અને ફોર્મ' : isHi ? 'आवेदन एवं फॉर्म' : 'Application & Form',
      question: isKn
        ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ಕಳೆದುಹೋದರೆ ಅಥವಾ ಹಾನಿಗೊಳಗಾದರೆ ನಾನು ಏನು ಮಾಡಬೇಕು?'
        : isGu ? 'જો મારો પાસપોર્ટ ખોવાઈ જાય અથવા ડેમેજ થાય તો શું કરવું?'
        : isHi ? 'यदि मेरा पासपोर्ट खो जाए या क्षतिग्रस्त हो जाए तो मुझे क्या करना चाहिए?'
        : 'What should I do if my passport is lost, stolen, or damaged?',
      answer: isKn
        ? `ಕಳೆದುಹೋದ / ಹಾನಿಗೊಳಗಾದ ಪಾಸ್‌ಪೋರ್ಟ್ ಪ್ರಕ್ರಿಯೆ:
1. ತಕ್ಷಣವೇ ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆಯಲ್ಲಿ ಅಥವಾ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ದೂರು (FIR) ದಾಖಲಿಸಿ.
2. 'ಕಳೆದುಹೋದ / ಹಾನಿಗೊಳಗಾದ ಪಾಸ್‌ಪೋರ್ಟ್' ವರ್ಗದ ಅಡಿಯಲ್ಲಿ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ 'ಪಾಸ್‌ಪೋರ್ಟ್ ಮರು-ವಿತರಣೆ'ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.
3. ಅನುಬಂಧ 'F' ಜೊತೆಗೆ ನಷ್ಟದ ವಿವರಗಳ ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸಿ.`
        : `Lost / Damaged Passport Procedure:
1. Immediately lodge a police report (FIR) at the local police station or police portal.
2. Apply online for 'Re-issue of Passport' under category 'Lost / Damaged Passport'.
3. Submit an affidavit detailing how the loss occurred along with Annexure 'F'.`,
      keywords: 'lost stolen damaged torn water theft misplaced fir affidavit replacement fee ಕಳೆದುಹೋದ'
    }
  ];

  return { categories, faqs };
};
