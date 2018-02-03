import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { CardTypes } from '../api/cardTypes.js'
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