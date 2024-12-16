import React, { useState } from "react";
import styled from "styled-components";

interface EntityResizerProps {
  parent: HTMLElement | null;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  position: absolute;

  background-color: transparent;
`;

const BorderLine = styled.div`
  border: 1px dotted black;
`;

const BorderPointContainer = styled.div`
  position: relative;
`;

const BorderPoint = styled.div`
  position: absolute;

  border: 1px solid black;
  border-radius: 50%;
`;

export default function EntityResizer(props: EntityResizerProps) {
  const { parent, ...other } = props;

  const onDragEvent = (e: React.DragEvent) => {
    const eventTarget = e.target as HTMLDivElement;
  };

  return (
    <Wrapper hidden={parent != null ? false : true}>
      <BorderLine />
      <BorderPointContainer>
        <BorderPoint id="top-left" onDrag={onDragEvent} />
        <BorderPoint id="top" onDrag={onDragEvent} />
        <BorderPoint id="top-right" onDrag={onDragEvent} />
        <BorderPoint id="mid-left" onDrag={onDragEvent} />
        <BorderPoint id="mid-right" onDrag={onDragEvent} />
        <BorderPoint id="bot-left" onDrag={onDragEvent} />
        <BorderPoint id="bot" onDrag={onDragEvent} />
        <BorderPoint id="bot-right" onDrag={onDragEvent} />
      </BorderPointContainer>
    </Wrapper>
  );
}
