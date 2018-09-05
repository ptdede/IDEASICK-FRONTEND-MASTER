/**
 *
 * PageContainer Component
 * TODO: add some documentation here!
 *
 */

import React from "react";

import StyledPageContainer from "./StyledPageContainer";

class PageContainer extends React.Component {
  render() {
     return (
      <StyledPageContainer>
        {this.props.children}
      </StyledPageContainer>
    );
  }
}

export default PageContainer;
