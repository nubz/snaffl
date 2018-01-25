import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import AddCard from '../ui/AddCard'
import { CardTypes } from '../api/cardTypes.js'

const startTime = new Date()

export default AddCardTypeContainer = withTracker(props => {
  const cardsHandle = Meteor.subscribe('cards.owned')
  const cardTypesHandle = Meteor.subscribe('card.types')
  const loading = !cardsHandle.ready()
  let loadingCardTypes = !cardTypesHandle.ready()
  let selectedType = CardTypes.findOne({value: props.cardType})
  return {
    cardTypes: CardTypes.find({}).fetch(),
    cards: Cards.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
    loading,
    loadingCardTypes,
    selectedType
  }
})(AddCard)