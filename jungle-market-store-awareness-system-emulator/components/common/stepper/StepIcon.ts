import React from "react";
import styled from "styled-components";

import Check from "../icons/Check";
import Cross from "../icons/Cross";

import StepIconCircle from "./StepIconCircle";
import StepIconJoiner from "./StepIconJoiner";

const SmallCheck = styled(Check)`
  height: 1em;
`;
const SmallCross = styled(Cross)`
  height: 1em;
`;

export default styled.div.attrs({
  children: [
    React.createElement(StepIconCircle, { key: "circle" }, [
      React.createElement(SmallCheck, { key: "check" }),
      React.createElement(SmallCross, { key: "cross" })
    ]),
    React.createElement(StepIconJoiner, { key: "joiner" })
  ]
})`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
