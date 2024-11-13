import styled from "styled-components";

export default function EmptyTemplate() {
  const Wrapper = styled.div`
    width: 100%;
    text-align: center;

    display: flex;
    flex-direction: column;
  `;

  return <Wrapper></Wrapper>;
}
