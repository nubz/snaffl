import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Cards from '../api/cards/collection'
import Gallery from '../ui/Gallery'

export default DeckCardsContainer = withTracker(props => {
  const cardIds = _.pluck(props.cards, 'cardId')
  console.log('cardIds', cardIds)
  const cardsHandle = Meteor.subscribe('cards.fromIds', cardIds)
  const loading = !cardsHandle.ready()
  const cards = Cards.find({_id: {$in : cardIds}}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    loading
  }
})(Gallery)