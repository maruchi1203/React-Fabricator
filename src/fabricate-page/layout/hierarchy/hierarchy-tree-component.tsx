import { useEffect, useRef } from "react";
import styled from "styled-components";

interface HierarchyTreeComponentProps {
  compType: string;
  compName: string;
  depth: number;
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  width: 100%;
  padding: 3px;

  display: flex;
  color: black;

  background-color: white;

  border-radius: 10px;

  &:hover {
    background-color: lightgray;
  }
`;

const ExpandCollapseIcon = styled.div``;

const ComponentIcon = styled.div`
  padding: 5px;
`;

const ComponentName = styled.div`
  padding: 5px;
`;
// #endregion styled

export default function HierarchyTreeComponent(
  props: HierarchyTreeComponentProps
) {
  const { compType, compName, depth, ecToggle, ...other } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current as HTMLElement;
      wrapper.style.paddingLeft = `${20 * depth}px`;
    }
  }, [depth]);

  return (
    <Wrapper ref={wrapperRef}>
      <ExpandCollapseIcon>{ecToggle ? "▼" : "▲"}</ExpandCollapseIcon>
      <ComponentIcon>{compType}</ComponentIcon>
      <ComponentName>{compName}</ComponentName>
    </Wrapper>
  );
}
