import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Nav from '../ui/Nav'
import { CardTypes } from '../api/cardTypes.js'

export default NavContainer = withTracker(props => {
  const cardTypesHandle = Meteor.subscribe('card.types')
  const cardTypes =  CardTypes.find({}).fetch()
  let loadingCardTypes = !cardTypesHandle.ready()
  return {
    ...props,
    cardTypes,
    loadingCardTypes,
  }
})(Nav)