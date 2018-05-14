import Decks from '../decks/collection'
import Cards from '../cards/collection'

Meteor.users.addLinks({
  'decks': {
    inversedBy: 'author',
    collection: Decks,
  },
  'cards': {
    inversedBy: 'author',
    collection: Cards
  }
})
