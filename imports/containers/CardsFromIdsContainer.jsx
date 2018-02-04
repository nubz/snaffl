import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import Gallery from '../ui/Gallery'

export default CardsFromIdsContainer = withTracker(props => {
  const cardIds = _.pluck(props.cards, 'cardId')
  const cardsHandle = Meteor.subscribe('cards.fromIds', cardIds)
  const loading = !cardsHandle.ready()
  const cards = Cards.find({_id: {$in : cardIds}}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    loading
  }
})(Gallery)