import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks.js'
import ViewDeck from '../ui/ViewDeck'

export default DeckContainer = withTracker(props => {
  const deckHandle = Meteor.subscribe('deck', props._id)
  const loading = !deckHandle.ready()
  const deck = Decks.findOne(props._id)
  const full = true
  return {
    deck,
    full,
    loading
  }
})(ViewDeck)