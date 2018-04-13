import Tags from './collection'
import TagCards from '../tagCards/collection'
import TagSubscriptions from '../tagSubscriptions/collection'

Tags.addLinks({
  'tagCards': {
    collection: TagCards,
    inversedBy: 'tag'
  },
  'tagSubscriptions': {
    collection: TagSubscriptions,
    inversedBy: 'tag'
  }
})