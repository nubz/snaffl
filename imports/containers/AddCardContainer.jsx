import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import AddCard from '../ui/AddCard'
import CardTypes from '../api/cardTypes/collection'

export default AddCardContainer = withTracker(props => {
  const cardTypesHandle = Meteor.subscribe('card.types')
  let loadingCardTypes = !cardTypesHandle.ready()
  return {
    cardTypes: CardTypes.find({}).fetch(),
    loadingCardTypes
  }
})(AddCard)