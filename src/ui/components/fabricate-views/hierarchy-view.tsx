import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px;

  flex-grow: 1;

  background-color: transparent;
`;

const HierarchyTreeContainer = styled.div`
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
