import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks/collection'
import AddDeck from '../ui/AddDeck'
import { DeckTypes } from '../api/deckTypes/collection'

const startTime = new Date()

export default AddDeckTypeContainer = withTracker(props => {
  const decksHandle = Meteor.subscribe('decks.owned')
  const deckTypesHandle = Meteor.subscribe('deck.types')
  const loading = !decksHandle.ready() && !deckTypesHandle.ready()
  let selectedType = DeckTypes.findOne({value: props.deckType})
  return {
    decks: Decks.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
    loading,
    selectedType
  }
})(AddDeck)