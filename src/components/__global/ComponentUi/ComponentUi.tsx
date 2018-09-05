/**
 *
 * ComponentUi Component
 * TODO: add some documentation here!
 *
 */

import React from "react";

import StyledComponentUi from "./StyledComponentUi";

const ComponentUi = (props) => {
  return (
    <StyledComponentUi {...props}>
      {props.children}
    </StyledComponentUi>
  );
};

export default ComponentUi;
