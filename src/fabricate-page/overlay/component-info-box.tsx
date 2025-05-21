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

  return <Wrapper></Wrapper>;
}
