import styled from "styled-components";

interface ToolBarLayoutProps {
  id: string;
  [key: string]: unknown;
}

const Wrapper = styled.div`
  height: 64px;
  width: 100%;

  flex-shrink: 0;

  background-color: white;
`;

export default function ToolBarLayout(props: ToolBarLayoutProps) {
  const { id, ...other } = props;

  return <Wrapper id={id}></Wrapper>;
}
