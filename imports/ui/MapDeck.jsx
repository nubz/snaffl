import React, { Component } from 'react';
import PropTypes from 'prop-types'
import GoogleMapContainer from '../containers/GoogleMapContainer';
import { Decks } from '../api/decks.js'
import { DeckDecks } from '../api/deckDecks'
import parseIcon from './TypeIcons'
import DecksFromIdsContainer from '../containers/DecksFromIdsContainer'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'

const styles = {
  meta: {
    backgroundColor: '#eee', 
    padding: 10, 
    fontSize: 10
  }
}

class MapDeck extends Component {
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.markerForCard = this.markerForCard.bind(this);
    this.handleMapOptions = this.handleMapOptions.bind(this);
    this.state = {
      bounds: {},
      map: {},
      selectedDeck: 0,
      open: false
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

  handleDeckSelect = (e, i, v) => {
    DeckDecks.insert({
        deckId: v,
        childId: this.props.deck._id
    }, () => {
      this.setState({
        snackOpen: true,
        message: 'Deck added to deck ok',
        selectedDeck: v
      })
    })

  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    FlowRouter.go('Edit.Deck', {_id: this.props.deck._id})
  }

  deleteThisDeck() {
    const deckId = this.props.deck._id
    if (this.props.deck.owner === Meteor.userId()) {
      Decks.remove(deckId, () => {
        this.handleClose()
        Meteor.call('removeAllCardsFromDeck', deckId)
        this.props.multiSnackBar('Deck deleted ok', true);
        FlowRouter.go('My.Decks')
      })
    }
  }

  renderMyDecks() {
    return this.props.decks.map((deck) => (
      <MenuItem 
        rightIcon={parseIcon(deck.deckType)}
        value={deck._id} 
        primaryText={deck.title} 
        key={deck._id}
      />
    ))
  }

  render() {
    const host = window.location.hostname
    const protocol = window.location.protocol
    const port = window.location.port == "80" ? '' : ':' + window.location.port
    const deck = this.props.deck
    const owned = deck.owner === Meteor.userId()
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={this.deleteThisDeck.bind(this)}
      />,
    ];
    return (
    <div>
      <GoogleMapContainer
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
        height={"calc(100vh - 120px)"}
      >
        Loading!
      </GoogleMapContainer>
      { owned ?
        <div>
          <RaisedButton label="Delete" onClick={this.handleOpen} />
          <RaisedButton label="Edit" onClick={this.handleEditRequest} />
        </div>
        : '' }
      <div className="cardSection">

        <h3>Parent Decks</h3>

        { owned ?
          <DropDownMenu
            iconStyle={{textColor:'black'}}
            iconButton={<NavigationExpandMoreIcon/>}
            value={this.state.selectedDeck}
            onChange={this.handleDeckSelect}
          >
            <MenuItem
              value={0}
              primaryText="Add to deck"
            />
            {this.renderMyDecks()}
          </DropDownMenu> : ''
        }

        <DecksFromIdsContainer linkedDecks={this.props.deckParents} deckId={deck._id} />

      </div>

      <div className="cardSection">
        <h3>API</h3>
        <pre style={styles.meta}>
          <code><a href={"/api/menu/" + deck._id} target="_blank">{protocol}//{host}{port}/api/menu/{deck._id}</a></code>
        </pre>
      </div>
      { host === 'dev.snaffl.io' ?
        <div className="cardSection">
          <h3>Snaffl.it!</h3>
          <pre style={styles.meta}>
            <code><a href={"http://snaffl.it/?id=" + deck._id} target="_blank">http://snaffl.it/?id={deck._id}</a></code>
          </pre>
        </div>
        : ''}
      <Dialog
        title={'Delete "' + deck.title + '"'}
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        Confirm you want to permanently delete this deck.
      </Dialog>
    </div>
    );
  }
}

FlatButton.propTypes = {
  deck: PropTypes.object
}

MapDeck.propTypes = {
  deck: PropTypes.object.isRequired,
  decks: PropTypes.array,
  deckCards: PropTypes.array,
  deckParents: PropTypes.array,
  tagSubscription: PropTypes.object,
  multiSnackBar: PropTypes.func.isRequired
}

export default MapDeck;