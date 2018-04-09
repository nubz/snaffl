import { Decks } from './collection'
import {DeckTypes} from '../deckTypes/collection'
import {TagSubscriptions} from '../tagSubscriptions/collection'
import { DeckDecks } from '../deckDecks/collection'

Decks.addLinks({
  'author': {
    type: 'one',
    collection: Meteor.users,
    field: 'owner'
  },
  'type': {
    type: 'one',
    collection: DeckTypes,
    field: 'deckTypeId'
  },
  'tagSubscription': {
    type: 'one',
    collection: TagSubscriptions,
    field: 'tagSubscriptionId'
  },
  'parents': {
    inversedBy: 'parentDecks',
    collection: DeckDecks
  },
  'childDecks': {
    inversedBy: 'childDecks',
    collection: DeckDecks
  }
});
