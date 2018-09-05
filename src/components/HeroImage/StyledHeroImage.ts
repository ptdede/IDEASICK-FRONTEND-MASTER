import { breakpoints } from "@idsck/assets/styles/media-queries";
import StyledImage from "@idsck/components/__global/Image/StyledImage";
import StyledParagraph from "@idsck/components/__global/Texts/Paragraph/StyledParagraph";
import StyledTitle from "@idsck/components/__global/Texts/Title/StyledTitle";
import { AVAILABLE_POSITION } from "@idsck/components/constants";
import { IStyledHeroImageProps } from "@idsck/components/HeroImage/interfaces";
import styled, { css } from "styled-components";

const StyledHeroImage = styled<IStyledHeroImageProps, "div">("div")`
    position: relative;
    width: 100%;
    height: 30rem;

    @media ${breakpoints.mobileS} {
        height: 20rem;
    }

    @media ${breakpoints.tablet} {
        height: 30rem;
    }

    @media ${breakpoints.laptopL} {
        height: 32rem;
    }

    @media ${breakpoints.desktop} {
        height: 55rem;
    }

    ${StyledImage} {
        width: 100%;
        height: 100%;
    }

    .content--wrapper {
        display: flex;
        width: 100%;
        height: 100%;

        ${(props) => setPosition(props.position)}

        .content {
            max-width: 60rem;
            ${StyledTitle} {
                padding: 1rem 0;
                h1, p {
                    letter-spacing: 2px;
                }
            }

            ${StyledParagraph} {
                color: #fff;

                p {
		            line-height: .8;
                }
            }
        }
    }
`;

const setPosition = (position) => {

    const padd = css`
		padding: 6rem;
    `;

    switch (position) {
        case AVAILABLE_POSITION.topLeft:
            return css`
				justify-content: flex-start;
                align-items: flex-start;
                ${ padd};
			`;
        case AVAILABLE_POSITION.centerLeft:
            return css`
				justify-content: flex-start;
				align-items: center;
                ${ padd};
			`;
        case AVAILABLE_POSITION.bottomLeft:
            return css`
				justify-content: flex-start;
				align-items: flex-end;
                ${ padd};
			`;
        case AVAILABLE_POSITION.topRight:
            return css`
				justify-content: flex-end;
				align-items: flex-start;
                ${ padd};
			`;
        case AVAILABLE_POSITION.centerRight:
            return css`
				justify-content: flex-end;
				align-items: center;
                ${ padd};
			`;
        case AVAILABLE_POSITION.bottomRight:
            return css`
				justify-content: flex-end;
				align-items: flex-end;
                ${ padd};
            `;
        case AVAILABLE_POSITION.centerTop:
            return css`
				justify-content: center;
				align-items: flex-start;
                ${ padd};
			`;
        case AVAILABLE_POSITION.centerBottom:
            return css`
				justify-content: center;
				align-items: flex-end;
                ${ padd};
			`;
        default:
            return css`
				justify-content: center;
				align-items: center;
			`;
    }
};

export default StyledHeroImage;
