import { DeckTypes } from "./collection";
import { Decks } from '../decks/collection'

DeckTypes.addLinks({
  'decks': {
    collection: Decks,
    inversedBy: 'type'
  }
})