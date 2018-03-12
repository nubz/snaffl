import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Cards } from '../imports/api/cards'
import { Decks } from '../imports/api/decks'
import { DeckCards } from '../imports/api/deckCards'
import { DeckDecks } from '../imports/api/deckDecks'
import { CardTypes } from '../imports/api/cardTypes'
import { DeckTypes } from '../imports/api/deckTypes'
import { Tags } from '../imports/api/tags'
import { TagCards } from '../imports/api/tagCards'
import { TagDecks } from '../imports/api/tagDecks'
import { TagSubscriptions } from '../imports/api/tagSubscriptions'

import { Cloudinary } from 'meteor/lepozepo:cloudinary'
import referenceData from './referenceData'
import resetDb from './resetDb'
// note this will not work without a secrets.js file
// a secrets.js file can contain secret api keys and 
// access codes for third party services
import Secrets from '../secrets'

const wipeDb = false

Meteor.startup(() => {

  // an imported method to seed
  // reference data with
  // @param reset Boolean
  // when true it will clean out db 
  // and re-seed
  referenceData(false)

  if (wipeDb) {
    resetDb(true)
  }

  Cards._ensureIndex({createdAt: -1})
  Cards._ensureIndex({owner: 1})
  Cards._ensureIndex({access: 1})
  Cards._ensureIndex({title: 1})
  DeckCards._ensureIndex({deckId: 1})
  DeckCards._ensureIndex({cardId: 1})
  DeckCards._ensureIndex({deckId: 1, cardId: 1})
  DeckDecks._ensureIndex({deckId: 1})
  DeckDecks._ensureIndex({childId: 1})
  DeckDecks._ensureIndex({deckId: 1, childId: 1})
  Tags._ensureIndex({tag: 1})
  TagCards._ensureIndex({tagId: 1})
  TagCards._ensureIndex({cardId: 1})
  TagCards._ensureIndex({tagId: 1, cardId: 1})
  TagDecks._ensureIndex({tagId: 1})
  TagDecks._ensureIndex({deckId: 1})
  TagDecks._ensureIndex({tagId: 1, deckId: 1})

  /*
  ** here we are using Secrets.cloudinary.config
  ** with following structure
  ** {
  **   "cloud_name" :"***", 
  **   "api_key": "***", 
  **   "api_secret": "***"
  ** }

  **  to get your own cloudinary secrets for
  **  uploading and managing images and videos
  **  you will need an account at https://cloudinary.com/
  **  TODO: decouple Cloudinary to permit other storage
  **  providers via a generic CDN package
  */
  Cloudinary.config(Secrets.cloudinary.config)

  Meteor.publish('card.types', function () {
    return CardTypes.find({})
  })

  Meteor.publish('card.tags', function (cardId) {
    return TagCards.find({cardId: cardId})
  })

  Meteor.publish('deck.tags', function (deckId) {
    return TagDecks.find({deckId: deckId})
  })

  Meteor.publish('tags.fromIds', function (ids) {
    return Tags.find({ _id : { $in : ids } })
  })

  Meteor.publish('tag.cards', function (tagId) {
    return TagCards.find({tagId: tagId})
  })

  Meteor.publish('tag.decks', function (tagId) {
    return TagDecks.find({tagId: tagId})
  })

  Meteor.publish('deck.types', function () {
    return DeckTypes.find({})
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

  Meteor.methods({
    touchTag: function (string) {
      const exists = Tags.findOne({tag: string.trim()})

      if (exists) {
        return exists._id
      }

     return Tags.insert({tag: string.trim()})
    },
    removeTagFromCard: function (tagId, cardId) {
      TagCards.remove({cardId: cardId, tagId: tagId})
    },
    removeTagFromDeck: function (tagId, deckId) {
      TagDecks.remove({deckId: deckId, tagId: tagId})
    },
    removeFromAllDecks: function (cardId) {
      DeckCards.remove({cardId: cardId});
      TagCards.remove({cardId: cardId});
    },
    removeAllCardsFromDeck: function (deckId) {
      DeckCards.remove({deckId: deckId});
    },
    removeCardFromDeck: function (cardId, deckId) {
      DeckCards.remove({deckId: deckId, cardId: cardId})
    }
  })

  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addCollection(Cards);

})
