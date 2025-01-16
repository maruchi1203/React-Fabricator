export default class EntityInfoDTO {
  /*
    
  */
  private entityInfoData: { [key: string]: string };

  constructor(initData: { [key: string]: string }) {
    this.entityInfoData = initData;
  }

  set(key: string, value: string) {
    this.entityInfoData[key] = value;
    return true;
  }

  get(key: string) {
    return this.entityInfoData[key];
  }

  clear() {
    this.entityInfoData = {};
    return true;
  }
}
