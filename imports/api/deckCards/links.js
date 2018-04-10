import DeckCards from './collection';
import { Cards } from '../cards/collection'
import { Decks } from '../decks/collection'

DeckCards.addLinks({
  'cards': {
    collection: Cards,
    field: 'cardId'
  },
  'decks': {
    collection: Decks,
    field: 'deckId'
  }
})