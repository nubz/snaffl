import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import CardList from './CardList'

export default CardListContainer = withTracker(props => {
  const cards = Cards.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
  }
})(CardList)