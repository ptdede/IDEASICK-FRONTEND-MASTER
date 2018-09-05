/**
*
* SubTitle
*
*/

import React from 'react';
import StyledSubtitle from './StyledSubtitle';

import Editor from 'react-medium-editor';
import StringHelper from '../../../helpers/StringHelper';

class SubTitle extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.props.children
    }
  }

  chooseRender() {
    if (this.props.iframe && !this.props.disabled) {
      return (
        <Editor
					className="medium-editor-element"
          text={this.state.editorState}
          onChange={this.handleChange}
        />
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: this.props.children }} />
    }
  }

  handleChange = (text, medium) => {
    this.setState({ editorState: text });

    if (this.props.onDataChanged)
        this.props.onDataChanged(text);
  }

  render() {
    return (
      <StyledSubtitle {...this.props}>
        {this.chooseRender()}
      </StyledSubtitle>
    );
  }
}

SubTitle.propTypes = {

};

export default SubTitle;
