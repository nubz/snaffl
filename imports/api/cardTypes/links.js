import { CardTypes } from "./collection";
import { Cards } from '../cards/collection'

CardTypes.addLinks({
  'cards': {
    collection: Cards,
    inversedBy: 'type'
  }
})