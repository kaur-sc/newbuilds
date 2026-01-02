import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Directly import translations to bundle them for static sites
import enCostaBlancaLegacy from "./locales/en/costa-blanca.json";
import frCostaBlancaLegacy from "./locales/fr/costa-blanca.json";
import enCostaBlancaNew from "./locales/en/new-build-golf-properties-costa-blanca.json";
import frCostaBlancaNew from "./locales/fr/new-build-golf-properties-costa-blanca.json";

const resources = {
  en: {
    'costa-blanca': enCostaBlancaLegacy,
    'new-build-golf-properties-costa-blanca': enCostaBlancaNew
  },
  fr: {
    'costa-blanca': frCostaBlancaLegacy,
    'new-build-golf-properties-costa-blanca': frCostaBlancaNew
  },
};

export const i18nPromise = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    ns: ['costa-blanca', 'new-build-golf-properties-costa-blanca'],
    defaultNS: 'new-build-golf-properties-costa-blanca',
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    react: {
        useSuspense: true,
    }
  });

export default i18n;
