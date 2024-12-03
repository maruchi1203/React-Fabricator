import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px;

  flex-grow: 1;

  background-color: transparent;
`;

const EntityContainer = styled.div`
  min-height: 200px;

  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
`;

export default function EntityView() {
  return (
    <Wrapper>
      <EntityContainer></EntityContainer>
    </Wrapper>
  );
}
