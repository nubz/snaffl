import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { DeckCards } from '../api/deckCards'
import { Decks } from '../api/decks'
import { TagSubscriptions } from '../api/tagSubscriptions'
import ViewMapContainer from './ViewMapContainer'

export default MapDeckContainer = withTracker(props => {
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
})(ViewMapContainer)