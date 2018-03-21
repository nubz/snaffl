import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { DeckCards } from '../api/deckCards'
import { Decks } from '../api/decks'
import { DeckDecks } from '../api/deckDecks'
import { TagSubscriptions } from '../api/tagSubscriptions'
import ViewMapContainer from './ViewMapContainer'

export default MapDeckContainer = withTracker(props => {
  const cardsHandle = Meteor.subscribe('deck.cards', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const decksLinkedHandle = Meteor.subscribe('decks.linked', props._id)
  const tagSubsHandle = Meteor.subscribe('tag.subscription', props._id)
  const loading =  !decksLinkedHandle.ready() && !decksHandle.ready() && !cardsHandle.ready() && !tagSubsHandle.ready()
  const deck = Decks.findOne(props._id)
  const deckCards = DeckCards.find({deckId: props._id}).fetch()
  const tagSubscription = TagSubscriptions.findOne({deckId: props._id})

  const deckChildren = DeckDecks.find({deckId: props._id}).fetch()
  const childIds = _.pluck([...deckChildren], 'childId')
  const deckParents = DeckDecks.find({childId: props._id}).fetch()
  const parentIds = _.pluck([...deckParents], 'deckId')
  const exclusions = [...parentIds,...childIds,props._id]
  const decks = Decks.find({_id: {$nin: exclusions}}).fetch()

  return {
    deck,
    decks,
    deckCards,
    deckParents,
    deckChildren,
    tagSubscription,
    loading
  }
})(ViewMapContainer)