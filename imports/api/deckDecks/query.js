import { createQuery } from 'meteor/cultofcoders:grapher';
import DeckDecks from '/imports/api/deckDecks/collection'

const deckDecks = DeckDecks

export default createQuery({
  'deckDecks': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.childId) {
        filters.childId = params.childId;
      }
      if (params.deckId) {
        filters.deckId = params.deckId;
      }
    },
    deckId: 1,
    childId: 1,
    parentDeck: {
      title: 1,
      images: 1,
      image: 1,
      createdAt: 1,
      deckType: 1,
      deckTypeId: 1,
      owner: 1,
      description: 1,
      author: {
        username: 1
      },
      type: {
        accepts: 1,
        value: 1,
        subscribes: 1,
        icon: 1
      }
    },
    childDeck: {
      title: 1,
      images: 1,
      image: 1,
      createdAt: 1,
      deckType: 1,
      deckTypeId: 1,
      owner: 1,
      description: 1,
      author: {
        username: 1
      },
      type: {
        accepts: 1,
        value: 1,
        subscribes: 1,
        icon: 1
      }
    },
  }
});