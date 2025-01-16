import styled from "styled-components";
import EntityInfoDTO from "../info/entity-info-dto";

interface EntityInfoBoxProps {
  entityInfo: EntityInfoDTO;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  background-color: white;

  border: 2px solid black;
`;

const EntityInfo = styled.div`
  padding: 2px;
`;

export default function EntityInfoBox(props: EntityInfoBoxProps) {
  const { entityInfo } = props;

  return (
    <Wrapper>
      <EntityInfo>Width : {entityInfo.get("width")}</EntityInfo>
      <EntityInfo>Width : {entityInfo.get("height")}</EntityInfo>
    </Wrapper>
  );
}
