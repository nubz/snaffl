import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import MapCard from '../ui/MapCard'

export default MapCardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const loading = !cardHandle.ready()
  const card = Cards.findOne(props._id)
  return {
    card,
    locationMap: false,
    loading
  }
})(MapCard)