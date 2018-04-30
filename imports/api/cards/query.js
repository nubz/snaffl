import { createQuery } from 'meteor/cultofcoders:grapher';
import Cards from '/imports/api/cards/collection'

const cards = Cards

export default createQuery({
  'cards': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.createdAt) {
        filters.createdAt = params.createdAt
      }
      if (params.cardType) {
        filters.cardType = params.cardType;
      }
      if (params.owner) {
        filters.owner = params.owner;
      }
      if (params.access) {
        filters.access = params.access;
      }

      options.sort = {createdAt: -1}
    },
    title: 1,
    description: 1,
    image: 1,
    images: 1,
    access: 1,
    createdAt: 1,
    owner: 1,
    cardType: 1,
    cardTypeId: 1,
    lat: 1,
    lng: 1,
    type: {
      title: 1,
      icon: 1,
      accepts: 1,
      subscribes: 1
    },
    author: {
      username: 1
    },
    content: 1
  }
});