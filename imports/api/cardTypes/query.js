import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
  cardTypes: {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.cardType) {
        filters.value = params.cardType
      }
      if (params.title) {
        filters.title = params.title;
      }
    },
    title: 1,
    value: 1,
    icon: 1,
    description: 1,
    cards: 1
  }
});
