import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IframeLoader from '../IFRAME'

class EmbedReader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { Embed } = this.props.content
    return (
      <div>
        <IframeLoader src={Embed.url} width="100%" height="260"/>
      </div>
    )
  }

}

EmbedReader.propTypes = {
  content: PropTypes.object
}
 
export default EmbedReader