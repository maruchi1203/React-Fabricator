import styled from "styled-components";
import UpperToolBar from "../components/fabricate-views/upper-toolbar";
import PageView from "../components/fabricate-views/page-view";
import HierarchyView from "../components/fabricate-views/hierarchy-view";
import EntityView from "../components/fabricate-views/entity-view";
import React from "react";

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
    opacity: 0.1;
  }

  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track-piece {
  }
`;

const SideViewContainer = styled.div`
  background-color: gray;

  display: flex;
  flex-direction: column;

  background-color: gray;
`;

export default function FabricateLayout() {
  return (
    <Wrapper>
      <UpperToolBar />
      <WorkingSpace>
        <PageViewContainer>
          <PageView />
        </PageViewContainer>
        <SideViewContainer>
          <HierarchyView />
          <EntityView />
        </SideViewContainer>
      </WorkingSpace>
    </Wrapper>
  );
}
