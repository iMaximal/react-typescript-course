require('dotenv').config();

const fs = require('fs');
const path = require('path');
const TJO = require('translate-json-object')();

// Choose the service to use google/yandex,
// if you provide both yandex will be used as the default
TJO.init({
  googleApiKey: process.env.GOOGLE_API_KEY,
  yandexApiKey: process.env.YANDEX_API_KEY
});

const LANGUAGE = 'ru';

const input = require(path.join(__dirname, '../src/assets/translations/en.json'));
const outputPath = (lang) => path.join(__dirname, `../src/assets/translations/${lang}.json`);


// Translate method takes (source object, and language code)
TJO.translate(input, LANGUAGE)
  .then(function (data) {
    console.log('data', data);
    const output = JSON.stringify(data, null, '  ');

    fs.writeFile(outputPath(LANGUAGE), output, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch(function (err) {
    console.log('error ', err);
  });
