import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import AddCard from '../ui/AddCard'

const startTime = new Date()

export default AddCardTypeContainer = withTracker(props => {
  const cardsHandle = Meteor.subscribe('cards.owned')
  const loading = !cardsHandle.ready()
  return {
    cards: Cards.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
    loading
  }
})(AddCard)