import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Cards from '../api/cards/collection'
import Decks from '../api/decks/collection'
import DeckCards from '../api/deckCards/collection'
import TagCards from '../api/tagCards/collection'
import ViewCard from '../ui/ViewCard'
import DeckTypes from '../api/deckTypes/collection'

export default CardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const cardDecksHandle = Meteor.subscribe('card.decks', props._id)
  const cardTagsHandle = Meteor.subscribe('card.tags', props._id)
  const deckTypeNames = Meteor.subscribe('permitted.types', props._id, 'card')
  const loading = !deckTypeNames.ready() && !cardHandle.ready() && !decksHandle.ready() && !cardTagsHandle.ready() && !cardDecksHandle.ready()
  const card = Cards.findOne(props._id)
  let decks = [];
  if (cardHandle.ready()) {
    const deckTypes = DeckTypes.find({accepts: {$all: [card.cardType]}}).fetch();
    decks = Decks.find({deckType: {$in: _.pluck(deckTypes, 'value')}}).fetch()
  }
  const linkedDecks = DeckCards.find({cardId: props._id}).fetch()
  const cardTags = TagCards.find({cardId: props._id}).fetch()
  return {
    card,
    decks,
    linkedDecks,
    cardTags,
    loading
  }
})(ViewCard)