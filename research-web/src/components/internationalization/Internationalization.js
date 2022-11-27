// react-i18next https://github.com/i18next/react-i18next
// tutorial https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb
// tutroial2 https://www.youtube.com/watch?v=txHU6lrsa3o&ab_channel=MaksimIvanov
// npm install i18next react-i18next i18next-browser-languagedetector

// step1 npm install 模組
// step2 定義 i18nConfig.js
// step3 定義 import useTranslation 或 Trans 和 i18nConfig.js
// step3 const { t, i18n } = useTranslation();
// step4 <Trans i18nKey="description.part1"></Trans> 或 {t("description.part2")}
// step5 const lngs = { en: { nativeName: "English" }, zh: { nativeName: "中文" }};
// step6 onClick={() => i18n.changeLanguage(lng)}

import { useEffect } from "react";
import "components/internationalization/Internationalization.css";
import { useTranslation, Trans } from "react-i18next";
// import GoogleSheetI18n from "./googleSheetI18n";
import "components/internationalization/i18nConfig";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import axios from "axios";
// import papa from "papaparse";
// import { useEffect, useState } from "react";

const lngs = {
  en_US: { nativeName: "English" },
  zh_TW: { nativeName: "中文" },
};

function Internationalization() {
  const { t, i18n } = useTranslation();

  return (
    <section>
      <div className={"internation"}>
        {/* Object.keys 回傳陣列*/}
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{ fontWeight: i18n.language === lng ? "bold" : "normal" }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <div className={"internation"}>
        <Trans i18nKey="description.key_1"></Trans>
        <br />
        {t("description.key_2")}
      </div>
    </section>
  );
}

export default Internationalization;
