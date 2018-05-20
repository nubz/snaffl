import DeckDecks from './collection';
import Decks from '../decks/collection'

DeckDecks.addLinks({
  'childDeck': {
    type: 'one',
    collection: Decks,
    field: 'childId',
    index: true
  },
  'parentDeck': {
    type: 'one',
    collection: Decks,
    field: 'deckId',
    index: true
  }
})