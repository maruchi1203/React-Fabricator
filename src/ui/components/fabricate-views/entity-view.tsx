import styled from "styled-components";
import Panel from "./entity/entity-panel";
import Button from "./entity/entity-button";

const Wrapper = styled.div`
  flex-grow: 1;

  background-color: transparent;
`;

const EntityContainer = styled.div`
  height: 100%;
  min-height: 200px;

  padding: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
`;

const Entity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: gray;
  border: 1px solid black;
  gap: 10px;
`;

export default function EntityView() {
  return (
    <Wrapper>
      <EntityContainer>
        <Entity>
          <Panel />
          <span>Panel</span>
        </Entity>
        <Entity>
          <Button />
          <span>Button</span>
        </Entity>
      </EntityContainer>
    </Wrapper>
  );
}
