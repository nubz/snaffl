import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks.js'
import AddDeck from '../ui/AddDeck'
import { DeckTypes } from '../api/deckTypes.js'

const startTime = new Date()

export default AddDeckTypeContainer = withTracker(props => {
  const decksHandle = Meteor.subscribe('decks.owned')
  const deckTypesHandle = Meteor.subscribe('deck.types')
  const loading = !decksHandle.ready()
  let loadingDeckTypes = !deckTypesHandle.ready()
  let selectedType = DeckTypes.findOne({value: props.deckType})
  return {
    deckTypes: DeckTypes.find({}).fetch(),
    decks: Decks.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
    loading,
    loadingDeckTypes,
    selectedType
  }
})(AddDeck)