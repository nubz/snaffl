import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Decks from '../api/decks/collection'
import EditDeck from '../ui/EditDeck'

export default EditDeckContainer = withTracker(props => {
  const deckHandle = Meteor.subscribe('deck', props._id)
  let loading = !deckHandle.ready()
  const deck = Decks.findOne(props._id)
  return {
    deck,
    loading
  }
})(EditDeck)