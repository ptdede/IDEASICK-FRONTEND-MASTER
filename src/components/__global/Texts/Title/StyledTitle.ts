import { breakpoints } from "@idsck/assets/styles/media-queries";
import { ITitleProps } from "@idsck/components/__global/Texts/Title/interfaces";
import styled from "styled-components";

const StyledTitle = styled.div`
	position: relative;
	font-family: 'Playfair Display', serif;

	@media ${breakpoints.mobileS} {
		padding-top: ${(props: ITitleProps) => (props.noMargin ? "0" : "1rem")};
		padding-bottom: ${(props: ITitleProps) => {
			if (props.marginBottomMedium) {
				return "1rem";
			} else if (props.noMargin) {
				return "0";
			} else {
				return "1rem";
			}
		}};
	}

	@media ${breakpoints.tablet} {
		padding-top: ${(props) => (props.noMargin ? "0" : "2rem")};
		padding-bottom: ${(props) => {
			if (props.marginBottomMedium) {
				return "2rem";
			} else if (props.noMargin) {
				return "0";
			}
			return "2rem";
		}};
	}

	h1, b, i, p, u, span, div {
		font-family: 'Playfair Display', serif;
	}

	h1 {
		text-align: ${(props) => (props.centered ? "center" : "auto")};
		color: ${(props) => (props.color ? props.color : "#85194C")};
		font-size: 2em;
		font-weight: 700;
		line-height: 1.5;
	}

	span, p {
		display: block;
		text-align: ${(props) => (props.centered ? "center" : "auto")};
		color: ${(props) => (props.color ? props.color : "#85194C")};
		font-weight: 700;
		line-height: 1.5;
	}

	h1, span, p {

		@media ${breakpoints.mobileS} {
			font-size: 1.6em;
		}

		@media ${breakpoints.mobileM} {
			font-size: 1.8em;
		}

		@media ${breakpoints.mobileL} {
			font-size: 2em;
		}

		@media ${breakpoints.tablet} {
			font-size: 2.2em;
		}

		@media ${breakpoints.laptop} {
			font-size: 2em;
		}

		@media ${breakpoints.laptopL} {
			font-size: 2.3em;
		}

		@media ${breakpoints.desktop} {
			font-size: 4em;
		}
	}

	h1, p {
		h1, p, span {
			font-size: 1em !important;
		}
	}

	b {
		font-weight: 800;
	}

	i {
		font-style: italic;
	}
`;

export default StyledTitle;
