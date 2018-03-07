import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
import GoogleMapContainer from '../containers/GoogleMapContainer';
import { Cards } from '../api/cards'

class MapDeck extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.markerForCard = this.markerForCard.bind(this);
    this.handleMapOptions = this.handleMapOptions.bind(this);
    this.state = {
      bounds: {},
      map: {}
    }
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(55.953955799999996, -3.1130749),
      zoom: 10,
    };
  }

  markerForCard(card) {
    let infowindow, marker;

    lat = card.content && card.content.Location ? card.content.Location.latitude : card.lat
    lng = card.content && card.content.Location ? card.content.Location.longitude : card.lng

    infowindow = new google.maps.InfoWindow({
      content: '<div><h3>' + card.title + '</h3><a href="/card/' + card._id + '"><img src="' + card.images.small + '"></a></div>'
    });

    marker = new google.maps.Marker({
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, lng),
      map: this.state.map.instance,
      title: card.title,
      id: card._id
    });

    marker.addListener('click', function() {
      infowindow.open(this.state.map, marker);
    }.bind(this));

    this.setState({
      bounds: this.state.bounds.extend(marker.getPosition())
    });
  }

  handleOnReady(name) {
      this.setState({
        bounds: new google.maps.LatLngBounds()
      })
      GoogleMaps.ready(name, function (map) {
        this.setState({map: map});
        this.props.deckCards.map(this.markerForCard);
        map.instance.fitBounds(this.state.bounds);
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