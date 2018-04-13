import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Cards from '../api/cards/collection'
import CardTypes from '../api/cardTypes/collection'
import PublicCards from '../ui/PublicCards'

export default PublicCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('cards.public')
  typesHandle = Meteor.subscribe('card.types')
  const loading = !cardsHandle.ready() && !typesHandle.ready()
   const cardTypes = CardTypes.find({}).fetch()
  const cards = Cards.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    cardTypes,
    loading
  }
})(PublicCards)