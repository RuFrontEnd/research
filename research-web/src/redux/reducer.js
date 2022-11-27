import { combineReducers } from "redux";
import i18nConfigReducer from "redux/i18nConfig/i18nConfigReducer";

const rootReducer = combineReducers({
  i18nConfigReducer: i18nConfigReducer,
});

export default rootReducer;
