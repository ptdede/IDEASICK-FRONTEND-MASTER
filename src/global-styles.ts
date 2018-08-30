import animationGlobal from "@idsck/assets/styles/animation-global";
import internalReset from "@idsck/assets/styles/internal-reset";
import mediumEditorStyle from "@idsck/assets/styles/medium-editor-custom";
import mediumEditorTheme from "@idsck/assets/styles/medium-editor-theme";
import stylesNcprogress from "@idsck/assets/styles/styles-ncprogress";
import { injectGlobal } from "styled-components";

const injectStyleGlobally =
    injectGlobal`
	/* do internal reset!! */
	${internalReset}

	${animationGlobal}

	${mediumEditorStyle}

	${mediumEditorTheme}

	${stylesNcprogress}

	.page--container {
		position: relative;
	}

	html {
		background-color: #fff;
	}
`;

export default injectStyleGlobally;
