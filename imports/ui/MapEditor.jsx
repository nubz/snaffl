import React, { Component } from 'react';
import PropTypes from 'prop-types'
import GoogleMapContainer from '../containers/GoogleMapContainer';
import CircularProgress from 'material-ui/CircularProgress'

class MapEditor extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.handleMapOptions = this.handleMapOptions.bind(this);
    this.state = {
      map: {},
      lat: props.latitude,
      lng: props.longitude
    }
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(this.props.latitude, this.props.longitude),
      zoom: 17,
    };
  }

  markerForCard(lat, lng) {
    let marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lng),
      map: this.state.map.instance,
      title: 'location marker',
      id: '0'
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
      this.setState({
        'lat': event.latLng.lat(),
        'lng': event.latLng.lng()
      })
      this.props.onChange()
    }.bind(this));

  }

  handleOnReady(name) {
      GoogleMaps.ready(name, function (map) {
        this.setState({map: map});
        this.markerForCard(this.props.latitude, this.props.longitude);
      }.bind(this));
  }

  render() {
    return (
      <GoogleMapContainer
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
        height="500px"
      >
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> : ''}
      </GoogleMapContainer>
    );
  }
}

MapEditor.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default MapEditor;