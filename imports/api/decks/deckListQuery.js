import { createQuery } from 'meteor/cultofcoders:grapher'
import Decks from '/imports/api/decks/collection'

export default Decks.createQuery('deckList', {
  $filter({filters, options, params}) {
    if (params.deckType) {
      filters.deckType = params.deckType;
    }
    if (params.owner) {
      filters.owner = params.owner;
    }
    if (params.access) {
      filters.access = params.access;
    }

    if(params.createdAt) {
      filters.createdAt = params.createdAt
    }

    if (params.limit) {
      options.limit = parseInt(params.limit, 10)
    }

    options.sort = {createdAt: -1}
  },
  title: 1,
  access: 1,
  images: 1,
  createdAt: 1,
  owner: 1,
  author: {
    username: 1
  },
  deckType: 1,
  type: {
    value: 1,
    title: 1,
    icon: 1,
    accepts: 1,
    subscribes: 1
  }
});