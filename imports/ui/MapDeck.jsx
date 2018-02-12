import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import GoogleMapContainer from '../containers/GoogleMapContainer';
import { Cards } from '../api/cards'

class MapDeck extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(55.953955799999996, -3.1130749),
      zoom: 10,
    };
  }

  handleOnReady(name) {
      var bounds = new google.maps.LatLngBounds();
      GoogleMaps.ready(name, function (map) {
        this.props.deckCards.map(function (card) {
          var infowindow = new google.maps.InfoWindow({
            content: '<div><h3>card.title</h3><img src="' + card.images.small + '"></div>'
          });
          var marker = new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(card.lat, card.lng),
            map: map.instance,
            title: card.title,
            id: card._id
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });

          bounds.extend(marker.getPosition());

        });
        map.instance.fitBounds(bounds);
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

MapDeck.propTypes = {
  deck: PropTypes.object.isRequired,
  deckCards: PropTypes.array,
  tagSubscription: PropTypes.object,
  multiSnackBar: PropTypes.func.isRequired
}

export default MapDeck;