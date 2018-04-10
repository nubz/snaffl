import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards/collection'
import AddCard from '../ui/AddCard'
import { CardTypes } from '../api/cardTypes/collection'

const startTime = new Date()

export default AddCardContainer = withTracker(props => {
  const cardsHandle = Meteor.subscribe('cards.owned')
  const cardTypesHandle = Meteor.subscribe('card.types')
  let loadingCards = !cardsHandle.ready()
  let loadingCardTypes = !cardTypesHandle.ready()
  return {
    cards: Cards.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
    cardTypes: CardTypes.find({}).fetch(),
    loadingCards,
    loadingCardTypes
  }
})(AddCard)