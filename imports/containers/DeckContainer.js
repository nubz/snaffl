import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Decks } from '../api/decks/collection'
import DeckCards from '../api/deckCards/collection'
import DeckDecks from '../api/deckDecks/collection'
import { TagSubscriptions } from '../api/tagSubscriptions/collection'
import ViewDeck from '../ui/ViewDeck'
import { DeckTypes } from '../api/deckTypes/collection'
import {Meteor} from "meteor/meteor";

export default DeckContainer = withTracker(props => {
  //const deckHandle = Meteor.subscribe('deck', props._id)
  const cardsHandle = Meteor.subscribe('deck.cards', props._id)
  const decksHandle = Meteor.subscribe('decks.owned')
  const decksLinkedHandle = Meteor.subscribe('decks.linked', props._id)
  const tagSubsHandle = Meteor.subscribe('tag.subscription', props._id)
  const deckTypeNames = Meteor.subscribe('permitted.types', props._id, 'deck')
  const loading = !deckTypeNames.ready() && !decksLinkedHandle.ready() && !decksHandle.ready() && !cardsHandle.ready() && !tagSubsHandle.ready()
  const deck = Decks.findOne({_id: props._id})
  const deckChildren = DeckDecks.find({deckId: props._id}).fetch()
  const childIds = _.pluck([...deckChildren], 'childId')
  const deckParents = DeckDecks.find({childId: props._id}).fetch()
  const parentIds = _.pluck([...deckParents], 'deckId')
  const exclusions = [...parentIds,...childIds,props._id]
  let decks = []
  let tagCards = [];
  if (decksHandle.ready()) {
    const deckTypes = DeckTypes.find({accepts: {$all: [deck.deckType]}}).fetch();
    decks = Decks.find({ $and: [ {_id: {$nin: exclusions}}, {deckType: {$in: _.pluck(deckTypes, 'value')}} ] }).fetch()
  }
  const deckCards = DeckCards.find({deckId: props._id}).fetch();
  const tagSubscription = TagSubscriptions.findOne({deckId: props._id})
  return {
    deck,
    decks,
    deckCards,
    deckParents,
    deckChildren,
    tagSubscription,
    loading
  }
})(ViewDeck)