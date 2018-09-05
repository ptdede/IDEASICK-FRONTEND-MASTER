/**
 *
 * MediaChooser Component
 * TODO: add some documentation here!
 *
 */
import React from "react";

import { MediaTypes } from "./constants";
import { IMediaChooserProps } from "./interfaces";
import StyledMediaChooser from "./StyledMediaChooser";

class MediaChooser extends React.Component<IMediaChooserProps> {

    render() {

        if (this.props.iframe && !this.props.disabled) {
            let type = this.props.type;
            if (!type) {
                type = "image";
            }
            return (
                <StyledMediaChooser
                    {...this.props}
                    onClick={this.handleChange}
                >
                    <span className={`icon ${MediaTypes[type].icon}`} />
                    <p className="label">{this.props.label ? this.props.label : MediaTypes[type].label}</p>
                </StyledMediaChooser>
            );
        }

        return null;
    }

    handleChange = () => {
        if (this.props.onChangePropTriggered) { this.props.onChangePropTriggered(); }
    }

}

export default MediaChooser;
