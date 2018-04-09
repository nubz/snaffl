import { TagSubscriptions } from "./collection";
import { Decks } from '../decks/collection'

TagSubscriptions.addLinks({
  'decks': {
    inversedBy: 'tagSubscription',
    collection: Decks
  }
})