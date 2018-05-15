import { createQuery } from 'meteor/cultofcoders:grapher'
import Decks from '/imports/api/decks/collection'

export default Decks.createQuery('deckMenu', {
  $filter({filters, options, params}) {
    if (params.owner) {
      filters.owner = params.owner;
    }
  },
  $postFilters: {
    'type': {$ne: undefined},
  },
  title: 1,
  access: 1,
  owner: 1,
  deckType: 1,
  type: {
    $filter({filters, options, params}) {
      filters.accepts = {$all: [params.accepts]}
    },
    value: 1,
    title: 1,
    icon: 1,
    accepts: 1,
    subscribes: 1
  }
});