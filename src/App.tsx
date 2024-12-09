import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./ui/routes/home-layout";
import FabricateLayout from "./ui/routes/fabricate-layout";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  background-color: black;
  justify-content: center;
`;

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segae UI',
    Roboto, Oxygen, Ubuntu, Centarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/fabricate",
    element: <FabricateLayout />,
  },
]);

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
