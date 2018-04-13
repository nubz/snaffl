import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Decks from '../api/decks/collection'
import DeckDecks from '../api/deckDecks/collection'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import parseIcon from './TypeIcons'
import CardsFromIdsContainer from '../containers/CardsFromIdsContainer'
import TaggedCardsContainer from '../containers/TaggedCardsContainer'
import DecksFromIdsContainer from '../containers/DecksFromIdsContainer'
import ChildDecksFromIdsContainer from '../containers/ChildDecksFromIdsContainer'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'

const styles = {
  meta: {
    backgroundColor: '#eee',
    padding: 10,
    fontSize: 10
  },

}

export default class Snapdeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedDeck: 0
    }
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

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  viewMap = () => {
    FlowRouter.go('View.Map', {_id: this.props.deck._id})
  }

  handleEditRequest = () => {
    FlowRouter.go('Edit.Deck', {_id: this.props.deck._id})
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
    const port = window.location.port === "80" ? '' : ':' + window.location.port
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
      <div className="container">
        <h2>{deck.deckType}: {deck.title}</h2>
        { deck.deckType === 'TagMap' ? <RaisedButton label="View map" onClick={this.viewMap} /> : ''}
        <p>{deck.description}</p>
        { owned ?
        <div>
          <RaisedButton label="Delete" onClick={this.handleOpen} />
          <RaisedButton label="Edit" onClick={this.handleEditRequest} />
        </div>
        : '' }
        <div className="cardSection">
          <h3>Child cards</h3>
          { this.props.tagSubscription ?
            <TaggedCardsContainer tagId={this.props.tagSubscription.tagId} types={this.props.tagSubscription.types} />
            : <CardsFromIdsContainer cards={this.props.deckCards} />}
        </div>

        { deck.deckType === 'MultiDeck' ?
        <div className="cardSection">
          <h3>Child Decks</h3>
          <ChildDecksFromIdsContainer linkedDecks={this.props.deckChildren} />
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
                primaryText="+ Add to deck"
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
    )
  }
}

FlatButton.propTypes = {
  deck: PropTypes.object
}

Snapdeck.propTypes = {
  deck: PropTypes.object.isRequired,
  decks: PropTypes.array,
  deckCards: PropTypes.array,
  deckParents: PropTypes.array,
  deckChildren: PropTypes.array,
  tagSubscription: PropTypes.object,
  multiSnackBar: PropTypes.func.isRequired
}