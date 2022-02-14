import { BehaviorSubject } from 'rxjs';

import { ASYNC_STATUS_ERROR, ASYNC_STATUS_LOADED, ASYNC_STATUS_LOADING } from 'pages/nft/core/core.constants';
import GoogleSheetI18n, { I18nKey, I18nLangData } from 'pages/nft/core/classes/googleSheetI18n.class';
import Logger from 'pages/nft/core/services/utils/logger';
import { DEFAULT_I18N } from 'pages/nft/curationCustom/_shared/shared.constact';
import { I18n } from 'pages/nft/curationCustom/_shared/shared.types';

let _i18nLandData: I18nLangData;
let _googleSheetI18n: GoogleSheetI18n;
let _subjectChanged = new BehaviorSubject<I18n>(DEFAULT_I18N);

const initialize = async (defaultKey: any) => {
  if (_googleSheetI18n) {
    return;
  }

  _googleSheetI18n = new GoogleSheetI18n('earthtourComingsoon', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQu0kvjEV09R5sMMOlOtK5roNnecw6XWvImmk2CfMSEzaKzL8LQFGwPGNeUe13JvzAtPdeONvyMqmyu/pub?gid=0&single=true&output=csv');


  https://docs.google.com/spreadsheets/d/e/2PACX-1vSJkTChP7jo0FdCOitgHpZjA5X95SlHrHHSW3401fbJB74vsKiKfWAZBDhHpnINo-UbcQtOztPgqLMa/pub?output=csv

  https://docs.google.com/spreadsheets/d/e/2PACX-1vQu0kvjEV09R5sMMOlOtK5roNnecw6XWvImmk2CfMSEzaKzL8LQFGwPGNeUe13JvzAtPdeONvyMqmyu/pub?gid=0&single=true&output=csv
  try {
    await _googleSheetI18n.load();
  } catch (e) {
    Logger.warn(`Unable to load i18n data`, {error: e}, 'ServiceI18n', 'initialize');
    _subjectChanged.next({
      ...DEFAULT_I18N,
      status: {
        ...ASYNC_STATUS_ERROR,
        error: 'Unable to load i18n data'
      }
    });
    return;
  }

  let currentKey = I18nKey.ZHTW;

  if (Object.values(I18nKey).includes(defaultKey)) {
    currentKey = defaultKey;
  }

  _i18nLandData = _googleSheetI18n.getLangDataByKey(currentKey);
  _subjectChanged.next({
    current: currentKey,
    status: ASYNC_STATUS_LOADED,
    message
  });
  Logger.info(`I18n Service has been inited successfully`, undefined, 'ServiceI18n', 'initialize');
};

const getSubjectChange = () => {
  return _subjectChanged;
};

const message = (key: string): string => {
  if (_i18nLandData[key]) {
    return _i18nLandData[key];
  }

  return key;
};

const setLangKey = (key: any) => {
  if (!Object.values(I18nKey).includes(key)) {
    Logger.warn(`Key not allow, must include [${Object.values(I18nKey).join(', ')}]`, {key}, 'ServiceI18n', 'setLangKey');
    return;
  }

  _subjectChanged.next({
    ...DEFAULT_I18N,
    status: ASYNC_STATUS_LOADING
  });
  _i18nLandData = _googleSheetI18n.getLangDataByKey(key);
  _subjectChanged.next({
    current: key,
    status: ASYNC_STATUS_LOADED,
    message
  });
};

initialize((localStorage.getItem('language') || navigator.language).replace('-', '_'));

const ServiceI18n = {
  initialize,
  getSubjectChange,
  message,
  setLangKey
};

export default ServiceI18n;