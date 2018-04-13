import Cards from '../cards/collection'
import TagCards from './collection'
import Tags from '../tags/collection'

TagCards.addLinks({
  'card': {
    type: 'one',
    collection: Cards,
    field: 'cardId'
  },
  'tag': {
    type: 'one',
    collection: Tags,
    field: 'tagId'
  }
})