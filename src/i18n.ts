import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Directly import translations to bundle them for static sites
import enCostaBlanca from './locales/en/costa-blanca.json';
import frCostaBlanca from './locales/fr/costa-blanca.json';

const resources = {
  en: {
    'costa-blanca': enCostaBlanca,
  },
  fr: {
    'costa-blanca': frCostaBlanca,
  },
};

export const i18nPromise = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    ns: ['costa-blanca'],
    defaultNS: 'costa-blanca',
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    react: {
        useSuspense: true,
    }
  });

export default i18n;
