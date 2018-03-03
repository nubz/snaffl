import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EmbedEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Embed: ''}
    }

    const { Embed } = props.card.content
 
    this.state = {
      content: Embed
    }

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}

EmbedEditor.propTypes = {
  card: PropTypes.object
}
 
export default EmbedEditor