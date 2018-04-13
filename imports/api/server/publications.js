import { Meteor } from 'meteor/meteor'
import Cards from '../cards/collection'
import Decks from '../decks/collection'
import DeckCards from '../deckCards/collection'
import DeckDecks from '../deckDecks/collection'
import CardTypes from '../cardTypes/collection'
import DeckTypes from '../deckTypes/collection'
import Tags from '../tags/collection'
import TagCards from '../tagCards/collection'
import TagSubscriptions from '../tagSubscriptions/collection'

export default () => {

  Meteor.publish('card.types', function () {
    return CardTypes.find({})
  })

  Meteor.publish('card.tags', function (cardId) {
    return TagCards.find({cardId: cardId})
  })

  Meteor.publish('tags.fromIds', function (ids) {
    return Tags.find({ _id : { $in : ids } })
  })

  Meteor.publish('tag.cards', function (tagId, types) {
    return TagCards.find({tagId: tagId})
  })

  Meteor.publish('deck.types', function () {
    return DeckTypes.find({})
  })

  Meteor.publish('permitted.types', function (id, type) {
    let typeName = '';
    if (type === 'card') {
      const card = Cards.findOne(id);
      typeName = card.cardType;
    } else {
      const deck = Decks.findOne(id);
      typeName = deck.deckType;
    }

    // we want only decks that accept this cardType
    return DeckTypes.find({accepts: {$all: [typeName]}})
  })

  Meteor.publish("my.publicCards",function(){
    if (!this.userId) {
      return this.ready();
    }
    Counts.publish(this,"my.publicCards.count",Cards.find({owner: this.userId, access:'public'}), {fastCount: true});
  });

  Meteor.publish("my.privateCards",function(){
    if (!this.userId) {
      return this.ready();
    }
    Counts.publish(this,"my.privateCards.count",Cards.find({owner: this.userId, access:'private'}), {fastCount: true});
  });

  Meteor.publish('cards.owned', function() {

    if (!this.userId) {
      return this.ready();
    }

    let cursor = Cards.find({
      owner: this.userId
    })

    return cursor

  })

  Meteor.publish('cards.fromIds', function (ids) {
    return Cards.find({ _id : { $in : ids } })
  })

  Meteor.publish('decks.fromIds', function (ids) {
    return Decks.find({ _id: { $in : ids } })
  })

  Meteor.publish('deck.cards', function (id) {
    return DeckCards.find({ deckId: id })
  })

  Meteor.publish('card.decks', function (id) {
    return DeckCards.find({ cardId: id })
  })

  Meteor.publish('decks.linked', function (id) {
    return DeckDecks.find({$or: [{deckId: id}, {childId: id}]})
  })

  Meteor.publish('cards.public', function(skip) {
    skip = skip || 0
    return Cards.find({
      access: 'public'
    }, {skip: skip, limit: 100})

  })

  Meteor.publish('card', function (_id) {
    return Cards.find({_id: _id})
  })

  Meteor.publish('deck', function (_id) {
    return Decks.find({_id: _id})
  })

  Meteor.publish('tag', function (_id) {
    return Tags.findOne({_id: _id})
  })

  Meteor.publish('decks.owned', function() {

    if (!this.userId) {
      return this.ready();
    }

    return Decks.find({
      owner: this.userId
    })

  })

  Meteor.publish('decks.public', function(skip) {
    skip = skip || 0
    return Decks.find({
      access: 'public'
    }, {skip: skip, limit: 100})

  })

  Meteor.publish('tag.subscription', function (deckId) {
    return TagSubscriptions.find({deckId: deckId})
  })

  Meteor.publish(null, function () {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        role: 1
      }
    });
  }, { is_auto: true });

}