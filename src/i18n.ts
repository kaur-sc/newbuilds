import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    ns: ['la-vista-boulevard'], // Namespaces to load
    defaultNS: 'la-vista-boulevard',
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    backend: {
      loadPath: '/src/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
    react: {
        useSuspense: true,
    }
  });

export default i18n;
