import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EventEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Event: ''}
    }

    const { Event } = props.card.content
 
    this.state = {
      content: Event
    }

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}

EventEditor.propTypes = {
  card: PropTypes.object
}
 
export default EventEditor