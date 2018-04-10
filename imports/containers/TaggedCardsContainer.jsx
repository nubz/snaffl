import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { TagCards } from '../api/tagCards/collection'
import CardsFromIdsContainer from './CardsFromIdsContainer'

export default TaggedCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('tag.cards', props.tagId)
  const loading = !cardsHandle.ready()
  const tagged = true
  const cards = TagCards.find({tagId: props.tagId}).fetch()
  const types = props.types || []
  return {
    cards,
    tagged,
    loading,
    types
  }
})(CardsFromIdsContainer)