import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import ViewCard from '../ui/ViewCard'

export default CardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const loading = !cardHandle.ready()
  const card = Cards.findOne(props._id)
  const full = true
  return {
    card,
    full,
    loading
  }
})(ViewCard)