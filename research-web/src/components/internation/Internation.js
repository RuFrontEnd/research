// react-i18next https://github.com/i18next/react-i18next
// tutorial https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb
// tutroial2 https://www.youtube.com/watch?v=txHU6lrsa3o&ab_channel=MaksimIvanov
// npm install i18next react-i18next i18next-browser-languagedetector
import "components/internation/Internation.css";
import i18n from "components/internation/i18n";
import { useTranslation, Trans } from "react-i18next";
function Internation() {
  const { t } = useTranslation();
  return (
    <>
      <div className={"internation"}>
        <a>zh</a>
        <a>en</a>
      </div>
      <Trans i18nKey="description.part1">
        test
      </Trans>
    </>
  );
}

export default Internation;
