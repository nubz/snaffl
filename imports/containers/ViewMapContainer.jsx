import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Cards from '../api/cards/collection'
import ViewMap from '../ui/ViewMap'

export default ViewMapContainer = withTracker(props => {
  const cardIds = _.pluck(props.deckCards, 'cardId')
  const cardsHandle = Meteor.subscribe('cards.fromIds', cardIds)
  const loading = !cardsHandle.ready()
  const deckCards = Cards.find({_id: {$in : cardIds}}, { sort: { createdAt: -1 } }).fetch()
  const deck = props.deck
  const tagSubscription = props.tagSubscription
  return {
    deck,
    deckCards,
    tagSubscription,
    loading
  }
})(ViewMap)