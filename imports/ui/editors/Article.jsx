import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import { Cards } from '../../api/cards.js'
import { Decks } from '../../api/decks.js'
import CircularProgress from 'material-ui/CircularProgress'
import TextEditor from '../TextEditor'
import { EditorState, Editor, convertToRaw } from 'draft-js';

class Article extends Component {

  constructor(props) {
    super(props);

    if (!this.props.card.content) {
      this.props.card.content = {Article: EditorState.createEmpty()}
    }
 
    this.state = {
      open: false,
      message: 'Card added successfully',
      contentState: this.props.card.content.Article,
      content: {}
    }
  }

  multiSnackBar = (message, s) => {
    this.setState({
      open: s,
      message: message
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      content: {Article: this.state.content}
    }

    Cards.update({_id: this.props._id}, {$set: data}, () => {
      this.setState({
        open: true,
        message: 'Card edited ok'
      })
    })

  }

  uploadFiles(event) {
    imageApi.uploadFiles(event, this)
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
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