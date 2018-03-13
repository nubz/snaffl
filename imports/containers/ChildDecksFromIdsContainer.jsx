import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks.js'
import DeckList from '../ui/DeckList'

export default ChildDecksFromIdsContainer = withTracker(props => {
  const deckIds = _.pluck(props.linkedDecks, 'childId')
  const decksHandle = Meteor.subscribe('decks.fromIds', deckIds)
  const loading = !decksHandle.ready()
  const decks = Decks.find({_id: {$in : deckIds}}, { sort: { createdAt: -1 } }).fetch()
  return {
    decks,
    loading
  }
})(DeckList)