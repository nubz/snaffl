import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import GoogleMapContainer from '../containers/GoogleMapContainer';
import { Cards } from '../api/cards'

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
      zoom: 14,
    };
  }

  markerForCard(lat, lng) {
    let marker;

    marker = new google.maps.Marker({
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
      var bounds = new google.maps.LatLngBounds();
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
      >
        Loading!
      </GoogleMapContainer>
    );
  }
}

MapEditor.propTypes = {
  loading: PropTypes.bool
}

export default MapEditor;