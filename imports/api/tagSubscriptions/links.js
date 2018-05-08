import TagSubscriptions from "./collection";
import Decks from '../decks/collection'
import Tags from '../tags/collection'
import TagCards from '../tagCards/collection'

TagSubscriptions.addLinks({
  'deck': {
    collection: Decks,
    inversedBy: 'tagSubscription'
  },
  'tag': {
    type: 'one',
    collection: Tags,
    field: 'tagId'
  }
})