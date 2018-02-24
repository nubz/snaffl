import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../../api/cards.js'
import TextEditor from '../TextEditor'
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';

class Article extends Component {

  constructor(props) {
    super(props);

    if (!this.props.card.content) {
      this.props.card.content = {Article: convertToRaw(EditorState.createEmpty().getCurrentContent())}
    }

    const { Article } = this.props.card.content
 
    this.state = {
      contentState: EditorState.createWithContent(convertFromRaw(Article)),
      content: {}
    }
  }

  onChange = (val) => {
    this.setState({
      contentState: val,
      content: convertToRaw(val.getCurrentContent())
    })
  }

  render() {
    return (
      <div className="form-group">
        <h3>Article Content</h3>
        <TextEditor onChange={this.onChange} content={this.state.contentState} _id={this.props.card._id} />
      </div>
    )
  }

}

Article.propTypes = {
  card: PropTypes.object
}
 
export default Article