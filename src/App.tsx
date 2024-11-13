import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./ui/routes/home-layout";
import LoadingScreen from "./ui/components/loading-screen";
import FabricateLayout from "./ui/routes/fabricate-layout";
import EmptyTemplate from "./ui/templates/empty-template";
import BasicTemplate from "./ui/templates/basic-template";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/fabricate",
    element: <FabricateLayout />,
    children: [
      {
        path: "",
        element: <EmptyTemplate />,
      },
      {
        path: "/basic",
        element: <BasicTemplate />,
      },
    ],
  },
]);

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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
