import styled from "styled-components";
import { IconComponent } from "../../Icon/icon-component";

// #region styled
const Wrapper = styled.div`
  flex-grow: 1;

  background-color: transparent;

  overflow-y: auto;
`;

const ComponentShelf = styled.div`
  height: 100%;
  min-height: 200px;

  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: black;
`;

const ComponentItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  padding: 10px;
  align-items: center;

  border: 2px solid white;
  border-bottom-left-radius: 10px;
`;
// #endregion styled

export default function ViewComponents() {
  return (
    <Wrapper>
      <ComponentShelf>
        <ComponentItem className="panel" draggable="true">
          <IconComponent width="24px" height="24px" />
          <span>Panel</span>
        </ComponentItem>
        <ComponentItem className="button" draggable="true">
          <IconComponent width="24px" height="24px" />
          <span>Button</span>
        </ComponentItem>
        <ComponentItem className="checkbox" draggable="true">
          <IconComponent width="24px" height="24px" />
          <span>Checkbox</span>
        </ComponentItem>
        <ComponentItem className="tab" draggable="true">
          <IconComponent width="24px" height="24px" />
          <span>Tab</span>
        </ComponentItem>
        <ComponentItem className="menu" draggable="true">
          <IconComponent width="24px" height="24px" />
          <span>Menu</span>
        </ComponentItem>
      </ComponentShelf>
    </Wrapper>
  );
}
