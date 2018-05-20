import TagSubscriptions from "./collection";
import Decks from '../decks/collection'
import Tags from '../tags/collection'

TagSubscriptions.addLinks({
  'deck': {
    type: 'one',
    collection: Decks,
    field: 'deckId'
  },
  'tag': {
    type: 'one',
    collection: Tags,
    field: 'tagId'
  }
})