import { breakpoints } from "@idsck/assets/styles/media-queries";
import styled from "styled-components";

import { IParagraphProps } from "./interfaces";

const StyledParagraph = styled<IParagraphProps, "div">("div")`

	h2, h3, h4, h5 {
		line-height: 1.5;

		@media ${breakpoints.mobileS} {
			font-size: 1.1em;
		}

		@media ${breakpoints.mobileM} {
			font-size: 1.2em;
		}

		@media ${breakpoints.tablet} {
			font-size: 1.2em;
		}

		@media ${breakpoints.laptopL} {
			font-size: 1.5em;
		}

		@media ${breakpoints.desktop} {
			font-size: 2.2em;
		}
	}

	p {
		font-weight: 400;
		line-height: 1.7;
		margin-top: 1rem;
		margin-bottom: 1rem;
		text-align: ${(props) => (props.centered ? "center" : "auto")};

		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}

		@media ${breakpoints.mobileS} {
			font-size: .9em;
		}

		@media ${breakpoints.mobileM} {
			font-size: 1em;
		}

		@media ${breakpoints.tablet} {
			font-size: 1.1em;
		}

		@media ${breakpoints.laptop} {
			font-size: 1em;
		}

		@media ${breakpoints.laptopL} {
			font-size: 1.3em;
			margin-top: 2rem;
			margin-bottom: 2rem;
		}

		@media ${breakpoints.desktop} {
			font-size: 2em;
			margin-top: 3rem;
			margin-bottom: 3rem;
		}
	}

	b {
		font-weight: 800;
	}

	i {
		font-style: italic;
	}

	a {
		color: #438496;

		&:hover {
			opacity: .8;
		}
	}
`;

export default StyledParagraph;
