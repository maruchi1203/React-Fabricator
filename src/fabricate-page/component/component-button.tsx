import styled from "styled-components";

interface ButtonProps {
  compKey: string;
  style: { [key: string]: string | null };
  [x: string]: unknown;
}

// #region styled
const Wrapper = styled.button`
  position: relative;

  width: 100px;
  height: 40px;

  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;
// #endregion styled

export default function Button(props: ButtonProps) {
  const { compKey, style } = props;

  return (
    <Wrapper
      id={compKey}
      key={compKey}
      className="component button resizable"
      draggable="true"
      style={style}
    >
      Button
    </Wrapper>
  );
}
