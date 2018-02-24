import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

class Article extends Component {

  constructor(props) {
    super(props);
  }

  createMarkUp(html) {
    return {__html: html}
  }

  render() {
    const { Article } = this.props.content
    let html = stateToHTML(convertFromRaw(Article));

    return (
      <div dangerouslySetInnerHTML={this.createMarkUp(html)} />
    )
  }

}

Article.propTypes = {
  content: PropTypes.object
}
 
export default Article