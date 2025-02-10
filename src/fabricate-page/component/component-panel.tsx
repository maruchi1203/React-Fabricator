import styled from "styled-components";

interface PanelProps {
  compKey: string;
  style: { [key: string]: string };
  onDropEvent: (e: React.DragEvent) => void;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  position: relative;

  width: 150px;
  height: 100px;

  background-color: white;
  border: 1px solid black;
`;

export default function Panel(props: PanelProps) {
  const { compKey, style, onDropEvent } = props;

  return (
    <Wrapper
      id={compKey}
      key={compKey}
      className="component panel resizable dropzone"
      draggable="true"
      style={style}
      onDrop={onDropEvent}
    ></Wrapper>
  );
}
