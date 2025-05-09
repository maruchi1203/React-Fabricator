import styled from "styled-components";
import ElementPanel from "../placable/component/component-panel";
import ComponentButton from "../placable/component/component-button";

const Wrapper = styled.div`
  flex-grow: 1;

  background-color: transparent;
`;

const ComponentShelf = styled.div`
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

const ComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: gray;
  border: 1px solid black;
  gap: 10px;
`;

export default function ComponentLayout() {
  return (
    <Wrapper>
      <ComponentShelf>
        <ComponentBox>
          <ElementPanel
            compKey={"panel"}
            style={{}}
            onDropEvent={(e: React.DragEvent) => {
              e.preventDefault();
            }}
          />
          <span>Panel</span>
        </ComponentBox>
        <ComponentBox>
          <ComponentButton compKey={"button"} style={{}} />
          <span>Button</span>
        </ComponentBox>
      </ComponentShelf>
    </Wrapper>
  );
}
