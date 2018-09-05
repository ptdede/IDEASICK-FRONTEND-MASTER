/**
 *
 * Quote
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-medium-editor';
import StringHelper from '../../../helpers/StringHelper';

import StyledQuote from './StyledQuote';

class Quote extends React.Component {

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
					options={{
						toolbar: {
							buttons: ['bold', 'italic', 'underline', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
						}
					}}
				/>
			);
		} else {
			return <div dangerouslySetInnerHTML={{ __html: this.props.children }} />
		}
	}


	render() {
		return (
			<StyledQuote { ...this.props }>

				{this.chooseRender()}

			</StyledQuote>

		);
	}

	handleChange = (text, medium) => {
		this.setState({ editorState: text });
		this.props.onDataChanged(text);
	}

}

Quote.propTypes = {
	children: PropTypes.any,
	onDataChanged: PropTypes.func,
};

export default Quote;
