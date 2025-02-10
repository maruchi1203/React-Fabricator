import styled from "styled-components";
import NavigationMenu from "../home-page/navigation-menu";
import { CustomButton } from "../general/component";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;

  display: flex;
  text-align: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 900px;
  height: 100vh;

  margin-top: 60px;

  background-color: gray;
`;

export default function HomePage() {
  return (
    <Wrapper>
      <NavigationMenu />
      <ContentContainer>
        <CustomButton url="/fabricate">Create Page With Us</CustomButton>
      </ContentContainer>
    </Wrapper>
  );
}
