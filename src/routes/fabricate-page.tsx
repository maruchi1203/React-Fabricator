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
  const manager = useRef<Fabricatemanager>(new Fabricatemanager());
  const nodeList: ComponentTreeNode[] = manager.current.nodeList;
  const dragElem = useRef<HTMLElement | null>(null);
  const viewport = useRef<HTMLElement | null>(null);
  const interactionSpace = useRef<Root | null>(null);

  const [selectedNode, setSelectedNode] = useState<ComponentTreeNode | null>(
    null
  );

  let dragStartPosX = 0;
  let dragStartPosY = 0;

  // #region useEffect
  useEffect(() => {
    viewport.current = document.getElementById("main-view-container");
    const elem = document.getElementById("interaction-space");
    if (elem && !interactionSpace.current) {
      interactionSpace.current = createRoot(elem);
      const node = new ComponentTreeNode("interaction-space", null, [], {
        type: Panel,
        props: {
          style: { left: "0px", top: "0px", width: "1200px", height: "800px" },
        },
      });
      nodeList.push(node);
    }
  }, []);
  // #endregion useEffect

  // #region ViewportLayout
  function placeComponentOnInteractionSpace(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    console.log(dragElem.current);

    const key = getRandomKey(10);
    const eventTarget = e.target as HTMLElement;
    const parentNode = manager.current.getNodeByKey(eventTarget.id);
    let newReactElem;

    if (dragElem.current && eventTarget.classList.contains("dropzone")) {
      let newElemStyle = null;

      if (viewport.current) {
        newElemStyle = {
          position: "absolute",
          left: `${
            e.clientX +
            viewport.current.scrollLeft -
            dragStartPosX -
            eventTarget.offsetLeft
          }px`,
          top: `${
            e.clientY +
            viewport.current.scrollTop -
            dragStartPosY -
            eventTarget.offsetTop
          }px`,
          width: `${dragElem.current.offsetWidth}px`,
          height: `${dragElem.current.offsetHeight}px`,
        };
      }

      if (dragElem.current.classList.contains("panel") && eventTarget.id) {
        newReactElem = new ComponentTreeNode(key, parentNode, [], {
          type: Panel,
          props: {
            style: newElemStyle,
            draggable: false,
            onDropEvent: placeComponentOnInteractionSpace,
          },
        });
      } else if (
        dragElem.current.classList.contains("button") &&
        eventTarget.id
      ) {
        newReactElem = new ComponentTreeNode(key, parentNode, [], {
          type: Button,
          props: {
            style: newElemStyle,
            draggable: false,
          },
        });
      }

      if (parentNode && newReactElem) {
        parentNode.appendChild(newReactElem);
        nodeList.push(newReactElem);
      }

      if (interactionSpace.current) {
        interactionSpace.current.render(nodeList[0]?.createReactElementTree());
      }
    }
  }

  const OnDragOverEvent = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const OnDragLeaveEvent = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const SetSelectedElem = (e: React.MouseEvent) => {
    e.preventDefault();

    const exceptList = ["viewport-layout", "component-graphics-editor"];

    if (exceptList.includes((e.target as HTMLElement).id)) {
      setSelectedNode(null);
    } else if ((e.target as HTMLElement).classList.contains("fix-select")) {
      return;
    } else {
      setSelectedNode(
        manager.current.getNodeByKey((e.target as HTMLElement).id)
      );
    }
  };
  // #endregion ViewportLayout

  // #region SideViewContainer
  const dragStartForPlaceComponent = (e: React.DragEvent) => {
    dragElem.current = e.target as HTMLElement;
    dragStartPosX = e.clientX - dragElem.current.offsetLeft;
    dragStartPosY = e.clientY - dragElem.current.offsetTop;
  };

  const dragEndForPlaceComponent = () => {
    dragElem.current = null;
  };
  // #endregion SideViewContainer

  return (
    <Wrapper>
      <ToolBarLayout></ToolBarLayout>
      <WorkingSpace onClick={SetSelectedElem}>
        <MainViewContainer id="main-view-container">
          <ViewportLayout
            manager={manager.current}
            selectedNode={selectedNode}
            onDropEvent={placeComponentOnInteractionSpace}
            onDragOverEvent={OnDragOverEvent}
            onDragLeaveEvent={OnDragLeaveEvent}
          />
        </MainViewContainer>
        <SideViewContainer
          onDragStart={dragStartForPlaceComponent}
          onDragEnd={dragEndForPlaceComponent}
        >
          <HierarchyLayout />
          <ComponentLayout />
        </SideViewContainer>
      </WorkingSpace>
    </Wrapper>
  );
}
