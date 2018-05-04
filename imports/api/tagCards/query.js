import { createQuery } from 'meteor/cultofcoders:grapher';
import TagCards from '/imports/api/tagCards/collection'

const tagCards = TagCards

export default createQuery({
  'tagCards': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.cardId) {
        filters.cardId = params.cardId;
      }
      if (params.tagId) {
        filters.tagId = params.tagId;
      }
    },
    tagId: 1,
    cardId: 1,
    tag: {
      tag: 1
    }
  }
});