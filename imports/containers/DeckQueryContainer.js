import React from 'react'
import { Decks } from '../api/decks'
import { DeckCards } from '../api/deckCards'
import { DeckDecks } from '../api/deckDecks'
import ViewDeck from '../ui/ViewDeck'
import { DeckTypes } from '../api/deckTypes.js'
import {Meteor} from "meteor/meteor";
import getDeck from '../db/decks/getDeck'
import { createQuery } from 'meteor/cultofcoders:grapher'
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import { withTracker } from 'meteor/react-meteor-data'

const query = getDeck.clone()

export default withTracker(props => {
  const cardsHandle = Meteor.subscribe('deck.cards', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const decksLinkedHandle = Meteor.subscribe('decks.linked', props._id)
  const deckTypeNames = Meteor.subscribe('permitted.types', props._id, 'deck')
  const subscriptionHandle = query.subscribe();
  const loading = !deckTypeNames.ready() && !decksLinkedHandle.ready() && !decksHandle.ready() && !cardsHandle.ready() && !subscriptionHandle.ready()
  const deck = query.setParams({_id: props._id}).fetchOne((err, data) => { console.log('grapher response', arguments)})
  console.log('deck from grapher', deck);
  const deckChildren = DeckDecks.find({deckId: props._id}).fetch()
  const childIds = _.pluck([...deckChildren], 'childId')
  const deckParents = DeckDecks.find({childId: props._id}).fetch()
  const parentIds = _.pluck([...deckParents], 'deckId')
  const exclusions = [...parentIds,...childIds,props._id]
  let decks = []
  if (decksHandle.ready()) {
    const deckTypes = DeckTypes.find({accepts: {$all: [deck.deckType]}}).fetch();
    decks = Decks.find({ $and: [ {_id: {$nin: exclusions}}, {deckType: {$in: _.pluck(deckTypes, 'value')}} ] }).fetch()
  }
  const deckCards = DeckCards.find({deckId: props._id}).fetch();
  return {
    deck,
    decks,
    deckCards,
    deckParents,
    deckChildren,
    loading
  }
})(ViewDeck)