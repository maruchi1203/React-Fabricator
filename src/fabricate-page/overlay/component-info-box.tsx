import styled from "styled-components";

interface EntityInfoBoxProps {
  compInfo: CompInfoDTO | null;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  background-color: white;

  border: 2px solid black;
`;

const CompInfo = styled.div`
  padding: 2px;
`;

export default function ComponentInfoBox(props: EntityInfoBoxProps) {
  const { compInfo } = props;

  if (compInfo) {
    return (
      <Wrapper>
        <CompInfo>Left : {compInfo.get("left") as string}</CompInfo>
        <CompInfo>Top : {compInfo.get("top") as string}</CompInfo>
        <CompInfo>Width : {compInfo.get("width") as string}</CompInfo>
        <CompInfo>Height : {compInfo.get("height") as string}</CompInfo>
      </Wrapper>
    );
  } else {
    return null;
  }
}
