import React, { useRef, useState } from "react";
import styled from "styled-components";

interface ComponentProps {
  name: string;
}

const Wrapper = styled.div`
  border: 1px solid black;
`;

export default function Panel(props: ComponentProps) {
  const [isFocused, setFocused] = useState(false);

  const [compName, setCompName] = useState(props["name"]);

  const posX = useRef(0);
  const posY = useRef(0);
  const width = useRef(100);
  const height = useRef(151.4);

  const [dock, setDock] = useState([false, false, false, false]);

  const [margin, setMargin] = useState([0, 0, 0, 0]);
  const [padding, setPadding] = useState([0, 0, 0, 0]);

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const elem = e.target as HTMLDivElement;

    posX.current = e.clientX - elem.offsetLeft;
    posY.current = e.clientY - elem.offsetTop;

    elem.style.width = `${width}px`;
    elem.style.height = `${height}px`;
  };

  const onDragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const elem = e.target as HTMLDivElement;

    posX.current = e.clientX - elem.offsetLeft;
    posY.current = e.clientY - elem.offsetTop;

    elem.style.left = `${posX}px`;
    elem.style.top = `${posY}px`;
  };

  return (
    <Wrapper
      draggable="true"
      onDragStart={onDragStartHandler}
      onDrag={onDragHandler}
    ></Wrapper>
  );
}
