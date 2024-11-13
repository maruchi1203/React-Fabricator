import styled from "styled-components";

export default function LoadingScreen() {
  const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    text-align: center;
    justify-content: center;
  `;

  const LoadingAnimContainer = styled.div`
    width: 60px;
    height: 60px;
  `;

  const LoadingAnimation = styled.div`
    background-color: green;
  `;

  return (
    <Wrapper>
      <LoadingAnimContainer>
        <LoadingAnimation />
      </LoadingAnimContainer>
    </Wrapper>
  );
}
