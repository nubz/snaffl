import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import Gallery from '../ui/Gallery'

export default DeckCardsContainer = withTracker(props => {
  cardsHandle = Meteor.subscribe('deck.cards', props.cards)
  const loading = !cardsHandle.ready()
  const cards = Cards.find({_id: {$in : props.cards}}, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
    loading
  }
})(Gallery)