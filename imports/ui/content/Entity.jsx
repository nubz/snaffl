import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EntityReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering Entity')
    return (
      <div></div>
    )
  }

}

EntityReader.propTypes = {
  content: PropTypes.object
}
 
export default EntityReader