import { Decks } from '../decks/collection'

Meteor.users.addLinks({
  'decks': {
    inversedBy: 'author',
    collection: Decks,
  }
})
