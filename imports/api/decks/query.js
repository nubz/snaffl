import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
  'decks': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
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

      options.sort = {createdAt: -1}
    },
    title: 1,
    description: 1,
    image: 1,
    images: 1,
    access: 1,
    createdAt: 1,
    owner: 1,
    deckType: 1,
    subscriptionTag: 1,
    tagSubscriptionId: 1,
    type: {
      title: 1,
      icon: 1,
      accepts: 1,
      subscribes: 1
    },
    author: {
      username: 1
    },
    tagSubscription: {
      tagId: 1,
      types: 1
    },
    parentDecks: {
      deckId: 1
    },
    childDecks: {
      childId: 1
    },
    cards: {
      cardId: 1
    }
  }
});