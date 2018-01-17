import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import AddCard from '../ui/AddCard'

const startTime = new Date()

export default AddCardContainer = withTracker(props => {
  return {
    cards: Cards.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
  }
})(AddCard)