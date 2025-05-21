import { useEffect, useState } from "react";
import styled from "styled-components";
import FabricateManager from "../../fabricate-manager";
import ComponentTreeNode from "../../info/component-tree-node";
import HierarchyTreeItem from "./hierarchy-tree-item";

interface ViewHierarchyProps {
  manager: FabricateManager;
  selectedNode: ComponentTreeNode | null;
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  flex-grow: 1;

  background-color: transparent;
`;

const HierarchyTreeContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: 200px;

  padding: 10px;

  background-color: white;
  border: 3px solid black;
  border-radius: 10px;

  overflow: scroll;
`;
// #endregion styled

export default function ViewHierarchy(props: ViewHierarchyProps) {
  // #region variables
  const { manager, selectedNode } = props;

  const [contents, setContents] = useState<React.ReactElement[]>([]);
  // #endregion varibles

  // #region useEffect
  useEffect(() => {
    if (manager.nodeList[0]) {
      const hrchyNodeList = manager.nodeList[0].createHierarchyTreeComponent();
      const hrchyList = [];

      let idx = 0;

      for (const node of hrchyNodeList) {
        const comp = (
          <HierarchyTreeItem
            key={idx}
            compType={"type"}
            compName={node.getKey()}
            depth={node.getDepth()}
            iconToggle={node.getChildren().length > 0}
            expandToggle={true}
          />
        );

        idx += 1;
        hrchyList.push(comp);
      }

      setContents(hrchyList);
    }
  }, [manager.nodeList.length]);

  useEffect(() => {}, [selectedNode]);
  // #endregion useEffect

  return (
    <Wrapper key={0}>
      <HierarchyTreeContainer key={1}>{contents}</HierarchyTreeContainer>
    </Wrapper>
  );
}
