import styled from 'styled-components';
import { breakpoints, paddings } from '../../../assets/styles/media-queries';

const StyledQuote = styled.blockquote`
	position: relative;
	display: flex;
	font-size: 1.2em;
	font-weight: 300;
	line-height: 1.5;
	
	margin-top: 2rem;
	margin-bottom: 2rem;

	@media ${breakpoints.mobileS} {
		font-size: 1em;
		margin: 0;
		quotes: "“" "”";
		padding-left: 2rem;
 
		&:before {
			position: absolute;
			content: open-quote;
			font-family: 'Playfair Display', serif;
			margin: 0;
			font-size: 4em;
			color: #85194C;
			background-color: transparent;
			line-height: 1;
			top: -.8rem;
			left: 0;
		}
	}

	@media ${breakpoints.mobileM} {
		font-size: 1.1em;
	}

	@media ${breakpoints.mobileL} {
		font-size: 1.2em;
	}

	@media ${breakpoints.tablet} {
		font-size: 1.3em;
		padding-left: 0;

		&:before {
			position: static;
			content: '';
			width: 2px;
			flex: 0 0 2px;
			height: auto;
			background-color: #85194C;
			margin-left: 1rem;
			margin-right: 1rem;
			margin-top: .5rem;
			margin-bottom: .5rem;
		}

		&>div:before {
			display: none;
		}
	}

	@media ${breakpoints.laptop} {
		&:before {
			margin-left: 2rem;
			margin-right: 2rem;
		}
	}

	@media ${breakpoints.laptopL} {
		font-size: 1.5em;

		&:before {
			margin-left: 2rem;
			margin-right: 2rem;
		}

	}

	@media ${breakpoints.desktop} {
		font-size: 2.2em;
	}

	b {
		font-weight: 800;
	}

	i {
		font-style: italic;
	}
`;

export default StyledQuote;
