import { GlobalOptionDTO } from "./info";
import ComponentTreeNode from "./info/component-tree-node";

export default class FabricateManager {
  globalOption: GlobalOptionDTO = new GlobalOptionDTO({
    SnapGrid: 10,
    ZoomScale: 1,
  });
  nodeList: ComponentTreeNode[] = [];
  currentSelectedNode: ComponentTreeNode | null = null;

  setSelectedNode(value: ComponentTreeNode | null) {
    this.currentSelectedNode = value;
  }

  getSelectedNode() {
    return this.currentSelectedNode;
  }

  getSelectedNodeKey() {
    return this.currentSelectedNode ? this.currentSelectedNode.getKey() : "";
  }

  getNodeByKey(key: string) {
    for (const node of this.nodeList) {
      if (node.getKey() === key) {
        return node;
      }
    }
    return null;
  }
}
