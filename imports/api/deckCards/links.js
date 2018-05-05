import DeckCards from './collection';
import Cards from '/imports/api/cards/collection'
import Decks from '/imports/api/decks/collection'

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