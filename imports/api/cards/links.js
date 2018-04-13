import Cards from './collection'
import CardTypes from '../cardTypes/collection'
import TagCards from '../tagCards/collection'
import DeckCards from '../deckCards/collection'

Cards.addLinks({
  'author': {
    type: 'one',
    collection: Meteor.users,
    field: 'owner'
  },
  'type': {
    type: 'one',
    collection: CardTypes,
    field: 'cardType'
  },
  'tags': {
    collection: TagCards,
    inversedBy: 'card'
  },
  'decks': {
    collection: DeckCards,
    inversedBy: 'card'
  }
});