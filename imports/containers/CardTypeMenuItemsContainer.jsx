import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { CardTypes } from '../api/cardTypes/collection'
import CardTypeMenuItems from '../ui/CardTypeMenuItems'

export default CardTypesMenuItemsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('card.types')
  const loading = !cardsHandle.ready()
  const cardTypes = CardTypes.find({}).fetch()
  return {
    cardTypes,
    loading
  }
})(CardTypeMenuItems)