import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function EmptyTemplate() {
  const [scale, setScale] = useState<number>(1);
  const basicWidth = useRef(window.innerWidth);
  const basicHeight = useRef(window.innerHeight);

  useEffect(() => {
    (document.getElementById("root") as HTMLDivElement).addEventListener(
      "wheel",
      (e: WheelEvent) => {
        if (e.ctrlKey) e.preventDefault();
      },
      true
    );

    (document.getElementById("inner-page") as HTMLDivElement).addEventListener(
      "wheel",
      (e: WheelEvent) => {
        if (e.ctrlKey) {
          const updown = e.deltaY > 0 ? -1 : 1;
          const deltaValue = scale + 0.1 * updown;
          if (0.5 < deltaValue && deltaValue < 1.5) {
            setScale(deltaValue);
          }

          console.log(scale);
        }
      },
      true
    );
  }, [scale]);

  const InnerPage = styled.div`
    width: ${basicWidth.current * scale}px;
    height: ${basicHeight.current * scale}px;

    margin: 100px;

    background-color: black;
  `;

  const InteractionPage = styled.div`
    width: 100%;

    background-color: white;
  `;

  const onDragOverEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <InnerPage id="inner-page" tabIndex={0}>
      <InteractionPage onDragOver={onDragOverEvent}></InteractionPage>
    </InnerPage>
  );
}
