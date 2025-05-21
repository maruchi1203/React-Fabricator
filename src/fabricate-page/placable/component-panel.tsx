import styled from "styled-components";

interface ComponentPanelProps {
  compKey: string;
  children: React.ReactElement[];
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.div`
  position: relative;

  background-color: white;
  border: 1px solid black;
`;
// #endregion styled

export default function ComponentPanel(props: ComponentPanelProps) {
  const { compKey, children, ...other } = props;

  return (
    <Wrapper
      id={compKey}
      key={compKey}
      className="component panel dropzone"
      {...other}
    >
      {children}
    </Wrapper>
  );
}
