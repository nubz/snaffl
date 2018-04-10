import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks/collection'
import Dashboard from '../ui/Dashboard'

export default DashboardContainer = withTracker(props => {
  const owner = Meteor.userId()
  const publicCardsHandle = Meteor.subscribe('my.publicCards')
  const privateCardsHandle = Meteor.subscribe('my.privateCards')
  const decksHandle = Meteor.subscribe('decks.owned')
  let decksLoading = !decksHandle.ready() 
  let publicLoading = !publicCardsHandle.ready()
  let privateLoading = !privateCardsHandle.ready()
  return {
    publicLoading,
    privateLoading,
    decksLoading,
    privateDeckCount: Decks.find({owner: owner, access: 'private' }).count(),
    publicDeckCount: Decks.find({owner: owner, access: 'public' }).count(),
    privateCardCount: Counts.get('my.privateCards.count'),
    publicCardCount: Counts.get('my.publicCards.count')
  }
})(Dashboard)