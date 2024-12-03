import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: transparent;
`;

const BorderLine = styled.div`
  border: 1px dotted black;
`;

const BorderPointContainer = styled.div`
  position: absolute;
  display: grid;
`;

const BorderPoint = styled.div`
  border: 1px solid black;
  border-radius: 50%;
`;

export default function DragResizer(parent: HTMLElement, hidden: boolean) {
  const [location, setLocation] = useState(
    (parent.clientLeft, parent.clientTop)
  );

  return (
    <Wrapper hidden={hidden}>
      <BorderLine />
      <BorderPointContainer>
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
        <BorderPoint />
      </BorderPointContainer>
    </Wrapper>
  );
}
