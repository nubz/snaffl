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
    field: 'cardTypeId'
  },
  'tagIds': {
    collection: TagCards,
    inversedBy: 'card'
  },
  'deckIds': {
    collection: DeckCards,
    inversedBy: 'card'
  }
});