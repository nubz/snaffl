import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { Location } = this.props.content
    return (
      <div>
        <p>Address: {Location.address}</p>
        <p>Postcode: {Location.postcode}</p>
      </div>
    )
  }

}

LocationReader.propTypes = {
  content: PropTypes.object
}
 
export default LocationReader