import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Decks from '../api/decks/collection'
import DeckDecks from '../api/deckDecks/collection'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CardsFromIdsContainer from '../containers/CardsFromIdsContainer'
import TaggedCardsContainer from '../containers/TaggedCardsContainer'
import DecksFromIdsContainer from '../containers/DecksFromIdsContainer'
import ChildDecksFromIdsContainer from '../containers/ChildDecksFromIdsContainer'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper';
import parseIcon from './TypeIcons'
import CardsForDeckQueryContainer from '/imports/containers/CardsForDeckQueryContainer'

const styles = {
  meta: {
    backgroundColor: '#1e0e40',
    color: '#ffffff',
    padding: 10,
    fontSize: 16
  },

}

export default class Deck extends Component {
  constructor(props) {
    super(props);
    console.log('deck constructor props', props)
    this.state = {
      open: false,
      selectedDeck: 0,
      deck: props.data
    }
  }

  deleteThisDeck() {
    const deckId = this.state.deck._id
    if (this.state.deck.owner === Meteor.userId()) {
      Decks.remove(deckId, () => {
        this.handleClose()
        Meteor.call('removeAllCardsFromDeck', deckId)
        //this.props.multiSnackBar('Deck deleted ok', true);
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
    FlowRouter.go('View.Map', {_id: this.state.deck._id})
  }

  handleEditRequest = () => {
    FlowRouter.go('Edit.Deck', {_id: this.state.deck._id})
  }

  handleDeckSelect = (e, i, v) => {
    DeckDecks.insert({
        deckId: v,
        childId: this.state.deck._id
    }, () => {
      this.setState({
        snackOpen: true,
        message: 'Deck added to deck ok',
        selectedDeck: v
      })
    })

  }

  renderMyDecks() {
    return this.state.decks.map((deck) => (
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
    const deck = this.state.deck
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
    const createdAgo = moment(deck.createdAt).fromNow()

    return (
      <div className="main-bg">
        <Paper style={{padding: 20, marginBottom: 30}}>
          <h3 className="paperHead deckHead">{parseIcon(deck.deckType, {height:50,width:50,color: 'white'})} {deck.title}<span>{deck.deckType} deck created {createdAgo}</span></h3>
            {deck.deckType === 'TagMap' ? <RaisedButton label="View map" onClick={this.viewMap}/> : ''}
          { deck.images ?
            <div className="imagePillarBox" style={{backgroundImage: 'url(' + (deck.images ? deck.images.medium : '') + ')'}}></div>
            : ''
          }
            <p>{deck.description}</p>
            {owned ?
              <div>
                <RaisedButton label="Delete" onClick={this.handleOpen}/>
                <RaisedButton label="Edit" onClick={this.handleEditRequest}/>
              </div>
              : ''}
        </Paper>
        <Paper style={{padding: 20, marginBottom: 30}}>
          <h3 className="paperHead cardHead">{parseIcon(deck.deckType, {height:50,width:50,color: 'white'})} Cards</h3>
          <CardsForDeckQueryContainer deckId={deck._id} headless={true} />
        </Paper>
          <Paper style={{padding: 20}}>
            <h3 className="paperHead deckHead">{parseIcon(deck.deckType, {height:50,width:50,color: 'white'})} API address</h3>
              <pre style={styles.meta}>
                <code><a href={"/api/menu/" + deck._id} target="_blank" style={{color: '#ffffff'}}>{protocol}//{host}{port}/api/menu/{deck._id}</a></code>
              </pre>
          </Paper>


            {host === 'dev.snaffl.io' ?
              <Paper style={{padding: 20}}>
                <h3 className="paperHead deckHead">{parseIcon(deck.deckType, {height:50,width:50,color: 'white'})} Snaffl.it!</h3>
                <pre style={styles.meta}>
                  <code>
                    <a href={"http://snaffl.it/?id=" + deck._id} target="_blank">http://snaffl.it/?id={deck._id}</a>
                  </code>
                </pre>
              </Paper>
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