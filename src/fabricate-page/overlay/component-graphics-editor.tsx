import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ComponentTreeNode from "../info/component-tree-node";

interface EntityResizerProps {
  selectedNode: ComponentTreeNode;
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
`;

const BorderLine = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;

  left: 5px;
  top: 5px;

  border: 2px dotted black;
  z-index: 101;

  background-color: lightgray;
  opacity: 40%;
`;

const ResizePoint = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;

  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  z-index: 103;
`;

const RelocatePoint = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;

  border: 2px solid black;
  background-color: white;
  z-index: 103;
`;
// #endregion styled

export default function ComponentGraphicsEditor(props: EntityResizerProps) {
  const { selectedNode } = props;

  const selectedElem = useRef<HTMLElement | null>(null);

  const componentGraphicsEditor = useRef<HTMLDivElement | null>(null);
  const viewport = useRef<HTMLDivElement | null>(null);

  const borderLine = useRef<HTMLDivElement | null>(null);
  const pointList = useRef<HTMLDivElement[]>([]);

  let eventTarget: HTMLElement | null = null;
  let trgtId = "-1";

  let dragPosX = 0;
  let dragPosY = 0;
  let dragPosW = 0;
  let dragPosH = 0;
  const pointPosAdjustPixel = 2;

  // #region useEffect
  useEffect(() => {
    componentGraphicsEditor.current = document.getElementById(
      "component-graphics-editor"
    ) as HTMLDivElement;

    viewport.current = document.getElementById(
      "main-view-container"
    ) as HTMLDivElement;

    borderLine.current = document.getElementById(
      "border-line"
    ) as HTMLDivElement;

    for (let i = 0; i < 9; i++) {
      const elem = document.getElementById(
        "point" + i.toString()
      ) as HTMLDivElement;

      if (elem) {
        pointList.current.push(elem);
      }
    }
  }, []);

  useEffect(() => {
    selectedElem.current = document.getElementById(
      selectedNode.getKey()
    ) as HTMLElement;

    setPositionOfEntityResizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode]);
  // #endregion useEffect

  // #region Initialize
  const setPositionOfEntityResizer = () => {
    if (
      selectedElem.current &&
      componentGraphicsEditor.current &&
      viewport.current
    ) {
      componentGraphicsEditor.current.style.left = `${selectedElem.current.offsetLeft}px`;
      componentGraphicsEditor.current.style.top = `${selectedElem.current.offsetTop}px`;
      componentGraphicsEditor.current.style.width = `${selectedElem.current.offsetWidth}px`;
      componentGraphicsEditor.current.style.height = `${selectedElem.current.offsetHeight}px`;

      setPositionOfBorderLine();
      setPositionOfBorderPoint();
    }
  };

  const setPositionOfBorderLine = () => {
    if (selectedElem.current && borderLine.current) {
      borderLine.current.style.left = `0px`;
      borderLine.current.style.top = `0px`;
      borderLine.current.style.width = selectedElem.current.style.width;
      borderLine.current.style.height = selectedElem.current.style.height;
    }
  };

  const setPositionOfBorderPoint = () => {
    if (selectedElem.current) {
      const posAxisX = [
        0,
        selectedElem.current.offsetWidth / 2,
        selectedElem.current.offsetWidth,
      ];
      const posAxisY = [
        0,
        selectedElem.current.offsetHeight / 2,
        selectedElem.current.offsetHeight,
      ];

      for (let idx = 0; idx < pointList.current.length; idx++) {
        pointList.current[idx].style.left = `${
          posAxisX[idx % posAxisX.length]
        }px`;
        pointList.current[idx].style.top = `${
          posAxisY[Math.floor(idx / posAxisY.length)]
        }px`;
      }
    }
  };
  // #endregion Initialize

  // #region ResizePoint
  const resizePointOnMouseDownEvent = (e: React.MouseEvent) => {
    if (selectedNode) {
      eventTarget = e.target as HTMLDivElement;
      trgtId = eventTarget.id[eventTarget.id.length - 1];
      eventTarget.style.cursor = "none";

      document.addEventListener("mousemove", resizePointOnMouseMoveEvent);
      document.addEventListener("mouseup", resizePointOnMouseUpEvent);
    }
  };

  const resizePointOnMouseMoveEvent = (e: MouseEvent) => {
    if (
      selectedElem.current &&
      componentGraphicsEditor.current &&
      viewport.current
    ) {
      if (!["3", "5"].includes(trgtId)) {
        if (["0", "1", "2"].includes(trgtId)) {
          dragPosY = selectedElem.current.offsetTop + e.movementY;
          dragPosH = selectedElem.current.offsetHeight - e.movementY;
        } else if (["6", "7", "8"].includes(trgtId)) {
          dragPosY = selectedElem.current.offsetTop;
          dragPosH = selectedElem.current.offsetHeight + e.movementY;
        }

        selectedElem.current.style.top = `${dragPosY}px`;
        selectedElem.current.style.height = `${dragPosH}px`;

        componentGraphicsEditor.current.style.top = `${
          dragPosY + viewport.current.scrollTop
        }px`;
        componentGraphicsEditor.current.style.height = `${dragPosH}px`;
      }

      if (!["1", "7"].includes(trgtId)) {
        if (["0", "3", "6"].includes(trgtId)) {
          dragPosX = selectedElem.current.offsetLeft + e.movementX;
          dragPosW = selectedElem.current.offsetWidth - e.movementX;
        } else if (["2", "5", "8"].includes(trgtId)) {
          dragPosX = selectedElem.current.offsetLeft;
          dragPosW = selectedElem.current.offsetWidth + e.movementX;
        }

        selectedElem.current.style.left = `${dragPosX}px`;
        selectedElem.current.style.width = `${dragPosW}px`;

        componentGraphicsEditor.current.style.left = `${
          dragPosX + viewport.current.scrollLeft
        }px`;
        componentGraphicsEditor.current.style.width = `${dragPosW}px`;
      }

      setPositionOfEntityResizer();
    }
  };

  const resizePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();

    eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "default";

    document.removeEventListener("mousemove", resizePointOnMouseMoveEvent);
    document.removeEventListener("mouseup", resizePointOnMouseUpEvent);
  };
  // #endregion ResizePoint

  // #region RelocatePoint
  const relocatePointOnMouseDownEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "none";

    if (selectedElem.current) {
      document.addEventListener("mousemove", relocatePointOnMouseMoveEvent);
      document.addEventListener("mouseup", relocatePointOnMouseUpEvent);
    }
  };

  const relocatePointOnMouseMoveEvent = (e: MouseEvent) => {
    e.preventDefault();

    if (selectedElem.current && componentGraphicsEditor.current) {
      dragPosX = selectedElem.current.offsetLeft + e.movementX;
      dragPosY = selectedElem.current.offsetTop + e.movementY;

      selectedElem.current.style.left = `${dragPosX}px`;
      selectedElem.current.style.top = `${dragPosY}px`;

      componentGraphicsEditor.current.style.left = `${
        selectedElem.current.offsetLeft - pointPosAdjustPixel
      }px`;
      componentGraphicsEditor.current.style.top = `${
        selectedElem.current.offsetTop - pointPosAdjustPixel
      }px`;
    }
  };

  const relocatePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();
    eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "default";

    document.removeEventListener("mousemove", relocatePointOnMouseMoveEvent);
    document.removeEventListener("mouseup", relocatePointOnMouseUpEvent);
  };
  // #endregion RelocatePoint

  return (
    <Wrapper
      id="component-graphics-editor"
      hidden={selectedNode ? false : true}
    >
      {/* <ComponentInfoBox compInfo={selectedNode} /> */}
      <BorderLine id="border-line" />
      <ResizePoint
        id="point0"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point1"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point2"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point3"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <RelocatePoint
        id="point4"
        className="fix-select"
        onMouseDown={relocatePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point5"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point6"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point7"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point8"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
    </Wrapper>
  );
}
