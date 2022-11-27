import * as actionType from "redux/i18nConfig/i18nConfigActionTypes";

const initialState = {
  zh_TW: {},
  zh_CH: {},
  en: {},
};

const i18nConfigReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SETLANG:
      return {
        ...state,
        zh: action.setLang,
      };

    default:
      return state;
  }
};

export default i18nConfigReducers;
