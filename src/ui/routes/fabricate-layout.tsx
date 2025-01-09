import styled from "styled-components";
import UpperToolBar from "../components/fabricate-views/upper-toolbar";
import PageView from "../components/fabricate-views/page-view";
import HierarchyView from "../components/fabricate-views/hierarchy-view";
import EntityView from "../components/fabricate-views/entity-view";
import React, { useRef } from "react";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const WorkingSpace = styled.div`
  width: 100%;

  flex: 1 1 auto;

  display: grid;
  grid-template-columns: 1fr 500px;
  overflow-y: hidden;
`;

const PageViewContainer = styled.div`
  background-color: gray;

  overflow: scroll;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar:hover {
    width: 20px;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;

    background-color: lightgray;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const SideViewContainer = styled.div`
  background-color: gray;

  display: flex;
  flex-direction: column;

  background-color: gray;
`;

export default function FabricateLayout() {
  const selectedElem = useRef<HTMLElement | null>(null);
  let dragStartPosX = 0,
    dragStartPosY = 0;

  const onDragStartEvent = (e: React.DragEvent) => {
    selectedElem.current = e.target as HTMLElement;

    dragStartPosX = e.clientX - selectedElem.current.offsetLeft;
    dragStartPosY = e.clientY - selectedElem.current.offsetTop;
  };

  const onDragEndEvent = (e: React.DragEvent) => {
    e.preventDefault();

    selectedElem.current = null;
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDragLeaveEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDropEvent = (e: React.DragEvent) => {
    const eventTarget = e.target as HTMLElement;

    const pageViewController = document.getElementById(
      "page-view-container"
    ) as HTMLElement;
    const innerPage = document.getElementById("inner-page") as HTMLElement;

    if (
      selectedElem.current != null &&
      eventTarget.classList.contains("dropzone")
    ) {
      const newElem = selectedElem.current.cloneNode(true) as HTMLElement;
      newElem.removeAttribute("draggable");
      eventTarget.appendChild(newElem);

      newElem.style.position = "absolute";

      newElem.style.left = `${
        e.clientX +
        pageViewController.scrollLeft -
        innerPage.offsetLeft -
        dragStartPosX
      }px`;

      newElem.style.top = `${
        e.clientY +
        pageViewController.scrollTop -
        innerPage.offsetTop -
        dragStartPosY
      }px`;
    }
  };

  return (
    <Wrapper>
      <UpperToolBar />
      <WorkingSpace>
        <PageViewContainer id="page-view-container">
          <PageView
            onDragOverEvent={onDragOverEvent}
            onDragLeaveEvent={onDragLeaveEvent}
            onDropEvent={onDropEvent}
          />
        </PageViewContainer>
        <SideViewContainer
          onDragStart={onDragStartEvent}
          onDragEnd={onDragEndEvent}
        >
          <HierarchyView />
          <EntityView />
        </SideViewContainer>
      </WorkingSpace>
    </Wrapper>
  );
}
