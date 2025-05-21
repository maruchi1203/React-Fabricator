import styled from "styled-components";
import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ViewComponents,
  ViewHierarchy,
  ViewToolbar,
  ViewViewport,
} from "../fabricate-page/view";
import { ComponentButton, ComponentPanel } from "../fabricate-page/placable";
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
  const [treeForRendering, setTreeForRendering] = useState<ReactElement[]>([]);

  // Variable with basic data types
  const variable = {
    dragStartPosX: 0,
    dragStartPosY: 0,
  };

  // Elements changed by user interaction
  const draggedElem = useRef<HTMLElement | null>(null);
  const [isKeepFocusElem, setIsKeepFocusElem] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<ComponentTreeNode | null>(
    null
  );

  // Elements already placed
  const toolbarLayout = useRef<HTMLElement | null>(null);
  const mainViewContainer = useRef<HTMLElement | null>(null);
  const viewport = useRef<HTMLElement | null>(null);
  const interactionSpace = useRef<HTMLElement | null>(null);
  //#endregion variables

  // #region useEffect
  useEffect(() => {
    toolbarLayout.current = document.getElementById("toolbar");
    mainViewContainer.current = document.getElementById("main-view-container");
    viewport.current = document.getElementById("viewport");
    interactionSpace.current = document.getElementById("interaction-space");

    if (interactionSpace.current) {
      const node = new ComponentTreeNode(
        "interaction-space",
        null,
        [],
        0,
        ComponentPanel as FunctionComponent,
        {
          style: {
            left: "0px",
            top: "0px",
            width: "1200px",
            height: "800px",
          },
          draggable: false,
        }
      );

      nodeList.push(node);
    }
  }, [nodeList]);
  // #endregion useEffect

  // #region WorkingSpace
  const SetSelectedElem = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLDivElement).classList.contains("component")) {
      setSelectedNode(manager.getNodeByKey((e.target as HTMLElement).id));
    } else if (isKeepFocusElem) {
      return;
    } else {
      setSelectedNode(null);
    }
  };

  const CheckClassOfElem = (e: React.MouseEvent) => {
    setIsKeepFocusElem(
      (e.target as HTMLElement).classList.contains("keep-focus")
    );
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

    if (draggedElem.current && eventTarget.classList.contains("dropzone")) {
      if (
        mainViewContainer.current &&
        viewport.current &&
        toolbarLayout.current
      ) {
        let newNode;
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
          newElemPosLeft = 0;
          newElemPosTop = 0;
        }

        const newNodeStyle = {
          position: "absolute",
          left: `${newElemPosLeft}px`,
          top: `${newElemPosTop}px`,
        };

        // Load placable component by className
        if (eventTarget.id && parentNode) {
          if (draggedElem.current.classList.contains("panel")) {
            newNode = new ComponentTreeNode(
              key,
              parentNode,
              [],
              parentNode.getDepth() + 1,
              ComponentPanel as FunctionComponent,
              {
                style: {
                  ...newNodeStyle,
                  width: "150px",
                  height: "100px",
                },
                draggable: "false",
              }
            );
          } else if (draggedElem.current.classList.contains("button")) {
            newNode = new ComponentTreeNode(
              key,
              parentNode,
              [],
              parentNode.getDepth() + 1,
              ComponentButton as FunctionComponent,
              {
                style: {
                  ...newNodeStyle,
                  width: "100px",
                  height: "40px",
                },
                draggable: "false",
              }
            );
          }
        }

        if (parentNode && newNode) {
          parentNode.appendChild(newNode);
          nodeList.push(newNode);
        }

        setTreeForRendering(nodeList[0]?.createReactElementTree());
        const newElem = manager.getNodeByKey(key);
        if (newElem) {
          setSelectedNode(newElem);
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
      <ViewToolbar id="toolbar"></ViewToolbar>
      <WorkingSpace
        onClick={SetSelectedElem}
        onMouseDown={CheckClassOfElem}
        onDragOver={OnDragOverEvent}
        onDragLeave={OnDragLeaveEvent}
      >
        <MainViewContainer id="main-view-container">
          <ViewViewport
            manager={manager}
            selectedNode={selectedNode}
            treeForRendering={treeForRendering}
            onDropEvent={placeComponentOnInteractionSpace}
          />
        </MainViewContainer>
        <SideViewContainer
          onDragStart={dragStartForPlacingComponent}
          onDragEnd={dragEndForPlacingComponent}
        >
          <ViewHierarchy manager={manager} selectedNode={selectedNode} />
          <ViewComponents />
        </SideViewContainer>
      </WorkingSpace>
    </Wrapper>
  );
}
