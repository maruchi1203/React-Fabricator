import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;

  background-color: transparent;
`;

const HierarchyTreeContainer = styled.div`
  height: 100%;
  min-height: 200px;

  padding: 10px;

  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
`;

export default function HierarchyView() {
  return (
    <Wrapper>
      <HierarchyTreeContainer></HierarchyTreeContainer>
    </Wrapper>
  );
}
