import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import GoogleMapContainer from '../containers/GoogleMapContainer';
import { Cards } from '../api/cards'

class MapCard extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.handleMapOptions = this.handleMapOptions.bind(this);
    this.state = {
      map: {}
    }
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(this.props.card.lat, this.props.card.lng),
      zoom: 13,
    };
  }

  markerForCard(card) {
    let infowindow, marker;

    infowindow = new google.maps.InfoWindow({
      content: '<div><h3>' + card.title + '</h3><a href="/card/' + card._id + '"><img src="' + card.images.small + '"></a></div>'
    });

    marker = new google.maps.Marker({
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(card.lat, card.lng),
      map: this.state.map.instance,
      title: card.title,
      id: card._id
    });

    marker.addListener('click', function() {
      infowindow.open(this.state.map, marker);
    }.bind(this));
  }

  handleOnReady(name) {
      var bounds = new google.maps.LatLngBounds();
      GoogleMaps.ready(name, function (map) {
        this.setState({map: map});
        this.markerForCard(this.props.card);
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

MapCard.propTypes = {
  card: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

export default MapCard;