import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards/collection'
import CardList from '../ui/CardList'

export default CardListContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('cards.owned')
  const loading = !cardsHandle.ready()
  const cards = Cards.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    loading
  }
})(CardList)