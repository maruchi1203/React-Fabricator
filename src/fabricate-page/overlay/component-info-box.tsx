import styled from "styled-components";
import ComponentTreeNode from "../info/component-tree-node";

interface EntityInfoBoxProps {
  selectedNode: ComponentTreeNode | null;
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
  const { selectedNode } = props;
  const styleOption = 

  const variables = {
    offsetleft: ,
  };

  return (
    <Wrapper>
      {
        array.forEach(element => {
          
        });
      }
      <CompInfo>Left : {variables["left"] as string}</CompInfo>
      <CompInfo>Top : {variables["top"] as string}</CompInfo>
      <CompInfo>Width : {variables["left"] as string}</CompInfo>
      <CompInfo>Height : {variables["left"] as string}</CompInfo>
    </Wrapper>
  );
}
