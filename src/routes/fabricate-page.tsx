import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import {
  ComponentLayout,
  HierarchyLayout,
  ToolBarLayout,
  ViewportLayout,
} from "../fabricate-page/layout";
import { createRoot, Root } from "react-dom/client";
import { Button, Panel } from "../fabricate-page/component";
import ComponentTreeNode from "../fabricate-page/info/component-tree-node";
import { getRandomKey } from "../general/util";
import Fabricatemanager from "../fabricate-page/fabricate-manager";

// #region styled
const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const WorkingSpace = styled.div`
  width: 100%;

  flex: 1 1 auto;

  display: grid;
  grid-template-columns: 1fr 500px;
  overflow-y: hidden;
`;

const MainViewContainer = styled.div`
  background-color: gray;

  overflow: scroll;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar:hover {
    width: 20px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;

    background-color: lightgray;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const SideViewContainer = styled.div`
  background-color: gray;

  display: flex;
  flex-direction: column;

  background-color: gray;
`;
// #endregion styled

export default function FabricatePage() {
  //#region variables
  const [manager, setManager] = useState<Fabricatemanager>(
    new Fabricatemanager()
  );
  const nodeList: ComponentTreeNode[] = manager.nodeList;

  // Variable with basic data types
  const variable = {
    dragStartPosX: 0,
    dragStartPosY: 0,
  };

  // Elements changed by user interaction
  const draggedElem = useRef<HTMLElement | null>(null);
  const lastClickedElem = useRef<HTMLElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ComponentTreeNode | null>(
    null
  );

  // Elements already placed
  const toolbarLayout = useRef<HTMLElement | null>(null);
  const mainViewContainer = useRef<HTMLElement | null>(null);
  const viewport = useRef<HTMLElement | null>(null);
  const interactionSpace = useRef<Root | null>(null);
  //#endregion variables

  // #region useEffect
  useEffect(() => {
    toolbarLayout.current = document.getElementById("tool-bar-layout");
    mainViewContainer.current = document.getElementById("main-view-container");
    viewport.current = document.getElementById("viewport");
    const interactionSpaceElem = document.getElementById("interaction-space");

    if (interactionSpaceElem && !interactionSpace.current) {
      interactionSpace.current = createRoot(interactionSpaceElem);

      const node = new ComponentTreeNode("interaction-space", null, [], 0, {
        type: Panel,
        props: {
          style: { left: "0px", top: "0px", width: "1200px", height: "800px" },
          draggable: false,
        },
      });

      nodeList.push(node);
      node.setElement(interactionSpaceElem);
    }
  }, [nodeList]);
  // #endregion useEffect

  // #region WorkingSpace
  const SetSelectedElem = (e: React.MouseEvent) => {
    e.preventDefault();

    const exceptList = ["viewport-layout", "component-graphics-editor"];

    if (lastClickedElem.current?.classList.contains("fix-select")) {
      return;
    }

    if (exceptList.includes((e.target as HTMLElement).id)) {
      setSelectedNode(null);
    } else {
      setSelectedNode(manager.getNodeByKey((e.target as HTMLElement).id));
    }
  };

  const OnMouseDownEvent = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLDivElement;
    lastClickedElem.current = eventTarget;
  };

  const OnDragOverEvent = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const OnDragLeaveEvent = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  // #endregion WorkingSpace

  // #region ViewportLayout
  function placeComponentOnInteractionSpace(e: React.DragEvent) {
    e.stopPropagation();

    const key = getRandomKey(10);
    const eventTarget = e.target as HTMLElement;
    const parentNode = manager.getNodeByKey(eventTarget.id);
    let newReactElem;

    if (draggedElem.current && eventTarget.classList.contains("dropzone")) {
      let newElemStyle = null;

      if (
        mainViewContainer.current &&
        viewport.current &&
        toolbarLayout.current
      ) {
        let newElemPosLeft = 0;
        let newElemPosTop = 0;

        if (parentNode == nodeList[0]) {
          /**
           * e.clientY = coordinate of new element
           *             - viewport.current.scrollTop
           *             + viewport.current.offsetTop
           *             + eventTarget.offsetTop
           *             + dragStartPosY
           *             + toolbarLayout.current.clientHeight
           *
           * + viewport.current.scrollTop : Coordinate in ViewportLayout
           * - viewport.current.offsetTop : To exclude blank area
           * - eventTarget.offsetTop : For calculating new child element's position in eventTarget
           * - toolbarLayout.current.clientHeight : To exclude toolbar's height
           * - dragStartPosY : Coordinate in dragElem when drag started
           **/
          newElemPosLeft =
            e.clientX +
            mainViewContainer.current.scrollLeft -
            viewport.current.offsetLeft -
            eventTarget.offsetLeft -
            variable["dragStartPosX"];
          newElemPosTop =
            e.clientY +
            mainViewContainer.current.scrollTop -
            viewport.current.offsetTop -
            eventTarget.offsetTop -
            variable["dragStartPosY"] -
            toolbarLayout.current.offsetHeight;
        } else {
          /**
           * e.clientY = coordinate of new element
           *             - viewport.current.scrollTop
           *             + viewport.current.offsetTop
           *             + eventTarget.offsetTop
           *             + dragStartPosY
           *             + toolbarLayout.current.clientHeight
           *
           * + viewport.current.scrollTop : Coordinate in ViewportLayout
           * - viewport.current.offsetTop : To exclude blank area
           * - eventTarget.offsetTop : For calculating new child element's position in eventTarget
           * - toolbarLayout.current.clientHeight : To exclude toolbar's height
           * - dragStartPosY : Coordinate in dragElem when drag started
           **/
          newElemPosLeft =
            e.clientX +
            mainViewContainer.current.scrollLeft -
            viewport.current.offsetLeft -
            eventTarget.offsetLeft -
            variable["dragStartPosX"];
          newElemPosTop =
            e.clientY +
            mainViewContainer.current.scrollTop -
            viewport.current.offsetTop -
            eventTarget.offsetTop -
            variable["dragStartPosY"] -
            toolbarLayout.current.offsetHeight;
        }

        newElemStyle = {
          position: "absolute",
          left: `${newElemPosLeft}px`,
          top: `${newElemPosTop}px`,
          width: `${draggedElem.current.offsetWidth}px`,
          height: `${draggedElem.current.offsetHeight}px`,
          background: "white",
        };
      }

      if (eventTarget.id && parentNode) {
        if (draggedElem.current.classList.contains("panel")) {
          newReactElem = new ComponentTreeNode(
            key,
            parentNode,
            [],
            parentNode.getDepth() + 1,
            {
              type: Panel,
              props: {
                style: newElemStyle,
                draggable: false,
              },
            }
          );
        } else if (draggedElem.current.classList.contains("button")) {
          newReactElem = new ComponentTreeNode(
            key,
            parentNode,
            [],
            parentNode.getDepth() + 1,
            {
              type: Button,
              props: {
                style: newElemStyle,
                draggable: false,
              },
            }
          );
        }
      }

      if (parentNode && newReactElem) {
        parentNode.appendChild(newReactElem);
        nodeList.push(newReactElem);
      }

      if (interactionSpace.current) {
        interactionSpace.current.render(nodeList[0]?.createReactElementTree());
        const newRenderedReactElem = manager.getNodeByKey(key);
        if (newRenderedReactElem) {
          setSelectedNode(newRenderedReactElem);
        }
      }
    }
  }
  // #endregion ViewportLayout

  // #region SideViewContainer
  const dragStartForPlacingComponent = (e: React.DragEvent) => {
    draggedElem.current = e.target as HTMLElement;
    variable["dragStartPosX"] = e.clientX - draggedElem.current.offsetLeft;
    variable["dragStartPosY"] = e.clientY - draggedElem.current.offsetTop;
  };

  const dragEndForPlacingComponent = () => {
    draggedElem.current = null;
  };
  // #endregion SideViewContainer

  return (
    <Wrapper>
      <ToolBarLayout id="tool-bar-layout"></ToolBarLayout>
      <WorkingSpace
        onClick={SetSelectedElem}
        onMouseDown={OnMouseDownEvent}
        onDragOver={OnDragOverEvent}
        onDragLeave={OnDragLeaveEvent}
      >
        <MainViewContainer id="main-view-container">
          <ViewportLayout
            manager={manager}
            selectedNode={selectedNode}
            onDropEvent={placeComponentOnInteractionSpace}
          />
        </MainViewContainer>
        <SideViewContainer
          onDragStart={dragStartForPlacingComponent}
          onDragEnd={dragEndForPlacingComponent}
        >
          <HierarchyLayout manager={manager} selectedNode={selectedNode} />
          <ComponentLayout />
        </SideViewContainer>
      </WorkingSpace>
    </Wrapper>
  );
}
