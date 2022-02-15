import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import axios from "axios";
import papa from "papaparse";

const _resources = {};

axios
  .get(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJkTChP7jo0FdCOitgHpZjA5X95SlHrHHSW3401fbJB74vsKiKfWAZBDhHpnINo-UbcQtOztPgqLMa/pub?output=csv"
  )
  .then((response) => {
    const parseCsvInfos = papa.parse(response.data);

    const languages = parseCsvInfos.data[0].filter(
      (parseCsvInfo, index) => index !== 0
    );

    const languageKeyValues = parseCsvInfos.data
      .filter((parseCsvInfo, index) => index !== 0)
      .map((parseInfos) => {
        return {
          key: parseInfos[0],
          values: parseInfos.filter(
            (parseInfo, parseInfoIndex) => parseInfoIndex !== 0
          ),
        };
      });

    const _resources = {};

    languages.forEach((language, languageIndex) => {
      _resources[language] = {
        translation: {
          description: {},
        },
      };
      languageKeyValues.forEach((languageKeyValue) => {
        languageKeyValue.values.forEach((value, valueIndex) => {
          if (languageIndex === valueIndex) {
            _resources[language]["translation"]["description"][
              languageKeyValue.key
            ] = value;
          }
        });
      });
    });
  });

const _resourcesO = {
  en: {
    translation: {
      description: {
        // here we will place our translations...
        part1: "test-part1",
        part2: "test-part2",
      },
    },
  },
  zh: {
    translation: {
      description: {
        // here we will place our translations...
        part1: "測試-一區",
        part2: "測試-二區",
      },
    },
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: _resources,
  });

export default i18n;
