import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import EditCard from '../ui/EditCard'

export default EditCardContainer = withTracker(props => {
  const card = Cards.findOne(props._id)
  return {
    card,
  }
})(EditCard)