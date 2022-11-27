import SETLANG from "redux/i18nConfig/i18nConfigActionTypes";

export const setLang = (lang) => {
  return {
    type: SETLANG,
    info: "set lang",
    lang: lang,
  };
};
