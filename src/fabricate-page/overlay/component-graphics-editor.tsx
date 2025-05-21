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

    toolbarLayout.current = document.getElementById("toolbar");
    viewport.current = document.getElementById("viewport");
    mainViewContainer.current = document.getElementById("main-view-container");
    borderLine.current = document.getElementById(
      "border-line"
    ) as HTMLDivElement;

    pointList.current = [];

    for (let i = 0; i < 5; i++) {
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

    setPositionOfEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode]);
  // #endregion useEffect

  // #region Initialize
  const setPositionOfEditor = () => {
    if (
      selectedElem.current &&
      selectedElem.current.parentElement &&
      componentGraphicsEditor.current &&
      viewport.current
    ) {
      componentGraphicsEditor.current.style.left = `${
        selectedElem.current.parentElement?.offsetLeft +
        selectedElem.current.offsetLeft -
        variable["adjPosPx"]
      }px`;
      componentGraphicsEditor.current.style.top = `${
        selectedElem.current.parentElement?.offsetTop +
        selectedElem.current.offsetTop -
        variable["adjPosPx"]
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
      const posAxisX = [0, selectedElem.current.offsetWidth];
      const posAxisY = [0, selectedElem.current.offsetHeight];

      for (let idx = 0; idx < pointList.current.length - 1; idx++) {
        pointList.current[idx].style.left = `${
          posAxisX[idx % posAxisX.length]
        }px`;
        pointList.current[idx].style.top = `${
          posAxisY[Math.floor(idx / posAxisY.length)]
        }px`;
      }

      pointList.current[4].style.left = `${(posAxisX[0] + posAxisX[1]) / 2}px`;
      pointList.current[4].style.top = `${(posAxisY[0] + posAxisY[1]) / 2}px`;
    }
  };
  // #endregion Initialize

  // #region Wrapper
  const OnKeyDownEvent = (e: React.KeyboardEvent) => {
    if (e.ctrlKey) {
      ctrlKeyDown = true;
    }
  };

  const OnKeyUpEvent = () => {
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
    e.preventDefault();

    if (ctrlKeyDown == false) {
      resizePointNormal(e);
    } else {
      resizePointGridSnap(e);
    }

    setPositionOfEditor();

    function resizePointNormal(e: MouseEvent) {
      if (
        selectedElem.current &&
        selectedElem.current.parentElement &&
        componentGraphicsEditor.current &&
        viewport.current
      ) {
        const elemLeft = selectedElem.current.offsetLeft;
        const elemTop = selectedElem.current.offsetTop;
        const elemWidth = selectedElem.current.offsetWidth;
        const elemHeight = selectedElem.current.offsetHeight;

        if (["0", "1"].includes(variable["trgtId"])) {
          variable["dragPosY"] = elemTop + e.movementY;
          variable["dragPosH"] = elemHeight - e.movementY;
        } else if (["2", "3"].includes(variable["trgtId"])) {
          variable["dragPosY"] = elemTop;
          variable["dragPosH"] = elemHeight + e.movementY;
        }

        if (["0", "2"].includes(variable["trgtId"])) {
          variable["dragPosX"] = elemLeft + e.movementX;
          variable["dragPosW"] = elemWidth - e.movementX;
        } else if (["1", "3"].includes(variable["trgtId"])) {
          variable["dragPosX"] = elemLeft;
          variable["dragPosW"] = elemWidth + e.movementX;
        }

        selectedNode.updateStyleOption("left", variable["dragPosX"]);
        selectedNode.updateStyleOption("top", variable["dragPosY"]);
        selectedNode.updateStyleOption("width", variable["dragPosW"]);
        selectedNode.updateStyleOption("height", variable["dragPosH"]);

        // selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        // selectedElem.current.style.top = `${variable["dragPosY"]}px`;
        // selectedElem.current.style.width = `${variable["dragPosW"]}px`;
        // selectedElem.current.style.height = `${variable["dragPosH"]}px`;

        componentGraphicsEditor.current.style.left = `${
          variable["dragPosX"] + viewport.current.scrollLeft
        }px`;
        componentGraphicsEditor.current.style.top = `${
          variable["dragPosY"] + viewport.current.scrollTop
        }px`;
        componentGraphicsEditor.current.style.width = `${variable["dragPosW"]}px`;
        componentGraphicsEditor.current.style.height = `${variable["dragPosH"]}px`;
      }
    }

    function resizePointGridSnap(e: MouseEvent) {
      if (
        selectedElem.current &&
        selectedElem.current.parentElement &&
        componentGraphicsEditor.current &&
        viewport.current &&
        mainViewContainer.current &&
        toolbarLayout.current
      ) {
        const elemLeft = selectedElem.current.offsetLeft;
        const elemTop = selectedElem.current.offsetTop;

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

        if (["0", "1"].includes(variable["trgtId"])) {
          variable["dragPosY"] = mousePosInInteractionSpaceY;
          variable["dragPosH"] =
            variable["originalPosY"] -
            mousePosInInteractionSpaceY +
            variable["originalPosH"];
        } else if (["2", "3"].includes(variable["trgtId"])) {
          variable["dragPosY"] = elemTop;
          variable["dragPosH"] = mousePosInInteractionSpaceY - elemTop;
        }

        if (["0", "2"].includes(variable["trgtId"])) {
          variable["dragPosX"] = mousePosInInteractionSpaceX;
          variable["dragPosW"] =
            variable["originalPosX"] -
            mousePosInInteractionSpaceX +
            variable["originalPosW"];
        } else if (["1", "3"].includes(variable["trgtId"])) {
          variable["dragPosX"] = elemLeft;
          variable["dragPosW"] = mousePosInInteractionSpaceX - elemLeft;
        }

        selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        selectedElem.current.style.top = `${variable["dragPosY"]}px`;
        selectedElem.current.style.width = `${variable["dragPosW"]}px`;
        selectedElem.current.style.height = `${variable["dragPosH"]}px`;

        componentGraphicsEditor.current.style.left = `${
          variable["dragPosX"] + viewport.current.scrollLeft
        }px`;
        componentGraphicsEditor.current.style.top = `${
          variable["dragPosY"] + viewport.current.scrollTop
        }px`;
        componentGraphicsEditor.current.style.width = `${variable["dragPosW"]}px`;
        componentGraphicsEditor.current.style.height = `${variable["dragPosH"]}px`;
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

    setPositionOfEditor();

    function relocatePointNormal() {
      if (
        selectedElem.current &&
        selectedElem.current.parentElement &&
        componentGraphicsEditor.current
      ) {
        variable["dragPosX"] = selectedElem.current.offsetLeft + e.movementX;
        variable["dragPosY"] = selectedElem.current.offsetTop + e.movementY;

        selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        selectedElem.current.style.top = `${variable["dragPosY"]}px`;

        componentGraphicsEditor.current.style.left = `${
          selectedElem.current.parentElement?.offsetLeft +
          selectedElem.current.offsetLeft -
          variable["adjPosPx"]
        }px`;
        componentGraphicsEditor.current.style.top = `${
          selectedElem.current.parentElement?.offsetTop +
          selectedElem.current.offsetTop -
          variable["adjPosPx"]
        }px`;
      }
    }

    function relocatePointGridSnap() {
      if (
        selectedElem.current &&
        selectedElem.current.parentElement &&
        componentGraphicsEditor.current &&
        viewport.current &&
        mainViewContainer.current &&
        toolbarLayout.current
      ) {
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

        variable["dragPosX"] = mousePosInInteractionSpaceX;
        variable["dragPosY"] = mousePosInInteractionSpaceY;

        selectedElem.current.style.left = `${variable["dragPosX"]}px`;
        selectedElem.current.style.top = `${variable["dragPosY"]}px`;

        componentGraphicsEditor.current.style.left = `${
          mousePosInInteractionSpaceX - variable["adjPosPx"]
        }px`;
        componentGraphicsEditor.current.style.top = `${
          mousePosInInteractionSpaceY - variable["adjPosPx"]
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
        className="keep-focus"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-1"
        className="keep-focus"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-2"
        className="keep-focus"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="edit-point-3"
        className="keep-focus"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <RelocatePoint
        id="edit-point-4"
        className="keep-focus"
        onMouseDown={relocatePointOnMouseDownEvent}
      />
    </Wrapper>
  );
}
