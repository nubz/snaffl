import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import Dashboard from '../ui/Dashboard'



export default DashboardContainer = withTracker(props => {
  const owner = Meteor.userId()
  const cardsHandle = Meteor.subscribe('cards.owned')
  const decksHandle = Meteor.subscribe('decks.owned')
  let loading = !cardsHandle.ready()
  let decksLoading = !decksHandle.ready() 
  return {
    loading,
    decksHandle,
    privateDeckCount: Decks.find({owner: owner, access: 'private' }).count(),
    publicDeckCount: Decks.find({owner: owner, access: 'public' }).count(),
    privateCardCount: Cards.find({ owner: owner, access: 'private' }).count(),
    publicCardCount: Cards.find({ owner: owner, access: 'public'}).count(),
  }
})(Dashboard)