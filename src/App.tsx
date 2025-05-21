import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/home-page";
import FabricatePage from "./routes/fabricate-page";
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
  @font-face { font-family: 'NanumBarunGothic';src: url('/fonts/NanumBarunGothic.eot');src: url('/fonts/NanumBarunGothic.eot') format('embedded-opentype'),url('/fonts/NanumBarunGothic.woff') format('woff'), system-ui, -apple-system, BlinkMacSystemFont, 'Segae UI',
    Roboto, Oxygen, Ubuntu, Centarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;}
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/fabricate",
    element: <FabricatePage />,
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
