import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IframeLoader extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <iframe src={this.props.src} height={this.props.height} width={this.props.width} frameBorder={this.props.frameborder} allowFullScreen={this.props.allowfullscreen}></iframe>
      </div>
    )
  }
}

IframeLoader.propTypes = {
  src: PropTypes.string.isRequired,
  frameborder: PropTypes.number,
  allowfullscreen: PropTypes.bool
};
IframeLoader.defaultProps = {
  frameborder: 0,
  allowfullscreen: true,
};

export default IframeLoader
