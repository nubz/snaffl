import { DeckTypes } from "./collection";
import { Decks } from '../decks/collection'

DeckTypes.addLinks({
  'decks': {
    inversedBy: 'type',
    collection: Decks
  }
})