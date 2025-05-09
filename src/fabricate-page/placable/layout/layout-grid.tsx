import styled from "styled-components";

interface GridProps {
  compKey: string;
  style: { [key: string]: string };
  [x: string]: unknown;
}

const Wrapper = styled.div`
  position: relative;

  width: 150px;
  height: 100px;

  background-color: white;
  border: 1px solid black;
`;

export default function LayoutGrid(props: GridProps) {
  const { compKey, style, ...other } = props;

  return (
    <Wrapper
      id={compKey}
      key={compKey}
      className="component panel dropzone"
      draggable="true"
      style={style}
    >
      {other["children"] as React.ReactElement[]}
    </Wrapper>
  );
}
