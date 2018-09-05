/**
 *
 * BaseLayout Component
 * TODO: add some documentation here!
 *
 */

import React from "react";

import StyledBaseLayout from "./StyledBaseLayout";

function BaseLayout(props) {
  return (
    <StyledBaseLayout>
      {props.children}
    </StyledBaseLayout>
  );
}

export default BaseLayout;
