import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;

  width: 100%;
  height: 60px;
  padding: 5px 50px;

  color: black;
  background-color: white;

  display: flex;
  justify-content: space-between;
`;

const HomepageLogo = styled.a`
  background: linear-gradient(180deg, black, white);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;

  font-size: 24px;
  font-weight: bold;

  text-align: center;
  align-content: center;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const MenuItem = styled.a`
  width: 120px;

  color: black;
  text-decoration: none;

  text-align: center;
  align-content: center;

  font-size: 16px;
  font-weight: bold;

  &:hover {
    transition: font-size 0.2s ease;
    font-size: 18px;
  }
`;

export default function NavigationMenu() {
  return (
    <Wrapper>
      <HomepageLogo href="/">Fabricate🧵</HomepageLogo>
      <MenuContainer>
        <MenuItem href="/">Introduce</MenuItem>
        <MenuItem href="/">Guide Doc</MenuItem>
        <MenuItem href="/">Update Log</MenuItem>
        <MenuItem href="/">Contact</MenuItem>
      </MenuContainer>
    </Wrapper>
  );
}
