import styled from "styled-components";

export default function BasicTemplate() {
  const Wrapper = styled.div`
    width: 100%;
    text-align: center;

    display: flex;
    flex-direction: column;
  `;

  return <Wrapper></Wrapper>;
}
