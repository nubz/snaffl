import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EntityEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Entity: ''}
    }

    const { Entity } = props.card.content
 
    this.state = {
      content: Entity
    }

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}

EntityEditor.propTypes = {
  card: PropTypes.object
}
 
export default EntityEditor