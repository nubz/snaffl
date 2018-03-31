import { Meteor } from 'meteor/meteor'
import { Cards } from '../imports/api/cards'
import { Decks } from '../imports/api/decks'
import { DeckCards } from '../imports/api/deckCards'
import { DeckDecks } from '../imports/api/deckDecks'
import { Tags } from '../imports/api/tags'
import { TagCards } from '../imports/api/tagCards'
import { TagDecks } from '../imports/api/tagDecks'
import { stateToHTML } from 'draft-js-export-html'
import { editorStateFromRaw } from "megadraft";
import Secrets from "../secrets";
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import Future from 'fibers/future'
import {TagSubscriptions} from "../imports/api/tagSubscriptions";

const HOST = Meteor.absoluteUrl()

export default () => {
  Meteor.methods({
    uploadRemote: function (remoteUrl) {
      const future = new Future();
      const uploaded = function(data) {
        future.return(data);
      };
      Cloudinary.uploader.upload(remoteUrl, uploaded, {folder: Secrets.cloudinary.folder});
      return future.wait();
    },
    callOEmbed: function (url) {
      const future = new Future();
      const dataReceived = function(err, data) {
        future.return(data);
      }
      HTTP.get(url, dataReceived);
      return future.wait();
    },
    touchTag: function (string) {
      const exists = Tags.findOne({tag: string.trim()});

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
    },
    removeDeckFromDeck: function (childId, deckId) {
      DeckDecks.remove({deckId: deckId, childId: childId})
    },
    tagged: function (tagName) {
      const tag = Tags.findOne({tag: tagName.trim()});

      if(!tag) {
        return []
      }

      return Meteor.call('taggedById', tag._id);
    },
    taggedById: function (tagId, types) {
      const tagCards = TagCards.find({tagId: tagId}).fetch();
      const cardIds = _.pluck(tagCards, 'cardId');
      if (types && types.length > 0) {
        return Cards.find({$and: [{ _id : { $in : cardIds }}, {cardType: { $in: types} }]}).fetch()
      }
      return Cards.find({ _id : { $in : cardIds }}).fetch()
    },
    subscribedToTag: function (deckId) {
      // todo: we need an array of type filters here
      // todo: it needs adding as a field to TagSubscriptions
      const sub = TagSubscriptions.findOne({deckId: deckId});
      if (!sub) {
        return null
      }
      sub.types = sub.types || ['Location', 'Embed'];
      return Meteor.call('taggedById', sub.tagId, sub.types);
    },
    linkedCards: function (links) {
      const cardIds = _.pluck(links, 'cardId');
      return Cards.find({ _id : { $in : cardIds } }).fetch()
    },
    linkedDecks: function (links) {
      const deckIds = _.pluck(links, 'deckId');
      return Decks.find({ _id : { $in : deckIds } }).fetch()
    },
    linkedChildDecks: function (links) {
      const childIds = _.pluck(links, 'childId');
      return Decks.find({ _id : { $in : childIds } }).fetch()
    },
    deckMenu: function (deckId, top) {
      const isTagDeck = Meteor.call('subscribedToTag', deckId);
      const deckCards = DeckCards.find({deckId: deckId}).fetch();
      const deckDecks = DeckDecks.find({deckId: deckId}).fetch();

      const cards = isTagDeck || Meteor.call('linkedCards', deckCards);
      const decks = Meteor.call('linkedChildDecks', deckDecks);
      // the menu for each deck
      let menu = [];
      // build card menu
      cards.map(function (card) {
        let apiPath = 'api/cards/';
        menu.push({
          id: card._id,
          title: card.title,
          description: card.description,
          type: 'card',
          images: card.images,
          subType: card.cardType,
          url: HOST + apiPath + card._id,
          content: card.content
        })
      });

      // build deck menu 
      decks.map(function (childDeck) {
        let children = Meteor.call('deckMenu', childDeck._id, false);
        menu.push({
          id: childDeck._id,
          title: childDeck.title,
          description: childDeck.description,
          type: 'deck', 
          images: childDeck.images, 
          subType: childDeck.deckType,
          url: HOST + 'api/menu/' + childDeck._id, 
          menu: children
        })
      })

      // if this iteration is a top deck return 
      // the actual deck with menu
      if (top) {
        const deck = Decks.findOne(deckId)
        deck.menu = menu
        return deck
      }

      return menu

    },
    getArticle: function(id) {
      const card = Cards.findOne({_id: id})
      card.content.html = stateToHTML(editorStateFromRaw(JSON.parse(card.content.Article)).getCurrentContent())
      delete card.content.Article
      return card
    }
  })
}