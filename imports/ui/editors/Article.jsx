import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../../api/cards/collection'
import DraftEditor from '../DraftEditor'
import parseIcon from "../TypeIcons";
import Paper from 'material-ui/Paper'

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
      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30}}>
        <h3 className="paperHead">{parseIcon('Entity', {height:50,width:50,color:'white'})}  Article content<span>Rich text content that can be requested as Markdown or HTML</span></h3>
        <div className="editor">
          <DraftEditor onChange={this.onChange} content={this.state.content} _id={this.props.card._id} />
        </div>
      </Paper>
    )
  }

}

ArticleEditor.propTypes = {
  card: PropTypes.object
}
 
export default ArticleEditor