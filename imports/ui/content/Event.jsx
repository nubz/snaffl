import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EventReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering Event')
    return (
      <div></div>
    )
  }

}

EventReader.propTypes = {
  content: PropTypes.object
}
 
export default EventReader