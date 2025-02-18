import { GlobalOptionDTO } from "./info";
import ComponentTreeNode from "./info/component-tree-node";

export default class FabricateManager {
  globalOption: GlobalOptionDTO = new GlobalOptionDTO({
    SnapGrid: 10,
    ZoomScale: 1,
  });
  nodeList: ComponentTreeNode[] = [];

  getNodeByKey(key: string) {
    for (let idx = 0; idx < this.nodeList.length; idx++) {
      if (this.nodeList[idx].getKey() === key) {
        return this.nodeList[idx];
      }
    }
    return null;
  }
}
