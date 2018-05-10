import { createQuery } from 'meteor/cultofcoders:grapher';
import Tags from '/imports/api/tags/collection'

const tags = Tags

export default createQuery({
  'tags': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.tag) {
        filters.tag = params.tag;
      }
    },
    tag: 1,
    tagCards: {
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

  }
});