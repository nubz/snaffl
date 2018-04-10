import { Cards } from '../cards/collection'
import { TagCards } from './collection'
import { Tags } from '../tags/collection'

TagCards.addLinks({
  'cards': {
    collection: Cards,
    fieldName: 'cardId'
  },
  'tags': {
    collection: Tags,
    fieldName: 'tagId'
  }
})