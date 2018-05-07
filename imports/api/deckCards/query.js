import { createQuery } from 'meteor/cultofcoders:grapher';
import DeckCards from '/imports/api/deckCards/collection'

const deckCards = DeckCards

export default createQuery({
  'deckCards': {
    $filter({filters, options, params}) {
      if (params._id) {
        filters._id = params._id;
      }
      if (params.cardId) {
        filters.cardId = params.cardId;
      }
      if (params.deckId) {
        filters.deckId = params.deckId;
      }
    },
    deckId: 1,
    cardId: 1,
    deck: {
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
});