import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: 60px;
  height: 24px;

  font-weight: bold;
  border: 1px solid black;

  color: white;
  background-color: black;

  text-align: center;
  justify-content: center;
`;

export default function CreatePageButton() {
  const navigate = useNavigate();

  function OnButtonClicked() {
    navigate("/fabricate");
  }

  return <Button onClick={OnButtonClicked}></Button>;
}
