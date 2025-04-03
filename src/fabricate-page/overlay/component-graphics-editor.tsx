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

  // Variable with basic data types
  const variable = {
    dragPosX: 0,
    dragPosY: 0,
    dragPosW: 0,
    dragPosH: 0,
    originalPosX: 0,
    originalPosY: 0,
    originalPosW: 0,
    originalPosH: 0,
    adjPosPx: 6,
    trgtId: "-1",
  };

  // Elements changed by user interaction
  let ctrlKeyDown = false;
  const selectedElem = useRef<HTMLElement | null>(null);

  // Elements already placed
  const componentGraphicsEditor = useRef<HTMLDivElement | null>(null);

  const toolbarLayout = useRef<HTMLElement | null>(null);
  const viewport = useRef<HTMLElement | null>(null);
  const mainViewContainer = useRef<HTMLElement | null>(null);

  // Elements Editor
  const borderLine = useRef<HTMLDivElement | null>(null);
  const pointList = useRef<HTMLDivElement[]>([]);

  // #region useEffect
  useEffect(() => {
    componentGraphicsEditor.current = document.getElementById(
      "component-graphics-editor"
    ) as HTMLDivElement;

    toolbarLayout.current = document.getElementById("tool-bar-layout");

    viewport.current = document.getElementById("viewport");

    mainViewContainer.current = document.getElementById("main-view-container");

    borderLine.current = document.getElementById(
      "border-line"
    ) as HTMLDivElement;

    for (let i = 0; i < 9; i++) {
      const elem = document.getElementById(
        "edit-point-" + i.toString()
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
      componentGraphicsEditor.current.style.left = `${
        selectedElem.current.offsetLeft - variable["adjPosPx"]
      }px`;
      componentGraphicsEditor.current.style.top = `${
        selectedElem.current.offsetTop - variable["adjPosPx"]
      }px`;
      componentGraphicsEditor.current.style.width = `${
        selectedElem.current.offsetWidth + variable["adjPosPx"] * 2
      }px`;
      componentGraphicsEditor.current.style.height = `${
        selectedElem.current.offsetHeight + variable["adjPosPx"] * 2
      }px`;

      setPositionOfBorderLine();
      setPositionOfBorderPoint();
    }
  };

  const setPositionOfBorderLine = () => {
    if (selectedElem.current && borderLine.current) {
      borderLine.current.style.left = `${variable["adjPosPx"]}px`;
      borderLine.current.style.top = `${variable["adjPosPx"]}px`;
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

  // #region Wrapper
  const OnKeyDownEvent = (e: React.KeyboardEvent) => {
    console.log("keyDown");
    if (e.ctrlKey) {
      console.log("ctrlKeyDown");
      ctrlKeyDown = true;
    }
  };

  const OnKeyUpEvent = () => {
    console.log("keyUp");
    ctrlKeyDown = false;
  };
  // #endregion Wrapper

  // #region ResizePoint
  const resizePointOnMouseDownEvent = (e: React.MouseEvent) => {
    if (selectedElem.current) {
      const eventTarget = e.target as HTMLDivElement;
      variable["originalPosX"] = selectedElem.current.offsetLeft;
      variable["originalPosY"] = selectedElem.current.offsetTop;
      variable["originalPosW"] = selectedElem.current.offsetWidth;
      variable["originalPosH"] = selectedElem.current.offsetHeight;

      eventTarget.style.cursor = "none";
      variable["trgtId"] = eventTarget.id[eventTarget.id.length - 1];

      document.addEventListener("mousemove", resizePoint);
      document.addEventListener("mouseup", resizePointOnMouseUpEvent);
    }
  };

  const resizePoint = (e: MouseEvent) => {
    console.log(ctrlKeyDown);
    if (ctrlKeyDown == false) {
      resizePointNormal(e);
    } else {
      resizePointGridSnap(e);
    }

    setPositionOfEntityResizer();

    function resizePointNormal(e: MouseEvent) {
      if (
        selectedElem.current &&
        componentGraphicsEditor.current &&
        viewport.current
      ) {
        const offsetLeft = selectedElem.current.offsetLeft;
        const offsetTop = selectedElem.current.offsetTop;
        const offsetWidth = selectedElem.current.offsetWidth;
        const offsetHeight = selectedElem.current.offsetHeight;

        if (!["3", "5"].includes(variable["trgtId"])) {
          if (["0", "1", "2"].includes(variable["trgtId"])) {
            variable["dragPosY"] = offsetTop + e.movementY;
            variable["dragPosH"] = offsetHeight - e.movementY;
          } else if (["6", "7", "8"].includes(variable["trgtId"])) {
            variable["dragPosY"] = offsetTop;
            variable["dragPosH"] = offsetHeight + e.movementY;
          }

          selectedElem.current.style.top = `${variable["dragPosY"]}px`;
          selectedElem.current.style.height = `${variable["dragPosH"]}px`;

          componentGraphicsEditor.current.style.top = `${
            variable["dragPosY"] + viewport.current.scrollTop
          }px`;
          componentGraphicsEditor.current.style.height = `${variable["dragPosH"]}px`;
        }

        if (!["1", "7"].includes(variable["trgtId"].toString())) {
          if (["0", "3", "6"].includes(variable["trgtId"])) {
            variable["dragPosX"] = offsetLeft + e.movementX;
            variable["dragPosW"] = offsetWidth - e.movementX;
          } else if (["2", "5", "8"].includes(variable["trgtId"])) {
            variable["dragPosX"] = offsetLeft;
            variable["dragPosW"] = offsetWidth + e.movementX;
          }

          selectedElem.current.style.left = `${variable["dragPosX"]}px`;
          selectedElem.current.style.width = `${variable["dragPosW"]}px`;

          componentGraphicsEditor.current.style.left = `${
            variable["dragPosX"] + viewport.current.scrollLeft
          }px`;
          componentGraphicsEditor.current.style.width = `${variable["dragPosW"]}px`;
        }
      }
    }

    // TODO Implement GridSnap
    function resizePointGridSnap(e: MouseEvent) {
      if (
        selectedElem.current &&
        selectedElem.current.parentElement &&
        componentGraphicsEditor.current &&
        viewport.current &&
        mainViewContainer.current &&
        toolbarLayout.current
      ) {
        const offsetLeft = selectedElem.current.offsetLeft;
        const offsetTop = selectedElem.current.offsetTop;

        const mousePosInInteractionSpaceX =
          Math.floor(
            (e.clientX +
              mainViewContainer.current.scrollLeft -
              viewport.current.offsetLeft -
              selectedElem.current.parentElement.offsetLeft) /
              100
          ) * 100;
        const mousePosInInteractionSpaceY =
          Math.floor(
            (e.clientY +
              mainViewContainer.current.scrollTop -
              viewport.current.offsetTop -
              selectedElem.current.parentElement.offsetTop -
              toolbarLayout.current.offsetHeight) /
              100
          ) * 100;

        if (!["3", "5"].includes(variable["trgtId"])) {
          if (["0", "1", "2"].includes(variable["trgtId"])) {
            variable["dragPosY"] = mousePosInInteractionSpaceY;
            variable["dragPosH"] =
              variable["originalPosY"] -
              mousePosInInteractionSpaceY +
              variable["originalPosH"];
          } else if (["6", "7", "8"].includes(variable["trgtId"])) {
            variable["dragPosY"] = offsetTop;
            variable["dragPosH"] = mousePosInInteractionSpaceY - offsetTop;
          }

          selectedElem.current.style.top = `${variable["dragPosY"]}px`;
          selectedElem.current.style.height = `${variable["dragPosH"]}px`;

          componentGraphicsEditor.current.style.top = `${
            variable["dragPosY"] + viewport.current.scrollTop
          }px`;
          componentGraphicsEditor.current.style.height = `${variable["dragPosH"]}px`;
        }

        if (!["1", "7"].includes(variable["trgtId"].toString())) {
          if (["0", "3", "6"].includes(variable["trgtId"])) {
            variable["dragPosX"] = mousePosInInteractionSpaceX;
            variable["dragPosW"] =
              variable["originalPosX"] -
              mousePosInInteractionSpaceX +
              variable["originalPosW"];
          } else if (["2", "5", "8"].includes(variable["trgtId"])) {
            variable["dragPosX"] = offsetLeft;
            variable["dragPosW"] = mousePosInInteractionSpaceX - offsetLeft;
          }

          selectedElem.current.style.left = `${variable["dragPosX"]}px`;
          selectedElem.current.style.width = `${variable["dragPosW"]}px`;

          componentGraphicsEditor.current.style.left = `${
            variable["dragPosX"] + viewport.current.scrollLeft
          }px`;
          componentGraphicsEditor.current.style.width = `${variable["dragPosW"]}px`;
        }
      }
    }
  };

  const resizePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();

    const eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "default";

    document.removeEventListener("mousemove", resizePoint);
    document.removeEventListener("mouseup", resizePointOnMouseUpEvent);
  };
  // #endregion ResizePoint

  // #region RelocatePoint
  const relocatePointOnMouseDownEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "none";

    if (selectedElem.current) {
      document.addEventListener("mousemove", relocatePoint);
      document.addEventListener("mouseup", relocatePointOnMouseUpEvent);
    }
  };

  const relocatePoint = (e: MouseEvent) => {
    e.preventDefault();

    if (ctrlKeyDown == false) {
      relocatePointNormal();
    } else {
      relocatePointGridSnap();
    }

    function relocatePointNormal() {
      if (selectedElem.current && componentGraphicsEditor.current) {
        variable["dragPosX"] = selectedElem.current.offsetLeft + e.movementX;
        variable["dragPosY"] = selectedElem.current.offsetTop + e.movementY;

        selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        selectedElem.current.style.top = `${variable["dragPosY"]}px`;

        componentGraphicsEditor.current.style.left = `${
          selectedElem.current.offsetLeft - variable["adjPosPx"]
        }px`;
        componentGraphicsEditor.current.style.top = `${
          selectedElem.current.offsetTop - variable["adjPosPx"]
        }px`;
      }
    }

    // TODO Implement GridSnap
    function relocatePointGridSnap() {
      if (selectedElem.current && componentGraphicsEditor.current) {
        variable["dragPosX"] = selectedElem.current.offsetLeft + e.movementX;
        variable["dragPosY"] = selectedElem.current.offsetTop + e.movementY;

        selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        selectedElem.current.style.top = `${variable["dragPosY"]}px`;

        componentGraphicsEditor.current.style.left = `${
          selectedElem.current.offsetLeft - variable["adjPosPx"]
        }px`;
        componentGraphicsEditor.current.style.top = `${
          selectedElem.current.offsetTop - variable["adjPosPx"]
        }px`;
      }
    }
  };

  const relocatePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLElement;
    eventTarget.style.cursor = "default";

    document.removeEventListener("mousemove", relocatePoint);
    document.removeEventListener("mouseup", relocatePointOnMouseUpEvent);
  };
  // #endregion RelocatePoint

  return (
    <Wrapper
      id="component-graphics-editor"
      tabIndex={0}
      hidden={selectedNode ? false : true}
      onKeyDown={OnKeyDownEvent}
      onKeyUp={OnKeyUpEvent}
    >
      {/* <ComponentInfoBox compInfo={selectedNode} /> */}
      <BorderLine id="border-line" />
      <ResizePoint
        id="edit-point-0"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-1"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-2"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-3"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <RelocatePoint
        id="edit-point-4"
        className="fix-select"
        onMouseDown={relocatePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-5"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-6"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-7"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-8"
        className="fix-select"
        onMouseDown={resizePointOnMouseDownEvent}
      />
    </Wrapper>
  );
}
