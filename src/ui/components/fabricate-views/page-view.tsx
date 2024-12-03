import styled from "styled-components";
import { useLocation } from "react-router-dom";
import EmptyTemplate from "../../templates/empty-template";
import BasicTemplate from "../../templates/basic-template";

const Wrapper = styled.div`
  width: 100%;

  align-items: center;
  justify-items: center;
`;

export default function PageView() {
  const location = useLocation().pathname.split("/");

  switch (location[location.length - 1]) {
    case "basic":
      return (
        <Wrapper>
          <BasicTemplate></BasicTemplate>
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <EmptyTemplate></EmptyTemplate>
        </Wrapper>
      );
  }
}
