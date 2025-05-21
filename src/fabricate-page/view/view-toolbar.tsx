import styled from "styled-components";

interface ViewToolbarProps {
  id: string;
  [key: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  height: 64px;
  width: 100%;

  flex-shrink: 0;

  background-color: black;
`;
// #endregion styled

export default function ViewToolbar(props: ViewToolbarProps) {
  const { id } = props;

  return <Wrapper id={id}></Wrapper>;
}
