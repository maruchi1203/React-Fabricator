import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface EntityResizerProps {
  parent: HTMLElement | null;
  [x: string]: unknown;
}

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

export default function EntityResizer(props: EntityResizerProps) {
  const { parent } = props;

  const entityResizer = useRef<HTMLElement | null>(null);
  const borderLine = useRef<HTMLDivElement | null>(null);
  const pointList: React.MutableRefObject<HTMLDivElement[]> = useRef([]);

  let eventTarget: HTMLDivElement | null = null;
  let trgtId = "-1";

  let dragPosX = 0;
  let dragPosY = 0;
  let dragPosW = 0;
  let dragPosH = 0;

  let pointPosAdjustPixel = 0;

  // When Loaded
  useEffect(() => {
    entityResizer.current = document.getElementById(
      "entity-resizer"
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

  // When Parent Changed
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pointPosAdjustPixel = pointList.current[0].clientWidth / 2;
    setPositionOfEntityResizer();
  }, [parent]);

  // #region Initialize
  const setPositionOfEntityResizer = () => {
    if (parent && entityResizer.current) {
      entityResizer.current.style.left = `${
        parent.offsetLeft - pointPosAdjustPixel
      }px`;
      entityResizer.current.style.top = `${
        parent.offsetTop - pointPosAdjustPixel
      }px`;
      entityResizer.current.style.width = `${
        parent.offsetWidth + pointPosAdjustPixel * 2
      }px`;
      entityResizer.current.style.height = `${
        parent.offsetHeight + pointPosAdjustPixel * 2
      }px`;

      setPositionOfBorderLine();
      setPositionOfBorderPoint();
    }
  };

  const setPositionOfBorderLine = () => {
    if (parent && borderLine.current) {
      borderLine.current.style.left = `${pointPosAdjustPixel}px`;
      borderLine.current.style.top = `${pointPosAdjustPixel}px`;
      borderLine.current.style.width = `${parent.offsetWidth}px`;
      borderLine.current.style.height = `${parent.offsetHeight}px`;
    }
  };

  const setPositionOfBorderPoint = () => {
    if (parent) {
      const posAxisX = [
        0,
        (parent?.offsetWidth - pointPosAdjustPixel) / 2,
        parent?.offsetWidth - pointPosAdjustPixel,
      ];

      const posAxisY = [
        0,
        (parent?.offsetHeight - pointPosAdjustPixel) / 2,
        parent?.offsetHeight - pointPosAdjustPixel,
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
    if (parent) {
      eventTarget = e.target as HTMLDivElement;
      trgtId = eventTarget.id[eventTarget.id.length - 1];

      document.addEventListener("mousemove", resizePointOnMouseMoveEvent);
      document.addEventListener("mouseup", resizePointOnMouseUpEvent);
    }
  };

  const resizePointOnMouseMoveEvent = (e: MouseEvent) => {
    if (parent && entityResizer.current) {
      if (!["3", "5"].includes(trgtId)) {
        if (["0", "1", "2"].includes(trgtId)) {
          dragPosY = parent.offsetTop + e.movementY;
          dragPosH = parent.offsetHeight - e.movementY;
        } else if (["6", "7", "8"].includes(trgtId)) {
          dragPosY = parent.offsetTop;
          dragPosH = parent.offsetHeight + e.movementY;
        }

        parent.style.top = `${dragPosY}px`;
        parent.style.height = `${dragPosH}px`;

        entityResizer.current.style.top = `${dragPosY - pointPosAdjustPixel}px`;
        entityResizer.current.style.height = `${
          dragPosH - pointPosAdjustPixel
        }px`;
      }

      if (!["1", "7"].includes(trgtId)) {
        if (["0", "3", "6"].includes(trgtId)) {
          dragPosX = parent.offsetLeft + e.movementX;
          dragPosW = parent.offsetWidth - e.movementX;
        } else if (["2", "5", "8"].includes(trgtId)) {
          dragPosX = parent.offsetLeft;
          dragPosW = parent.offsetWidth + e.movementX;
        }

        parent.style.left = `${dragPosX}px`;
        parent.style.width = `${dragPosW}px`;

        entityResizer.current.style.left = `${
          dragPosX - pointPosAdjustPixel
        }px`;
        entityResizer.current.style.width = `${
          dragPosW - pointPosAdjustPixel
        }px`;
      }

      setPositionOfEntityResizer();
    }
  };

  const resizePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();

    document.removeEventListener("mousemove", resizePointOnMouseMoveEvent);
    document.removeEventListener("mouseup", resizePointOnMouseUpEvent);
  };
  // #endregion ResizePoint

  // #region RelocatePoint
  const relocatePointOnMouseDownEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    if (parent) {
      document.addEventListener("mousemove", relocatePointOnMouseMoveEvent);
      document.addEventListener("mouseup", relocatePointOnMouseUpEvent);
    }
  };

  const relocatePointOnMouseMoveEvent = (e: MouseEvent) => {
    e.preventDefault();

    if (parent && entityResizer.current) {
      dragPosX = parent.offsetLeft + e.movementX;
      dragPosY = parent.offsetTop + e.movementY;

      parent.style.left = `${dragPosX}px`;
      parent.style.top = `${dragPosY}px`;

      entityResizer.current.style.left = `${
        parent.offsetLeft - pointPosAdjustPixel
      }px`;
      entityResizer.current.style.top = `${
        parent.offsetTop - pointPosAdjustPixel
      }px`;
    }
  };

  const relocatePointOnMouseUpEvent = (e: MouseEvent) => {
    e.preventDefault();

    document.removeEventListener("mousemove", relocatePointOnMouseMoveEvent);
    document.removeEventListener("mouseup", relocatePointOnMouseUpEvent);
  };
  // #endregion RelocatePoint

  const SnapToGrid = () => {};

  return (
    <Wrapper id="entity-resizer" hidden={parent ? false : true}>
      <BorderLine id="border-line" />
      <ResizePoint
        id="point0"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point1"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point2"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point3"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <RelocatePoint
        id="point4"
        className="tool"
        onMouseDown={relocatePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point5"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point6"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point7"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
      <ResizePoint
        id="point8"
        className="tool"
        onMouseDown={resizePointOnMouseDownEvent}
      />
    </Wrapper>
  );
}
