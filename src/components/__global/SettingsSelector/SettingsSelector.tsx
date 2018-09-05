/**
 *
 * SettingsSelector Component
 * TODO: add some documentation here!
 *
 */

import React from "react";

import { ISettingsSelector } from "./interfaces";
import StyledSettingsSelector from "./StyledSettingsSelector";

class SettingsSelector extends React.Component<ISettingsSelector> {

  render() {
    if (this.props.iframe && !this.props.disabled) {
      return (
        <StyledSettingsSelector
          {...this.props}
          onClick={this.handleChange}
        >
          <span>{this.props.children}</span>
        </StyledSettingsSelector>
      );
    }

    return null;
  }

  handleChange = (e) => {
    if (this.props.onChangeSettingsTriggered) { this.props.onChangeSettingsTriggered(); }
  }
}

export default SettingsSelector;
