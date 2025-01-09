import styled from "styled-components";

const PanelWrapper = styled.div`
  position: relative;

  width: 150px;
  height: 100px;

  background-color: white;
  border: 1px solid black;
`;

export default function Panel() {
  return (
    <PanelWrapper
      id="panel"
      className="resizable dropzone"
      draggable="true"
    ></PanelWrapper>
  );
}
