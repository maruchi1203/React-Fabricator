export default class GlobalOptionDTO {
  /*
    snapGridWidth: 
  */
  private globalOptionData: { [key: string]: string };

  constructor(initData: { [key: string]: string }) {
    this.globalOptionData = initData;
  }

  set(key: string, value: string) {
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
