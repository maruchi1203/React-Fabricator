import styled from "styled-components";

const ButtonWrapper = styled.button`
  position: relative;

  width: 100px;
  height: 40px;

  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;

export default function Button() {
  return (
    <ButtonWrapper id="button" className="resizable" draggable="true">
      Button
    </ButtonWrapper>
  );
}
