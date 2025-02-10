export default class GlobalOptionDTO {
  /*
    snapGridWidth: 
  */
  private globalOptionData: { [key: string]: unknown };

  constructor(initData: { [key: string]: unknown }) {
    this.globalOptionData = initData;
  }

  set(key: string, value: unknown) {
    this.globalOptionData[key] = value;
    return true;
  }

  get(key: string) {
    return this.globalOptionData[key];
  }

  clear() {
    this.globalOptionData = {};
    return true;
  }
}
