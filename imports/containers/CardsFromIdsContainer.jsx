import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import Gallery from '../ui/Gallery'

export default CardsFromIdsContainer = withTracker(props => {
  const cardIds = _.pluck(props.cards, 'cardId')
  const cardsHandle = Meteor.subscribe('cards.fromIds', cardIds)
  const loading = !cardsHandle.ready()
  const tagged = props.tagged || false
  let cards = {};
  if (tagged) {
    cards = Cards.find({$and: [{_id: {$in : cardIds}}, {cardType: {$in: props.types} }]}, { sort: { createdAt: -1 } }).fetch()
  } else {
    cards = Cards.find({_id: {$in : cardIds}}, { sort: { createdAt: -1 } }).fetch()
  }

  return {
    cards,
    tagged,
    loading
  }
})(Gallery)