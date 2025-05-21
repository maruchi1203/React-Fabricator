import styled from "styled-components";

interface ButtonProps {
  compKey: string;
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.button`
  position: relative;

  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;
// #endregion styled

export default function ComponentButton(props: ButtonProps) {
  const { compKey, ...other } = props;

  return (
    <Wrapper id={compKey} key={compKey} className="component button" {...other}>
      {other["content"] as string}
    </Wrapper>
  );
}
