import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import MyCards from '../ui/MyCards'

export default MyCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('cards.owned')
  const loading = !cardsHandle.ready()
  const publicCards = Cards.find({access: 'public'}, { sort: { createdAt: -1 } }).fetch()
  const privateCards = Cards.find({access: 'private'}, { sort: { createdAt: -1 } }).fetch()
  const access = props.access || 'public'
  return {
    publicCards,
    privateCards,
    loading,
    access
  }
})(MyCards)