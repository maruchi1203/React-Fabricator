import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import FabricateManager from "../fabricate-manager";

interface EntityResizerProps {
  fabricateManager: FabricateManager;
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
  const { fabricateManager } = props;

  const componentGraphicsEditor = useRef<HTMLElement | null>(null);
  const borderLine = useRef<HTMLDivElement | null>(null);
  const pointList = useRef<HTMLDivElement[]>([]);
  const selectElem = document.getElementById(
    fabricateManager.getSelectedNodeKey()
  );

  let eventTarget: HTMLElement | null = null;
  let trgtId = "-1";

  let dragPosX = 0,
    dragPosY = 0,
    dragPosW = 0,
    dragPosH = 0;
  const pointPosAdjustPixel = 2;

  // #region useEffect
  useEffect(() => {
    componentGraphicsEditor.current = document.getElementById(
      "component-graphics-editor"
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
  // #endregion useEffect

  // #region Initialize
  const setPositionOfEntityResizer = () => {
    if (selectElem && componentGraphicsEditor.current) {
      componentGraphicsEditor.current.style.left = `${selectElem.offsetLeft}px`;
      componentGraphicsEditor.current.style.top = `${selectElem.offsetTop}px`;
      componentGraphicsEditor.current.style.width = `${selectElem.offsetWidth}px`;
      componentGraphicsEditor.current.style.height = `${selectElem.offsetHeight}px`;

      setPositionOfBorderLine();
      setPositionOfBorderPoint();
    }
  };

  const setPositionOfBorderLine = () => {
    if (selectElem && borderLine.current) {
      borderLine.current.style.left = `0px`;
      borderLine.current.style.top = `0px`;
      borderLine.current.style.width = `${selectElem.offsetWidth}px`;
      borderLine.current.style.height = `${selectElem.offsetHeight}px`;
    }
  };

  const setPositionOfBorderPoint = () => {
    if (selectElem) {
      const posAxisX = [0, selectElem.offsetWidth / 2, selectElem.offsetWidth];
      const posAxisY = [
        0,
        selectElem.offsetHeight / 2,
        selectElem.offsetHeight,
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
    if (selectElem) {
      eventTarget = e.target as HTMLDivElement;
      trgtId = eventTarget.id[eventTarget.id.length - 1];
      eventTarget.style.cursor = "none";

      document.addEventListener("mousemove", resizePointOnMouseMoveEvent);
      document.addEventListener("mouseup", resizePointOnMouseUpEvent);
    }
  };

  const resizePointOnMouseMoveEvent = (e: MouseEvent) => {
    if (selectElem && componentGraphicsEditor.current) {
      if (!["3", "5"].includes(trgtId)) {
        if (["0", "1", "2"].includes(trgtId)) {
          dragPosY = selectElem.offsetTop + e.movementY;
          dragPosH = selectElem.offsetHeight - e.movementY;
        } else if (["6", "7", "8"].includes(trgtId)) {
          dragPosY = selectElem.offsetTop;
          dragPosH = selectElem.offsetHeight + e.movementY;
        }

        selectElem.style.top = `${dragPosY}px`;
        selectElem.style.height = `${dragPosH}px`;

        componentGraphicsEditor.current.style.top = `${dragPosY}px`;
        componentGraphicsEditor.current.style.height = `${dragPosH}px`;
      }

      if (!["1", "7"].includes(trgtId)) {
        if (["0", "3", "6"].includes(trgtId)) {
          dragPosX = selectElem.offsetLeft + e.movementX;
          dragPosW = selectElem.offsetWidth - e.movementX;
        } else if (["2", "5", "8"].includes(trgtId)) {
          dragPosX = selectElem.offsetLeft;
          dragPosW = selectElem.offsetWidth + e.movementX;
        }

        selectElem.style.left = `${dragPosX}px`;
        selectElem.style.width = `${dragPosW}px`;

        componentGraphicsEditor.current.style.left = `${
          dragPosX - pointPosAdjustPixel
        }px`;
        componentGraphicsEditor.current.style.width = `${
          dragPosW - pointPosAdjustPixel
        }px`;
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

    if (selectElem) {
      document.addEventListener("mousemove", relocatePointOnMouseMoveEvent);
      document.addEventListener("mouseup", relocatePointOnMouseUpEvent);
    }
  };

  const relocatePointOnMouseMoveEvent = (e: MouseEvent) => {
    e.preventDefault();

    if (selectElem && componentGraphicsEditor.current) {
      dragPosX = selectElem.offsetLeft + e.movementX;
      dragPosY = selectElem.offsetTop + e.movementY;

      selectElem.style.left = `${dragPosX}px`;
      selectElem.style.top = `${dragPosY}px`;

      componentGraphicsEditor.current.style.left = `${
        selectElem.offsetLeft - pointPosAdjustPixel
      }px`;
      componentGraphicsEditor.current.style.top = `${
        selectElem.offsetTop - pointPosAdjustPixel
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
    <Wrapper id="component-graphics-editor" hidden={selectElem ? false : true}>
      {/* <ComponentInfoBox compInfo={selectElem} /> */}
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
