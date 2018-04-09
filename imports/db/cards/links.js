import Cards from '../api/cards'
import CardTypes from '../api/cardTypes'

Cards.addLinks({
  'author': {
    type: 'one',
    collection: Meteor.users,
    field: 'owner',
    unique: true,
    index: true
  },
  'type': {
    type: 'one',
    collection: CardTypes,
    field: 'cardType',
    unique: true,
    index: true
  }
});