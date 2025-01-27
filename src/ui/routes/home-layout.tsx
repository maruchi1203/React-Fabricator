import styled from "styled-components";
import NavigationMenu from "../components/general/navigation-menu";

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

export default function HomeLayout() {
  return (
    <Wrapper>
      <NavigationMenu />
      <ContentContainer>
        <CustomButton url="/fabricate">Create Page With Us</CustomButton>
      </ContentContainer>
    </Wrapper>
  );
}
