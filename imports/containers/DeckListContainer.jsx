import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks/collection'
import DeckList from '../ui/DeckList'

export default DeckListContainer = withTracker(props => {
  let decksHandle = Meteor.subscribe('decks.owned')
  const loading = !decksHandle.ready()
  const decks = Decks.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    decks,
    loading
  }
})(DeckList)