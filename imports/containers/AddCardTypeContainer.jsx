import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import AddCard from '../ui/AddCard'
import CardTypes from '../api/cardTypes/collection'

export default AddCardTypeContainer = withTracker(props => {
  const cardTypesHandle = Meteor.subscribe('card.types')
  const loadingCardTypes = !cardTypesHandle.ready()
  const selectedType = CardTypes.findOne({value: props.cardType})
  return {
    loadingCardTypes,
    selectedType
  }
})(AddCard)