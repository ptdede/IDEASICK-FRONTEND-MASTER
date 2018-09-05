/**
 *
 * Gradient Component
 * TODO: add some documentation here!
 *
 */

import React from "react";

import { IGradientProps } from "./interfaces";
import StyledGradient from "./StyledGradient";

function Gradient(props: IGradientProps) {
    return (
        <StyledGradient {...props}>
            {props.children}
        </StyledGradient>
    ) ;
}

export default Gradient;
