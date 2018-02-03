import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import ViewCard from '../ui/ViewCard'

export default CardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const loading = !cardHandle.ready() && !decksHandle.ready()
  const card = Cards.findOne(props._id)
  const decks = Decks.find({}).fetch()
  return {
    card,
    decks,
    loading
  }
})(ViewCard)