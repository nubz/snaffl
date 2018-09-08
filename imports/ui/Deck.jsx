import React, { Component } from 'react'
import Decks from '../api/decks/collection'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import parseIcon from './TypeIcons'
import CardsForDeckQueryContainer from '/imports/containers/CardsForDeckQueryContainer'
import CardsForTagSubscriptionQueryContainer from '/imports/containers/CardsForTagSubscriptionQueryContainer'
import CardsForMapContainer from '/imports/containers/CardsForMapContainer'
import CardsForTagMap from '/imports/containers/CardsForTagMap'
import DecksForDeckQueryContainer from '../containers/DecksForDeckQueryContainer'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  meta: {
    backgroundColor: '#1e0e40',
    color: '#ffffff',
    padding: 10,
    fontSize: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  whiteIcon: {
    height: 50,
    width: 50,
    color: 'white'
  },
  paperHead: {
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
    overflow: 'hidden'
  },
  paperHeadLight: {
    padding: 20,
    marginBottom: 30
  }
}

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedDeck: 0,
      deck: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deck: nextProps.data
    })
  }

  deleteThisDeck() {
    const deckId = this.state.deck._id
    if (this.state.deck.owner === Meteor.userId()) {
      Decks.remove(deckId, () => {
        this.handleClose()
        Meteor.call('removeAllCardsFromDeck', deckId, () => {
          FlowRouter.go('My.Decks')
        })
      })
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    FlowRouter.go('Edit.Deck', {_id: this.state.deck._id})
  }

  render() {
    const host = window.location.hostname
    const protocol = window.location.protocol
    const port = window.location.port === "80" ? '' : ':' + window.location.port
    const deck = this.state.deck
    const canEdit = deck.owner === Meteor.userId()
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
      <div>
        {this.props.isLoading ? <CircularProgress size={60} thickness={7} /> :
          <div className="main-bg">
            <Paper style={styles.paperHeadLight}>
              <h3 className="paperHead deckHead">{parseIcon(deck.deckType, styles.whiteIcon)} {deck.title}<span>{deck.deckType} deck created {createdAgo}</span></h3>
              {deck.images ?
                <div className="imagePillarBox" style={{backgroundImage: 'url(' + (deck.images ? deck.images.medium : '') + ')'}} />
                : ''
              }
              <p>{deck.description}</p>
              {canEdit ?
                <div>
                  <RaisedButton label="Edit" onClick={this.handleEditRequest} style={{marginRight: 10}} primary={true}/>
                  <RaisedButton label="Delete" onClick={this.handleOpen}/>
                </div>
                : ''}
            </Paper>
            {deck.deckType === 'Map' || deck.deckType === 'TagMap' ?
              <Paper style={styles.paperHeadLight}>
                <h3 className="paperHead deckHead">{parseIcon(deck.deckType, styles.whiteIcon)} Map</h3>
                {deck.deckType === 'Map' ?
                  <CardsForMapContainer deckId={deck._id}/> :
                  <CardsForTagMap tagId={this.state.deck.tagSubscription.tagId}/>
                }
              </Paper>
              : ''}
            <Paper style={styles.paperHeadLight}>
              <h3 className="paperHead cardHead">{parseIcon(deck.deckType, styles.whiteIcon)} Cards</h3>
              {deck.tagSubscriptionId ?
                <CardsForTagSubscriptionQueryContainer tagId={deck.tagSubscription.tagId} headless={true}/>
                : <CardsForDeckQueryContainer deckId={deck._id} headless={true}/>}
            </Paper>
            { deck.deckType === 'MultiDeck' ?
            <Paper style={styles.paperHead}>
              <h3 className="paperHead deckHead">{parseIcon('Cloud', styles.whiteIcon)} Child
                decks</h3>
              <DecksForDeckQueryContainer deckId={deck._id} headless={true}/>
            </Paper>
              : ''}
            <Paper style={styles.paperHead}>
              <h3 className="paperHead deckHead">{parseIcon('Cloud', styles.whiteIcon)} Parent
                decks</h3>
              <DecksForDeckQueryContainer childId={deck._id} deckMenu={canEdit} accepts={deck.deckType} headless={true}/>
            </Paper>
            <Paper style={styles.paperHeadLight}>
              <h3 className="paperHead deckHead">{parseIcon('Cloud', styles.whiteIcon)} API
                address</h3>
              <pre style={styles.meta}>
                <code>
                  <a href={"/api/menu/" + deck._id} target="_blank" style={{color: '#ffffff'}}>
                    {protocol}//{host}{port}/api/menu/{deck._id}
                  </a>
                </code>
              </pre>
              {canEdit ?
              <RaisedButton
                label="Manage Access"
                onClick={this.handleEditRequest}
                style={{marginRight: 10}}/>
                : '' }
            </Paper>
            {host === 'prototype.snaffl.io' ?
              <Paper style={styles.paperHeadLight}>
                <h3 className="paperHead deckHead">{parseIcon('Cloud', styles.whiteIcon)} Snaffl.it!</h3>
                <pre style={styles.meta}>
                  <code>
                    <a href={"http://snaffl.it/?id=" + deck._id} style={{color: '#ffffff'}} target="_blank">http://snaffl.it/?id={deck._id}</a>
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
        }
      </div>
    )
  }
}