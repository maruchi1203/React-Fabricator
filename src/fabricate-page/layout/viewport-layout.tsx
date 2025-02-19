import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { ComponentGraphicsEditor } from "../overlay";
import ComponentTreeNode from "../info/component-tree-node";
import { convertStyleOptionToNum } from "../../general/util";
import FabricateManager from "../fabricate-manager";

interface ViewportLayoutProps {
  manager: FabricateManager;
  selectedNode: ComponentTreeNode | null;
  onDropEvent: (e: React.DragEvent) => void;
  onDragOverEvent: (e: React.DragEvent) => void;
  onDragLeaveEvent: (e: React.DragEvent) => void;
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;

  align-content: center;
  justify-items: center;
`;

const Viewport = styled.div`
  position: relative;
  background-color: black;
`;

const InteractionSpace = styled.div`
  background-color: white;
`;

// const ScaleIndicator = styled.div`
//   right: 20px;
//   bottom: 20px;

//   width: 50px;
//   height: 20px;

//   background-color: black;
//   opacity: 0.5;
// `;
// #endregion styled

export default function ViewportLayout(props: ViewportLayoutProps) {
  const {
    manager,
    selectedNode,
    onDropEvent,
    onDragOverEvent,
    onDragLeaveEvent,
  } = props;

  const rootNode = useRef<ComponentTreeNode>();
  const viewportLayout = useRef<HTMLDivElement | null>(null);
  const viewport = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);

  // #region useEffect
  useEffect(() => {
    rootNode.current = manager.nodeList[0];
    viewportLayout.current = document.getElementById(
      "viewport-layout"
    ) as HTMLDivElement;
    viewport.current = document.getElementById("viewport") as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (viewportLayout.current && viewport.current) {
      viewportLayout.current.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          if (e.ctrlKey) e.preventDefault();
        },
        true
      );

      if (rootNode.current) {
        viewportLayout.current.style.width = `${
          convertStyleOptionToNum(rootNode.current.getStyleOption("width")) *
            scale +
          200
        }px`;
        viewportLayout.current.style.height = `${
          convertStyleOptionToNum(rootNode.current.getStyleOption("height")) *
            scale +
          200
        }px`;

        viewport.current.style.width = `${
          convertStyleOptionToNum(rootNode.current.getStyleOption("width")) *
          scale
        }px`;
        viewport.current.style.height = `${
          convertStyleOptionToNum(rootNode.current.getStyleOption("height")) *
          scale
        }px`;
      }
    }
  }, [scale]);
  // #endregion useEffect

  const resizeViewport = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      const updown = e.deltaY > 0 ? -1 : 1;
      const deltaValue = Number.parseFloat((scale + 0.1 * updown).toFixed(1));

      if (0.1 <= deltaValue && deltaValue <= 2) {
        setScale(deltaValue);
      }
    }
  };

  return (
    <Wrapper id="viewport-layout" tabIndex={0} onWheel={resizeViewport}>
      <Viewport id="viewport" tabIndex={1}>
        {selectedNode ? (
          <ComponentGraphicsEditor selectedNode={selectedNode} />
        ) : null}
        <InteractionSpace
          id="interaction-space"
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "1200px",
            height: "800px",
          }}
          className="component resizable dropzone"
          onDrop={onDropEvent}
          onDragOver={onDragOverEvent}
          onDragLeave={onDragLeaveEvent}
        />
      </Viewport>
    </Wrapper>
  );
}
