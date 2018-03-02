import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import { convertToRaw } from 'draft-js'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";

class DraftEditor extends Component {

  constructor(props) {
    super(props);
    const editorState = editorStateFromRaw(JSON.parse(props.content));
    this.state = {editorState};
  }

  onChange = (editorState) => {
    this.setState({editorState});
    let stateToSave = editorStateToJSON(this.state.editorState)
    console.log("saving", stateToSave);
    this.props.onChange(stateToSave)
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
