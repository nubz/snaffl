import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering Location')
    return (
      <div></div>
    )
  }

}

LocationReader.propTypes = {
  content: PropTypes.object
}
 
export default LocationReader