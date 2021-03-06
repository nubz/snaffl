import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Decks from '../api/decks/collection'
import DeckList from '../ui/DeckList'

export default PublicDecksContainer = withTracker(props => {
  decksHandle = Meteor.subscribe('decks.public')
  const loading = !decksHandle.ready()
  const decks = Decks.find({...props}, { sort: { createdAt: -1 } }).fetch()
  return {
    decks,
    loading
  }
})(DeckList)