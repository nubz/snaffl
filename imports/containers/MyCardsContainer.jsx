import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Cards from '../api/cards/collection'
import CardTypes from '../api/cardTypes/collection'
import MyCards from '../ui/MyCards'

export default MyCardsContainer = withTracker(props => {
  const cardsHandle = Meteor.subscribe('cards.owned')
  const typesHandle = Meteor.subscribe('card.types')
  const loading = !cardsHandle.ready() && !typesHandle.ready()
  const cardTypes = CardTypes.find({}).fetch()
  const publicCards = Cards.find({access: 'public'}, { sort: { createdAt: -1 } }).fetch()
  const privateCards = Cards.find({access: 'private'}, { sort: { createdAt: -1 } }).fetch()
  const access = props.access || 'public'
  return {
    publicCards,
    privateCards,
    cardTypes,
    loading,
    access
  }
})(MyCards)