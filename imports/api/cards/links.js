import {Cards} from './collection'
import {CardTypes} from '../api/cardTypes/collection'
import { TagCards } from '../api/tagCards/collection'

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
  },
  'tags': {
    type: 'many',
    collection: TagCards,
    inversedBy: 'cards'
  }
});