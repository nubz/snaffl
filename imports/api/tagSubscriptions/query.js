import { createQuery } from 'meteor/cultofcoders:grapher';
import TagSubscriptions from '/imports/api/tagSubscriptions/collection'

const tagSubscriptions = TagSubscriptions

export default createQuery({
  'tagSubscriptions': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.deckId) {
        filters.deckId = params.deckId;
      }
      if (params.tagId) {
        filters.tagId = params.tagId;
      }
    },
    tagId: 1,
    deckId: 1,
    tag: {
      tag: 1
    },
    cards: [
      {
        card: {
          title: 1,
          description: 1,
          cardType: 1,
          cardTypeId: 1,
          createdAt: 1,
          owner: 1,
          image: 1,
          images: 1,
          content: 1
        }
      }
    ]

  }
});