import Decks from '../decks/collection'
import Cards from '../cards/collection'
import Users from './collection.js';

Users.addLinks({
  'decks': {
    inversedBy: 'author',
    collection: Decks,
  },
  'cards': {
    inversedBy: 'author',
    collection: Cards
  }
})
