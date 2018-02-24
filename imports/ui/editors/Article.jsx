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

const startTime = new Date()
const styles = {
  formStyle: {
    marginBottom: 30
  },
  floatingLabelStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500
  },
  imagePreview: {
    display: 'block',
    marginBottom: 20,
    maxWidth: '100%'
  },
  fileInput: {
    display: 'none'
  },
}

class Article extends Component {

  constructor(props) {
    super(props);

    if (!this.props.card.content) {
      this.props.card.content = {Article: 'test content'}
    }
 
    this.state = {
      open: false,
      message: 'Card added successfully',
      content: this.props.card.content.Article
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
    let content = convertToRaw(val.getCurrentContent()).blocks[0].text
    console.log('changing editor ', content)
    this.setState({
      content: content
    })
  }

  render() {
    return (
      <div>
        { !this.props.isNew ?
          <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
            <div className="form-group">
              <h3>Article Content</h3>
              <TextEditor ref={(fieldEditor) => {this.fieldEditor = fieldEditor;}} onChange={this.onChange} content={this.state.content} _id={this.props.card._id} />
            </div>

            <div className="form-group">
              <RaisedButton type="submit" label="Save Edits" primary={true} />
            </div>
            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </form>
        :
          <div className="form-group">
            <h3>Article Content</h3>
            <TextEditor ref={(fieldEditor) => {this.fieldEditor = fieldEditor;}} onChange={this.onChange} content={this.state.content} _id={this.props.card._id} />
          </div>
      }
      </div>
    )
  }

}

Article.propTypes = {
  card: PropTypes.object,
  isNew: PropTypes.bool
}
 
export default Article