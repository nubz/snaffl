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
import {stateToHTML} from 'draft-js-export-html'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import { convertToRaw } from 'draft-js'

const HOST = Meteor.absoluteUrl()

export default () => {
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
    },
    removeDeckFromDeck: function (childId, deckId) {
      DeckDecks.remove({deckId: deckId, childId: childId})
    },
    tagged: function (tagName) {
      const tag = Tags.findOne({tag: tagName.trim()})

      if(!tag) {
        return []
      }

      const tagCards = TagCards.find({tagId: tag._id}).fetch()
      const cardIds = _.pluck(tagCards, 'cardId')
      return Cards.find({ _id : { $in : cardIds } }).fetch()
    },
    linkedCards: function (links) {
      const cardIds = _.pluck(links, 'cardId')
      return Cards.find({ _id : { $in : cardIds } }).fetch()
    },
    linkedDecks: function (links) {
      const deckIds = _.pluck(links, 'deckId')
      return Decks.find({ _id : { $in : deckIds } }).fetch()
    },
    linkedChildDecks: function (links) {
      const childIds = _.pluck(links, 'childId')
      return Decks.find({ _id : { $in : childIds } }).fetch()
    },
    deckMenu: function (deckId, top) {
      const deckCards = DeckCards.find({deckId: deckId}).fetch()
      const deckDecks = DeckDecks.find({deckId: deckId}).fetch()

      const cards = Meteor.call('linkedCards', deckCards)
      const decks = Meteor.call('linkedChildDecks', deckDecks)
      
      // the menu for each deck
      let menu = []

      // build card menu
      cards.map(function (card) {
        let apiPath = 'api/cards/'
        menu.push({
          id: card._id,
          title: card.title, 
          type: 'card', 
          images: card.images,
          subType: card.cardType,
          url: HOST + apiPath + card._id,
          content: card.content
        })
      })

      // build deck menu 
      decks.map(function (childDeck) {
        let children = Meteor.call('deckMenu', childDeck._id, false);
        menu.push({
          id: childDeck._id,
          title: childDeck.title, 
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