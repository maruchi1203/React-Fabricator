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

const ExpandCollapseButton = styled.button`
  background: none;
  border: none;

  color: gray;
`;

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
  const { compType, compName, depth, iconToggle, expandToggle, ...other } =
    props;

  // #region variables
  const wrapperRef = useRef(null);
  // #endregion variables

  // #region useEffect
  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current as HTMLElement;
      wrapper.style.paddingLeft = `${20 * depth}px`;
    }
  }, [depth]);
  // #endregion useEffect

  return (
    <Wrapper ref={wrapperRef}>
      <ExpandCollapseButton>
        {iconToggle ? (expandToggle ? "▼" : "▶") : null}
      </ExpandCollapseButton>
      <ComponentIcon>{compType}</ComponentIcon>
      <ComponentName>{compName}</ComponentName>
    </Wrapper>
  );
}
