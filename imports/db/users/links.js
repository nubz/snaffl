import { Decks } from '../../api/decks'

Meteor.users.addLinks({
  'decks': {
    inversedBy: 'author',
    collection: Decks,
  }
})
