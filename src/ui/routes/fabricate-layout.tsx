import styled from "styled-components";
import UpperToolBar from "../components/fabricate-views/upper-toolbar";
import PageView from "../components/fabricate-views/page-view";
import HierarchyView from "../components/fabricate-views/hierarchy-view";
import EntityView from "../components/fabricate-views/entity-view";
import React, { useRef } from "react";
import GlobalOptionDTO from "../components/fabricate-views/info/global-option-dto";

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
  const globalOption: GlobalOptionDTO = new GlobalOptionDTO({ SnapGrid: "10" });
  const selectedElement = useRef<HTMLElement | null>(null);

  let dragStartPosX = 0;
  let dragStartPosY = 0;

  // #region PageView
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
      selectedElement.current != null &&
      eventTarget.classList.contains("dropzone")
    ) {
      const newElem = selectedElement.current.cloneNode(true) as HTMLElement;
      newElem.setAttribute("draggable", "false");
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
  // #endregion PageView

  // #region SideViewContainer
  const onDragStartEvent = (e: React.DragEvent) => {
    selectedElement.current = e.target as HTMLElement;

    dragStartPosX = e.clientX - selectedElement.current.offsetLeft;
    dragStartPosY = e.clientY - selectedElement.current.offsetTop;
  };

  const onDragEndEvent = (e: React.DragEvent) => {
    e.preventDefault();

    selectedElement.current = null;
  };
  // #endregion SideViewContainer

  return (
    <Wrapper>
      <UpperToolBar></UpperToolBar>
      <WorkingSpace>
        <PageViewContainer id="page-view-container">
          <PageView
            onDragOverEvent={onDragOverEvent}
            onDragLeaveEvent={onDragLeaveEvent}
            onDropEvent={onDropEvent}
            globalOption={globalOption}
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
