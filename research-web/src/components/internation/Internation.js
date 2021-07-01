// react-i18next https://github.com/i18next/react-i18next
// tutorial https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb
// tutroial2 https://www.youtube.com/watch?v=txHU6lrsa3o&ab_channel=MaksimIvanov
// npm install i18next react-i18next i18next-browser-languagedetector
import "components/internation/Internation.css";
import { useTranslation, Trans } from "react-i18next";
import "components/internation/i18n";

const lngs = {
  en: { nativeName: "English" },
  zh: { nativeName: "中文" },
};

function Internation() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className={"internation"}>
        {Object.keys(lngs).map((lng) => (
          <a
            key={lng}
            style={{ fontWeight: i18n.language === lng ? "bold" : "normal" }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </a>
        ))}
      </div>
      <div  className={"internation"}>
        <Trans i18nKey="description.part1"></Trans>
        <br />
        {t("description.part2")}
      </div>
    </>
  );
}

export default Internation;
