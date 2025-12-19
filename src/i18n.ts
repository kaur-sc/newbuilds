import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Directly import translations to bundle them for static sites
import enLVB from './locales/en/la-vista-boulevard.json';

const resources = {
  en: {
    'la-vista-boulevard': enLVB,
  },
};

export const i18nPromise = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['la-vista-boulevard'],
    defaultNS: 'la-vista-boulevard',
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    react: {
        useSuspense: true,
    }
  });

export default i18n;
