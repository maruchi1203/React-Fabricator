import styled from "styled-components";
import Home from "../components/home";

const Wrapper = styled.div`
  text-align: center;
`;

export default function HomeLayout() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
