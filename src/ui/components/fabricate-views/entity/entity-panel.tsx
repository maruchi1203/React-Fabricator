import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ComponentProps {
  name: string;
  [x: string]: unknown;
}

const Wrapper = styled.div`
  position: relative;

  width: 150px;
  height: 100px;

  background-color: white;
  border: 1px solid black;
`;

export default function Panel(props: ComponentProps) {
  const { name, ...other } = props;
  const [isFocused, setFocused] = useState(false);

  const [compName, setCompName] = useState(name);

  const [dock, setDock] = useState([false, false, false, false]);

  const [margin, setMargin] = useState([0, 0, 0, 0]);
  const [padding, setPadding] = useState([0, 0, 0, 0]);

  return <Wrapper draggable="true"></Wrapper>;
}
