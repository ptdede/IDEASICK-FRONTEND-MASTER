import styled from "styled-components";

import { IGradientProps } from "./interfaces";

const StyledGradient = styled<IGradientProps, "div">("div")`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .6;
        background: ${(props) => `linear-gradient(45deg, ${props.from} 0%, ${props.to} 100%)`};
    }
`;

export default StyledGradient;
