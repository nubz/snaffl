import DeckCards from './collection';
import Cards from '../cards/collection'
import Decks from '../decks/collection'

DeckCards.addLinks({
  'card': {
    type: 'one',
    collection: Cards,
    field: 'cardId'
  },
  'deck': {
    type: 'one',
    collection: Decks,
    field: 'deckId'
  }
})