import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type ButtonProps = {
  children: string | null;
  [x: string]: unknown;
};

const Button = styled.button`
  width: 200px;
  height: 60px;

  font-weight: bold;
  border: 1px solid black;

  color: white;
  background-color: black;

  text-align: center;
  justify-content: center;

  cursor: pointer;
`;

export default function CustumButton(props: ButtonProps) {
  const { children, ...other } = props;
  const navigate = useNavigate();

  function OnButtonClicked() {
    navigate(other["url"] as string);
  }

  return (
    <Button onClick={OnButtonClicked} {...other}>
      {children}
    </Button>
  );
}
