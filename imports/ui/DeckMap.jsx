import React, { Component } from 'react';
import GoogleMapContainer from '../containers/GoogleMapContainer'
import CircularProgress from 'material-ui/CircularProgress'

class DeckMap extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.markerForCard = this.markerForCard.bind(this);
    this.handleMapOptions = this.handleMapOptions.bind(this);

    this.state = {
      bounds: {},
      map: {},
      data: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(55.953955799999996, -3.1130749),
      zoom: 13,
    };
  }

  markerForCard(item) {
    let infowindow, marker, card = item.card
    const image = card.images ? card.images.small : card.image
    const lat = card.content && card.content.Location ? card.content.Location.latitude : card.lat
    const lng = card.content && card.content.Location ? card.content.Location.longitude : card.lng

    infowindow = new google.maps.InfoWindow({
      content: '<div><h3>' + card.title + '</h3><a href="/card/' + card._id + '"><img src="' + image + '"></a></div>'
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
        this.state.data.map(this.markerForCard);
        map.instance.fitBounds(this.state.bounds);
      }.bind(this));
  }

  render() {
    return (
    <div>
      {this.props.isLoading ? <CircularProgress size={60} thickness={7}/> :
        <GoogleMapContainer
          onReady={this.handleOnReady}
          mapOptions={this.handleMapOptions}
          height={"500px"}
        >
          Loading!
        </GoogleMapContainer>
      }
    </div>
    );
  }
}

export default DeckMap;