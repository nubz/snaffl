import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks.js'
import { DeckCards } from '../api/deckCards.js'
import { TagSubscriptions } from '../api/tagSubscriptions'
import ViewDeck from '../ui/ViewDeck'

export default DeckContainer = withTracker(props => {
  const deckHandle = Meteor.subscribe('deck', props._id)
  const cardsHandle = Meteor.subscribe('deck.cards', props._id)
  const tagSubsHandle = Meteor.subscribe('tag.subscription', props._id)
  const loading = !deckHandle.ready() && !cardsHandle.ready() && !tagSubsHandle.ready()
  const deck = Decks.findOne(props._id)
  const deckCards = DeckCards.find({deckId: props._id}).fetch()
  const tagSubscription = TagSubscriptions.findOne({deckId: props._id})
  return {
    deck,
    deckCards,
    tagSubscription,
    loading
  }
})(ViewDeck)