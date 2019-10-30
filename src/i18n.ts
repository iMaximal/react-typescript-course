import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import i18nextXhrBackend from 'i18next-xhr-backend'
import i18nextBrowserLanguagedetector from 'i18next-browser-languagedetector'

const backendOptions = {
  // path where resources get loaded from, or a function
  // returning a path:
  // function(lngs, namespaces) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  loadPath: '/translations/{{lng}}.json',

  // allow cross domain requests
  crossDomain: true,
}

const detectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'subdomain'],

  // keys or params to lookup language from
  // append ?lng=LANGUAGE to URL
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
}

i18next
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(i18nextXhrBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(i18nextBrowserLanguagedetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: backendOptions,
    detection: detectorOptions,
    fallbackLng: 'en',
    nsSeparator: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18next
