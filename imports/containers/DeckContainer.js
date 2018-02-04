import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks.js'
import { DeckCards } from '../api/deckCards.js'
import ViewDeck from '../ui/ViewDeck'

export default DeckContainer = withTracker(props => {
  const deckHandle = Meteor.subscribe('deck', props._id)
  const cardsHandle = Meteor.subscribe('deck.cards', props._id)
  const loading = !deckHandle.ready() && !cardsHandle.ready()
  const deck = Decks.findOne(props._id)
  const deckCards = DeckCards.find({deckId: props._id}).fetch()
  return {
    deck,
    deckCards,
    loading
  }
})(ViewDeck)