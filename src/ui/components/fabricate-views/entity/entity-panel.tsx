import styled from "styled-components";
import EntityInfoDTO from "../info/entity-info-dto";

const PanelWrapper = styled.div`
  position: relative;

  width: 150px;
  height: 100px;

  background-color: white;
  border: 1px solid black;
`;

export default function Panel() {
  const entityInfo: EntityInfoDTO = new EntityInfoDTO({});

  return (
    <PanelWrapper
      id="panel"
      className="resizable dropzone"
      draggable="true"
    ></PanelWrapper>
  );
}
