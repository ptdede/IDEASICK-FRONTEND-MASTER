import { breakpoints } from "@idsck/assets/styles/media-queries";
import AnimationHelper from "@idsck/helpers/AnimationHelper";
import styled from "styled-components";

const StyledPageContainer = styled.div`

    transform: ${(props: any) => (props.isAnimatedOffset ? "translate3d(-20rem,0,0)" : "translate3d(0,0,0)")};
    opacity: ${(props: any) => (props.isAnimatedOffset ? "0.3" : "1")};
    transition: all .7s ${AnimationHelper.bezier.fastSlowCustom};

    @media ${breakpoints.mobileS} {
        transform: ${(props: any) => (props.isAnimatedOffset ? "translate3d(-10rem,0,0)" : "translate3d(0,0,0)")};
    }

    @media ${breakpoints.laptop} {
        transform: ${(props: any) => (props.isAnimatedOffset ? "translate3d(-20rem,0,0)" : "translate3d(0,0,0)")};
    }
`;

export default StyledPageContainer;
