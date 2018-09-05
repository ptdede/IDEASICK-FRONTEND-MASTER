import styled from "styled-components";
import { breakpoints } from "../../../assets/styles/media-queries";

const StyledSubTitle = styled.div`
    margin-bottom: 1rem;
    font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};

    @media ${breakpoints.mobileS} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.mobileM} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.mobileL} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.tablet} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.laptop} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.laptopL} {
        font-size: ${props => (props.smaller ? '1.1em' : '1.2em')};
    }

    @media ${breakpoints.desktop} {
        margin-bottom: 2rem;
        font-size: ${props => (props.smaller ? '2.1em' : '2.2em')};
    }
`;

export default StyledSubTitle;
