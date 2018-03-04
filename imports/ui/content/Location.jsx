import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapCard from '../MapCard'

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
        <h3>Location map</h3>
        <MapCard locationMap={true} card={this.props.card} />
      </div>
    )
  }

}

LocationReader.propTypes = {
  content: PropTypes.object,
  card: PropTypes.object
}
 
export default LocationReader