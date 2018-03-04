import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { convertToRaw } from 'draft-js'
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class ArticleReader extends Component {

  constructor(props) {
    super(props);
    const { Article } = this.props.content
    const editorState = editorStateFromRaw(JSON.parse(Article));
    this.state = {editorState}
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        readOnly={true}/>
    )
  }

}

ArticleReader.propTypes = {
  content: PropTypes.object
}
 
export default ArticleReader