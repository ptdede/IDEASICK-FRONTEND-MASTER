/**
 *
 * Title
 *
 */
import { ITitleProps, ITitleState } from "@idsck/components/__global/Texts/Title/interfaces";
import React from "react";
import Editor from "react-medium-editor";

import StyledTitle from "./StyledTitle";

const mediumSetting = (props) => {
    return {
        toolbar: {
            buttons: ["bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
        },
        disableReturn: !props.multiline ? true : false,
        disableDoubleReturn: !props.multiline ? true : false,
    };
};

class Title extends React.Component<ITitleProps, ITitleState> {

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
                    tag="h1"
                    className="medium-editor-element"
                    text={this.state.editorState}
                    onChange={this.handleChange}
                    options={mediumSetting(this.props)}
                />
            );
        } else {
            return <h1 dangerouslySetInnerHTML={{ __html: `` + this.props.children }} />;
        }
    }

    render() {
        return (
            <StyledTitle {...this.props}>
                {this.chooseRender()}
            </StyledTitle>

        );
    }

    handleChange = (text) => {
        this.setState({ editorState: text });
        if (this.props.onDataChanged) { this.props.onDataChanged(text); }
    }

}

export default Title;
