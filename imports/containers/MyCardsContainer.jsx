import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { CardTypes } from '../api/cardTypes.js'
import MyCards from '../ui/MyCards'

export default MyCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('cards.owned')
  typesHandle = Meteor.subscribe('card.types')
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