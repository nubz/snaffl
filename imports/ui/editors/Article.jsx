import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../../api/cards.js'
import DraftEditor from '../DraftEditor'

class ArticleEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Article: JSON.stringify({
        "entityMap": {},
        "blocks": [
          {
            "key": "ag6qs",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
          }
        ]
      })}
    }

    const { Article } = props.card.content
 
    this.state = {
      content: Article
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const content = this.state.content

    const data = {
      content: {Article: content}
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
      content: val
    })
  }

  render() {
    return (
      <div>
        <h3>Article Content</h3>
        <div className="editor">
          <DraftEditor onChange={this.onChange} content={this.state.content} _id={this.props.card._id} />
        </div>
      </div>
    )
  }

}

ArticleEditor.propTypes = {
  card: PropTypes.object
}
 
export default ArticleEditor