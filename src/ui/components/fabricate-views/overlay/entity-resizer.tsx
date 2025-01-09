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

const DragPoint = styled.div`
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

  let dragPosX = 0;
  let dragPosY = 0;

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

  // When parent changed
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    pointPosAdjustPixel = pointList.current[0].clientWidth / 2;
    setPositionOfEntityResizer();
  }, [parent]);

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

  const borderPointOnDragEvent = (e: React.DragEvent) => {};

  const relocatePointOnMouseDownEvent = (e: React.MouseEvent) => {
    if (parent) {
      document.addEventListener("mousemove", relocatePointOnMouseMoveEvent);
      document.addEventListener("mouseup", relocatePointOnMouseUpEvent);
    }
  };

  const relocatePointOnMouseMoveEvent = (e: MouseEvent) => {
    if (parent && entityResizer.current) {
      dragPosX = e.clientX;
      dragPosY = e.clientY;

      parent.style.left = `${dragPosX + pointPosAdjustPixel}px`;
      parent.style.top = `${dragPosY + pointPosAdjustPixel}px`;
      entityResizer.current.style.left = `${dragPosX}px`;
      entityResizer.current.style.top = `${dragPosY}px`;
    }
  };

  const relocatePointOnMouseUpEvent = (e: MouseEvent) => {
    document.removeEventListener("mousemove", relocatePointOnMouseMoveEvent);
    document.removeEventListener("mouseup", relocatePointOnMouseUpEvent);
  };

  return (
    <Wrapper id="entity-resizer" hidden={parent != null ? false : true}>
      <BorderLine id="border-line" />
      <DragPoint id="point0" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point1" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point2" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point3" className="tool" onDrag={borderPointOnDragEvent} />
      <RelocatePoint
        id="point4"
        className="tool"
        onMouseDown={relocatePointOnMouseDownEvent}
      />
      <DragPoint id="point5" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point6" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point7" className="tool" onDrag={borderPointOnDragEvent} />
      <DragPoint id="point8" className="tool" onDrag={borderPointOnDragEvent} />
    </Wrapper>
  );
}
