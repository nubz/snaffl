import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import CardList from '../ui/CardList'

export default PublicCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('cards.public')
  const loading = !cardsHandle.ready()
  const cards = Cards.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    loading
  }
})(CardList)