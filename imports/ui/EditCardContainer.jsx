import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import EditCard from './EditCard'

export default EditCardContainer = withTracker(props => {
  console.log('EditCardContainer props', props)
  const card = Cards.findOne(props._id)
  return {
    card,
  }
})(EditCard)