import Decks from './collection'
import DeckTypes from '../deckTypes/collection'
import TagSubscriptions from '../tagSubscriptions/collection'
import DeckDecks from '../deckDecks/collection'
import DeckCards from '../deckCards/collection'

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
  'parentDecks': {
    type: 'many',
    collection: DeckDecks,
    inversedBy: 'childDeck'
  },
  'childDecks': {
    type: 'many',
    collection: DeckDecks,
    inversedBy: 'parentDeck'
  },
  'cards': {
    type: 'many',
    collection: DeckCards,
    inversedBy: 'deck'
  }
});
