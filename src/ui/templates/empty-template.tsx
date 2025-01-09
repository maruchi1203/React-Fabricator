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
  position: relative;
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
  const { onDragOverEvent, onDragLeaveEvent, onDropEvent } = props;

  const pageView = useRef<HTMLDivElement | null>(null);
  const innerPage = useRef<HTMLDivElement | null>(null);

  const [parent, setParent] = useState<HTMLElement | null>(null);

  const [scale, setScale] = useState(1);

  const basicWidth = 1200;
  const basicHeight = 800;

  useEffect(() => {
    pageView.current = document.getElementById("page-view") as HTMLDivElement;
    innerPage.current = document.getElementById("inner-page") as HTMLDivElement;

    pageView.current.style.width = `${basicWidth + 200}px`;
    pageView.current.style.height = `${basicHeight + 200}px`;

    innerPage.current.style.width = `${basicWidth}px`;
    innerPage.current.style.height = `${basicHeight}px`;
  }, []);

  useEffect(() => {
    if (pageView.current && innerPage.current) {
      pageView.current.addEventListener(
        "wheel",
        (e: WheelEvent) => {
          if (e.ctrlKey) e.preventDefault();
        },
        true
      );

      pageView.current.style.width = `${basicWidth * scale + 200}px`;
      pageView.current.style.height = `${basicHeight * scale + 200}px`;

      innerPage.current.style.width = `${basicWidth * scale}px`;
      innerPage.current.style.height = `${basicHeight * scale}px`;
    }
  }, [scale]);

  const onClickEvent = (e: React.MouseEvent) => {
    e.preventDefault();

    const eventTarget = e.target as HTMLElement;

    if (eventTarget.classList.contains("resizable")) {
      setParent(eventTarget);
    } else if (eventTarget.classList.contains("tool")) {
      setParent(parent);
    } else {
      setParent(null);
    }
  };

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
    <Wrapper
      id="page-view"
      tabIndex={0}
      onWheel={onWheelEvent}
      onClick={onClickEvent}
    >
      <InnerPage id="inner-page" tabIndex={1}>
        <EntityResizer parent={parent} hidden={true} />
        <InteractionPage
          id="interaction-page"
          className="resizable dropzone"
          onDragOver={onDragOverEvent}
          onDragLeave={onDragLeaveEvent}
          onDrop={onDropEvent}
        />
      </InnerPage>
    </Wrapper>
  );
}
