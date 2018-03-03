import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImageEditor extends Component {

  constructor(props) {
    super(props);
    
    if (!props.card.content) {
      props.card.content = {Image: ''}
    }

    const { Image } = props.card.content
 
    this.state = {
      content: Image
    }

  }

  render() {
    return (
      <div>

      </div>
    )
  }

}

ImageEditor.propTypes = {
  card: PropTypes.object
}
 
export default ImageEditor