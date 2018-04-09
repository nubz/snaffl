import { CardTypes } from "./collection";
import { Cards } from '../decks/collection'

CardTypes.addLinks({
  'cards': {
    inversedBy: 'type',
    collection: Cards
  }
})