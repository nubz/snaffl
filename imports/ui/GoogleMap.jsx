import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Random } from 'meteor/random';
import Secrets from '../../secrets'

const Styles = {
  width: '100%',
  height: 'calc(100vh - 64px)'
}

class GoogleMap extends Component {

  componentDidMount() {
    const options = this.props.options || {};
    options.key = Secrets.googleMaps.apiKey;
    GoogleMaps.load(options);
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      this.name = Random.id();

      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: this.props.mapOptions(),
      });

      this.props.onReady(this.name);
    }
  }

  componentWillUnmount() {
    if (GoogleMaps.maps[this.name]) {
      google.maps.event.clearInstanceListeners(
        GoogleMaps.maps[this.name].instance,
      );
      delete GoogleMaps.maps[this.name];
    }
  }

  render() {
    return (
      <div style={{width: '100%', height: this.props.height}} ref={c => this.container = c}>
        {this.props.children}
      </div>
    );
  }
}

GoogleMap.propTypes = {
  loaded: PropTypes.bool.isRequired,
  onReady: PropTypes.func.isRequired,
  options: PropTypes.object,
  mapOptions: PropTypes.func.isRequired,
  children: PropTypes.node,
  height: PropTypes.string
};

export default GoogleMap;