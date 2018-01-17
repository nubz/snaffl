import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import Dashboard from '../ui/Dashboard'



export default DashboardContainer = withTracker(props => {
  return {
    privateCardCount: Cards.find({ owner: Meteor.userId(), access: {$ne: 'public'} }).count(),
    publicCardCount: Cards.find({ owner: Meteor.userId(), access: 'public'}).count(),
  }
})(Dashboard)