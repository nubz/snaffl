import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards/collection'
import EditCard from '../ui/EditCard'

export default EditCardContainer = withTracker(props => {
  const cardHandle = Meteor.subscribe('card', props._id)
  const loading = !cardHandle.ready()
  const card = Cards.findOne(props._id)
  return {
    card,
    loading
  }
})(EditCard)