import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
  'deckTypes': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.accepts) {
        filters.accepts = {$all: [params.accepts]}
      }
      if (params.limit) {
        options.limit = parseInt(params.limit, 10)
      }
    },
    value: 1,
    title: 1,
    icon: 1,
    accepts: 1,
    subscribes: 1
  }
});