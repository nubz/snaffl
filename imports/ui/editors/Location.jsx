import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Location: ''}
    }

    const { Location } = props.card.content
 
    this.state = {
      content: Location
    }

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}

LocationEditor.propTypes = {
  card: PropTypes.object
}
 
export default LocationEditor