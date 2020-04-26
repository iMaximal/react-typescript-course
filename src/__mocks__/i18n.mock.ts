import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@translations/en.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  initImmediate: false,
  nsSeparator: false,
  keySeparator: '.',
  resources: {
    en: {
      translation: en,
    },
    ru: {},
  },
})

export default i18n
