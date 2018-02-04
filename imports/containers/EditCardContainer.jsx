import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import { TagCards } from '../api/tagCards'
import EditCard from '../ui/EditCard'

export default EditCardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const tagCardsHandle = Meteor.subscribe('card.tags', props._id)
  const loading = !cardHandle.ready() && !decksHandle.ready() && !tagCardsHandle
  const card = Cards.findOne(props._id)
  const decks = Decks.find({}).fetch()
  const cardTags = TagCards.find({cardId: props._id}).fetch()
  return {
    card,
    decks,
    cardTags,
    loading
  }
})(EditCard)