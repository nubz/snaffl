import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards'
import { Decks } from '../api/decks'
import { DeckCards } from '../api/deckCards'
import { TagCards } from '../api/tagCards'
import ViewCard from '../ui/ViewCard'

export default CardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const cardDecksHandle = Meteor.subscribe('card.decks', props._id)
  const cardTagsHandle = Meteor.subscribe('card.tags', props._id)
  const loading = !cardHandle.ready() && !decksHandle.ready() && cardTagsHandle.ready()
  const card = Cards.findOne(props._id)
  const decks = Decks.find({}).fetch()
  const cardDecks = DeckCards.find({cardId: props._id}).fetch()
  const cardTags = TagCards.find({cardId: props._id}).fetch()
  return {
    card,
    decks,
    cardDecks,
    cardTags,
    loading
  }
})(ViewCard)