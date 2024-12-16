import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EntityResizer from "../components/fabricate-views/overlay";

interface EmptyTemplateProps {
  onDragOverEvent: (e: React.DragEvent) => void;
  onDragLeaveEvent: (e: React.DragEvent) => void;
  onDropEvent: (e: React.DragEvent) => void;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  min-width: 100%;
  min-height: 100%;

  align-content: center;
  justify-items: center;
`;

const InnerPage = styled.div`
  width: 100px;
  height: 100px;

  background-color: black;
`;

const InteractionPage = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  background-color: white;
`;

export default function EmptyTemplate(props: EmptyTemplateProps) {
  const { onDragOverEvent, onDragLeaveEvent, onDropEvent, ...other } = props;
  const [scale, setScale] = useState(1);
  const [dragResizerParent, set];
  const basicWidth = useRef(1200);
  const basicHeight = useRef(800);

  useEffect(() => {
    const pageView = document.getElementById("page-view") as HTMLDivElement;
    const innerPage = document.getElementById("inner-page") as HTMLDivElement;

    pageView.style.width = `${basicWidth.current * scale + 200}px`;
    pageView.style.height = `${basicHeight.current * scale + 200}px`;

    innerPage.style.width = `${basicWidth.current * scale}px`;
    innerPage.style.height = `${basicHeight.current * scale}px`;
  }, []);

  useEffect(() => {
    (document.getElementById("page-view") as HTMLDivElement).addEventListener(
      "wheel",
      (e: WheelEvent) => {
        if (e.ctrlKey) e.preventDefault();
      },
      true
    );

    const pageView = document.getElementById("page-view") as HTMLDivElement;
    const innerPage = document.getElementById("inner-page") as HTMLDivElement;

    pageView.style.width = `${basicWidth.current * scale + 200}px`;
    pageView.style.height = `${basicHeight.current * scale + 200}px`;

    innerPage.style.width = `${basicWidth.current * scale}px`;
    innerPage.style.height = `${basicHeight.current * scale}px`;
  }, [scale]);

  const onClickEvent = (e: React.MouseEvent) => {};

  const onWheelEvent = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      const updown = e.deltaY > 0 ? -1 : 1;
      const deltaValue = Number.parseFloat((scale + 0.1 * updown).toFixed(1));

      if (0.1 <= deltaValue && deltaValue <= 2) {
        setScale(deltaValue);
      }
    }
  };

  return (
    <Wrapper id="page-view" tabIndex={0} onWheel={onWheelEvent}>
      <InnerPage id="inner-page" tabIndex={1} onClick={onClickEvent}>
        <EntityResizer id="drag-resizer" parent={null} hidden={true} />
        <InteractionPage
          id="interaction-page"
          onDragOver={onDragOverEvent}
          onDragLeave={onDragLeaveEvent}
          onDrop={onDropEvent}
        />
      </InnerPage>
    </Wrapper>
  );
}
