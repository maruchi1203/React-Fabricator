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
  const dragElem = useRef<HTMLElement | null>(null);

  const onDragStartEvent = (e: React.DragEvent) => {
    dragElem.current = e.target as HTMLElement;
    console.log(dragElem.current);
  };

  const onDragEndEvent = (e: React.DragEvent) => {
    e.preventDefault();
    dragElem.current = null;
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();

    (e.target as HTMLElement).style.backgroundColor = "lightgray";
  };

  const onDragLeaveEvent = (e: React.DragEvent) => {
    e.preventDefault();

    (e.target as HTMLElement).style.backgroundColor = "white";
  };

  const onDropEvent = (e: React.DragEvent) => {
    e.preventDefault();

    const eventTarget = e.target as HTMLElement;
    eventTarget.style.backgroundColor = "white";
    if (dragElem.current != null) {
      const newElem = dragElem.current.cloneNode(true);
      eventTarget.appendChild(newElem as HTMLElement);
    }
  };

  return (
    <Wrapper>
      <UpperToolBar />
      <WorkingSpace>
        <PageViewContainer>
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
