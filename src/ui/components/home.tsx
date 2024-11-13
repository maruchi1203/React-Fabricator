import styled from "styled-components";
import CreatePageButton from "./button";

export default function Home() {
  const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  `;

  return (
    <Wrapper>
      <CreatePageButton />
    </Wrapper>
  );
}
