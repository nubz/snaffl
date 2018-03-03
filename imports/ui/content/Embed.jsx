import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EmbedReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering Embed')
    return (
      <div></div>
    )
  }

}

EmbedReader.propTypes = {
  content: PropTypes.object
}
 
export default EmbedReader