import React, { Component } from "react";
import PropTypes from 'prop-types'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";

class DraftEditor extends Component {

  constructor(props) {
    super(props);
    const editorState = editorStateFromRaw(JSON.parse(props.content));
    this.state = {editorState};
  }

  onChange = (editorState) => {
    this.setState({editorState});
    this.props.onChange(editorStateToJSON(this.state.editorState))
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.onChange}/>
    )
  }
}

DraftEditor.propTypes = {
  content: PropTypes.string
}

export default DraftEditor
