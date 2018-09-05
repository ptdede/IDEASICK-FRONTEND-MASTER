/**
 *
 * Paragraph
 *
 */
import { IParagraphProps, IParagraphState } from "@idsck/components/__global/Texts/Paragraph/interfaces";
import React from "react";
import Editor from "react-medium-editor";

import StyledParagraph from "./StyledParagraph";

const mediumSettings = {
	toolbar: {
		buttons: ["bold", "italic", "underline", "anchor", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
	},
};

class Paragraph extends React.Component<IParagraphProps, IParagraphState> {

	state = {
		editorState: this.props.children,
	};

	componentDidUpdate() {
		// Typical usage (don't forget to compare props):
		if (this.props.forceUpdate && this.props.children !== this.state.editorState) {
			this.setState({
				editorState: this.props.children,
			});
		}
	}

	chooseRender() {
		if (this.props.iframe && !this.props.disabled) {
			return (
				<Editor
					className="medium-editor-element"
					text={this.state.editorState}
					onChange={this.handleChange}
					options={this.props.options ? this.props.options : mediumSettings}
				/>
			);
		} else {
			if (typeof this.props.children === "object") {
				return <div>{this.props.children}</div>;
			}
			return <div dangerouslySetInnerHTML={{ __html: `${this.props.children ? this.props.children : ""}` }} />;
		}
	}

	render() {
		return (
			<StyledParagraph {...this.props}>
				{this.chooseRender()}
			</StyledParagraph>
		);
	}

	handleChange = (text, medium) => {
		this.setState({ editorState: text });
		this.props.onDataChanged(text);
	}
}

export default Paragraph;
