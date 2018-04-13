import DeckDecks from './collection';
import Decks from '../decks/collection'

DeckDecks.addLinks({
  'childDeck': {
    type: 'one',
    collection: Decks,
    field: 'childId'
  },
  'parentDeck': {
    type: 'one',
    collection: Decks,
    field: 'deckId'
  }
})