/**
 *
 * WebsiteContentPlaceholder Component
 * TODO: add some documentation here!
 *
 */

import { IComponentRender } from "@idsck/components/interfaces";
import React from "react";

import StyledWebsiteContentPlaceholder from "./StyledWebsiteContentPlaceholder";

class WebsiteContentPlaceholder extends React.Component<IComponentRender> {
  render() {
     return (
      <StyledWebsiteContentPlaceholder>
        <h1>Website Content Will Appear Here</h1>
      </StyledWebsiteContentPlaceholder>
    );
  }
}

export default WebsiteContentPlaceholder;
