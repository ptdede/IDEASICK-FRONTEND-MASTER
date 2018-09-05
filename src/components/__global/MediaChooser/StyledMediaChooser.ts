import { breakpoints } from "@idsck/assets/styles/media-queries";
import AnimationHelper from "@idsck/helpers/AnimationHelper";
import styled, { css } from "styled-components";

import { IMediaChooserProps } from "./interfaces";

const pulseColorSecondary = "rgba(204, 169, 44, 0.7)";
const pulseColorSecondaryOff = "rgba(204, 169, 44, 0)";
const pulseColor = "rgba(255,255,255, 0.8)";
const pulseColorOff = "rgba(255,255,255, 0)";

const StyledMediaChooser = styled<IMediaChooserProps, "div">("div")`
    position: relative;
    z-index: 99;
    white-space: nowrap;

    @media ${breakpoints.mobileS} {
        display: none;
    }

    @media ${breakpoints.laptop} {
        display: block;
        position: ${(props) => (props.stacked ? "relative" : "absolute")};
        cursor: pointer;
        background: #AB987A;
        color: white;
        transition: all .2s ease-in-out;
        ${(props) => (props.position ? position(props.position) : "")}
        border: solid 2px #fff;

        &:hover {
            opacity: .8;
        }
    }

    .icon {
        display: block;
        font-size: 1.3em;
        padding: .5rem;
        box-shadow: 0 0 0 ${(props) => props.pulseSecondary ? pulseColorSecondary : pulseColor};
        animation: pulse 2s infinite;

        &:hover {
            ~.label {
                opacity: 1;
                transform: translate3d(0,0,0);
            }
            animation: none;
        }
    }

    .label {
        position: absolute;
        top: -2px;
        margin: auto;
        right: 2.3rem;
        background: #AB987A;
        padding: .63rem 1rem;
        border: solid 2px #fff;
        opacity: 0;
        pointer-events: none;
        transform: translate3d(2rem,0,0);
        transition: all .5s ${AnimationHelper.bezier.fastSlowCustom};
    }

    @keyframes pulse {

        0% {
            box-shadow: 0 0 0 0 ${(props) => props.pulseSecondary ? pulseColorSecondary : pulseColor};
        }
        70% {
            box-shadow: 0 0 0 10px ${(props) => props.pulseSecondary ? pulseColorSecondaryOff : pulseColorOff};
        }
        100% {
            box-shadow: 0 0 0 0 ${(props) => props.pulseSecondary ? pulseColorSecondaryOff : pulseColorOff};
        }
    }
`;

const position = (pos) => {
  switch (pos) {
    case "topRight":
      return css`
        top: 10px;
        right: 10px;
      `;
    case "bottomRight":
      return css`
        bottom: 10px;
        right: 10px;
      `;
    default:
      return css`
        top: 10px;
        left: 10px;
      `;
  }
};

export default StyledMediaChooser;
