import { TagSubscriptions } from "./collection";
import { Decks } from '../decks/collection'
import { Tags } from '../tags/collection'

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