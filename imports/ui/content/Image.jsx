import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImageReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering Image')
    return (
      <div></div>
    )
  }

}

ImageReader.propTypes = {
  content: PropTypes.object
}
 
export default ImageReader