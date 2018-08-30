import AnimationHelper from "@idsck/helpers/AnimationHelper";

const animationGlobal = `

	.fade-exit {
		opacity: 0;
		display: none;
	  	z-index: 0;
	}

	.fade-enter {
		opacity: 0;
	  	z-index: 1;
	}

	.fade-enter.fade-enter-active {
	 	opacity: 1;
	  	transition: opacity 600ms ease-in-out;
	}

	.react-reveal {
	    opacity: 0;
	}

	@keyframes fadeInUpCustom {
	    from {
	        opacity: 0;
	        transform: translate3d(0, 30%, 0);
	    }

	    to {
	        opacity: 1;
			transform: translate3d(0, 0, 0);
	    }
	}

	.fadeInUpCustom {
		display: block;
	    opacity: 0;
	    animation-fill-mode: both;
		transform: translate3d(0, 0, 0);
	    animation-name: fadeInUpCustom;
	    animation-timing-function: ${AnimationHelper.bezier.fastToSlow};
	}


	@keyframes fadeInLeftCustom {
	    from {
	        opacity: 0;
	        transform: translate3d(30%, 0, 0);
	    }

	    to {
	        opacity: 1;
			transform: translate3d(0, 0, 0);
	    }
	}

	.fadeInLeftCustom {
		display: block;
	    opacity: 0;
	    animation-fill-mode: both;
		transform: translate3d(0, 0, 0);
	    animation-name: fadeInLeftCustom;
	    animation-timing-function: ${AnimationHelper.bezier.fastToSlow};
	}
`;

export default animationGlobal;
