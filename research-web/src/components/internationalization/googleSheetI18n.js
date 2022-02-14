import axios from 'axios';
import { parse } from 'papaparse';


class GoogleSheetI18n {
  private i18nName;
  private i18nAllLangData;
  private currentLangKey;
  private sheetURL;

  constructor(name, sheetURL) {
    this.currentLangKey = I18nKey.ZHTW;
    this.i18nAllLangData = this.createI18nAllLangDataDefault();
    this.sheetURL = sheetURL;
    this.i18nName = name;
  }

  private createI18nAllLangDataDefault() {
    return {
      [I18nKey.ZHTW]: {},
      [I18nKey.ZHCN]: {},
      [I18nKey.ENUS]: {},
    };
  }

  private createI18nAllLangDataFromAPI(apiResponse) {
    let i18nAllLangData = this.createI18nAllLangDataDefault();

    this.parseCSV(apiResponse).forEach((csvRow, index) => {
      if (index === 0) {
        return;
      }

      if (csvRow.length < 4) {
        return;
      }

      if (csvRow[0] === '') {
        Logger.warn(`Row ${index} key empty`, undefined, 'GoogleSheetI18n', 'createI18nAllLangDataFromAPI');
        return;
      }

      let i18nLangKey = ServiceFormat.toString(csvRow[0]);

      Object.values(I18nKey).forEach(i18nKey => {
        i18nAllLangData[i18nKey][i18nLangKey] = ServiceFormat.toString(csvRow[I18N_ALL_KEY_DATA[i18nKey].csvColumnIndex]);
      });
    });

    return i18nAllLangData;
  }

  private parseCSV(csv) {
    const result = parse < Array < string >> (csv);

    if (result.errors.length > 0) {
      throw new Error(['Unable to parse csv, error: '].concat(result.errors.map(error => {
        return error.message;
      })).join(','));
    }

    return result.data;
  }

  public get(key) {
    if (!this.i18nAllLangData) {
      return key;
    }

    if (!this.i18nAllLangData[this.currentLangKey][key]) {
      return key;
    }

    return this.i18nAllLangData[this.currentLangKey][key];
  }

  public getLangDataByKey(key) {
    return this.i18nAllLangData[key];
  }

  public getLangKey() {
    return this.currentLangKey;
  }

  public async load() {
    let storageKey = `i18n.${this.i18nName}.${ServiceGlobalSettings.get().version}`;
    let storageData = sessionStorage.getItem(storageKey);

    if (storageData) {
      try {
        let storageDataJSON = JSON.parse(storageData);
        this.i18nAllLangData = storageDataJSON;
        return;
      } catch (e) {
        Logger.warn(`I18n cache data parse error`, { error: e }, 'GoogleSheetI18n', 'load');
      }
    }

    const response = await axios.get(this.sheetURL);
    this.i18nAllLangData = this.createI18nAllLangDataFromAPI(response.data);
    sessionStorage.setItem(storageKey, JSON.stringify(this.i18nAllLangData));
    return;
  }

  public setLangKey(key) {
    this.currentLangKey = key;
  }
}

export default GoogleSheetI18n;