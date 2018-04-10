import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Nav from '../ui/Nav'
import { CardTypes } from '../api/cardTypes/collection'
import { DeckTypes } from '../api/deckTypes/collection'

export default NavContainer = withTracker(props => {
  const cardTypesHandle = Meteor.subscribe('card.types')
  const cardTypes =  CardTypes.find({}).fetch()
  const deckTypesHandle = Meteor.subscribe('deck.types')
  const deckTypes =  DeckTypes.find({}).fetch()
  let loadingCardTypes = !cardTypesHandle.ready() && !deckTypesHandle.ready()
  return {
    ...props,
    cardTypes,
    loadingCardTypes,
    deckTypes
  }
})(Nav)