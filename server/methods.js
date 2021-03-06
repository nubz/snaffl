import { Meteor } from 'meteor/meteor'
import Cards from '../imports/api/cards/collection'
import Decks from '../imports/api/decks/collection'
import DeckCards from '../imports/api/deckCards/collection'
import DeckDecks from '../imports/api/deckDecks/collection'
import Tags from '../imports/api/tags/collection'
import TagCards from '../imports/api/tagCards/collection'
import { stateToHTML } from 'draft-js-export-html'
import { editorStateFromRaw } from "megadraft"
import Secrets from "../secrets"
import { Cloudinary } from 'meteor/lepozepo:cloudinary'
import Future from 'fibers/future'
import TagSubscriptions from "../imports/api/tagSubscriptions/collection"

const HOST = Meteor.absoluteUrl()

const slugify = (title) => {
  return title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

export default () => {
  Meteor.methods({
    addCard: function (data) {
      Cards.insert(data, (err, result) => {
        const authorLink = Cards.getLink(result, 'author');
        authorLink.set(data.owner)
        const typeLink = Cards.getLink(result, 'type');
        typeLink.set(data.cardTypeId)
      })
    },
    addChildDeckLink: function (childId, parentId) {
      const parentIsChild = DeckDecks.findOne({deckId: childId, childId: parentId})
      if (parentIsChild) {
        console.log('invalid request as ' + parentId + ' is a child of ' + childId)
        throw new Meteor.Error("invalid",
          "Not possible to add an existing child as a parent");
      }
      const parentLink = Decks.getLink(childId, 'parentDecks')
      parentLink.add({
        deckId: parentId,
        childId: childId
      })
    },
    addDeck: function (data) {
      return Decks.insert(data, (err, result) => {
        const authorLink = Decks.getLink(result, 'author')
        authorLink.set(data.owner)
        const typeLink = Decks.getLink(result, 'type')
        typeLink.set(data.deckTypeId)
      })
    },
    uploadRemote: function (remoteUrl) {
      const future = new Future()
      const uploaded = function(data) {
        future.return(data);
      };
      Cloudinary.uploader.upload(remoteUrl, uploaded, {folder: Secrets.cloudinary.folder})
      return future.wait()
    },
    callOEmbed: function (url) {
      const future = new Future()
      const dataReceived = function(err, data) {
        future.return(data)
      }
      HTTP.get(url, dataReceived)
      return future.wait()
    },
    createTagSubscription: function (props) {
      return Meteor.call('touchTag', props.tag, (err, tagId) => {
        TagSubscriptions.insert({deckId: props.deckId, tagId: tagId, types: props.types}, (err, tsResult) => {
          return Decks.update({_id: props.deckId}, {$set: {tagSubscriptionId: tsResult}}, () => {
            const link = Decks.getLink(props.deckId, 'tagSubscription')
            link.set(tsResult)
            return tsResult
          })
        })
      });
    },
    touchTag: function (string) {
      const exists = Tags.findOne({tag: string.trim()});

      if (exists) {

        return exists._id
      }

     return Tags.insert({tag: string.trim()})
    },
    removeTagFromCard: function (id) {
      TagCards.remove(id)
    },
    removeFromAllDecks: function (cardId) {
      DeckCards.remove({cardId: cardId})
      TagCards.remove({cardId: cardId})
    },
    removeAllCardsFromDeck: function (deckId) {
      DeckCards.remove({deckId: deckId})
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

      return Meteor.call('taggedById', tag._id);
    },
    taggedById: function (tagId, types) {
      const tagCards = TagCards.find({tagId: tagId}).fetch()
      const cardIds = _.pluck(tagCards, 'cardId')
      if (types && types.length > 0) {
        return Cards.find({$and: [{ _id : { $in : cardIds }}, {cardType: { $in: types} }]}).fetch()
      }
      return Cards.find({ _id : { $in : cardIds }}).fetch()
    },
    subscribedToTag: function (deckId) {
      const sub = TagSubscriptions.findOne({deckId: deckId})
      if (!sub) {
        return null
      }
      return Meteor.call('taggedById', sub.tagId, sub.types)
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
      const isTagDeck = Meteor.call('subscribedToTag', deckId)
      const deckCards = DeckCards.find({deckId: deckId}).fetch()
      const deckDecks = DeckDecks.find({deckId: deckId}).fetch()

      const cards = isTagDeck || Meteor.call('linkedCards', deckCards)
      const decks = Meteor.call('linkedChildDecks', deckDecks)
      // the menu for each deck
      let menu = [];
      // build card menu
      cards.map(function (card) {
        let apiPath = 'api/cards/'
        menu.push({
          id: card._id,
          title: card.title,
          slug: slugify(card.title),
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
          slug: slugify(childDeck.title),
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
        deck.slug = slugify(deck.title)
        deck.menu = menu
        return deck
      }

      return menu

    },
    setLinks: function (collection, record, linkData) {
      const keys = Object.keys(linkData)
      const collectionMap = {'Cards': Cards, 'Decks': Decks}
      keys.forEach(function(linkName) {
        const link = collectionMap[collection].getLink(record, linkName)
        link.set(linkData[linkName]);
      })
    },
    getArticle: function(id) {
      const card = Cards.findOne({_id: id})
      card.content.html = stateToHTML(editorStateFromRaw(JSON.parse(card.content.Article)).getCurrentContent())
      delete card.content.Article
      return card
    },
    cards() {
      const query = Cards.createQuery({
        title: 1,
        createdAt: 1,
        owner: 1,
        author: {
          username: 1
        },
        type: {
          title: 1,
          icon: 1,
          accepts: 1,
          subscribes: 1
        },
        description: 1,
        image: 1,
        images: 1,
        access: 1,
        content: 1,
        lat: 1,
        lng: 1,
        $options: {
          sort: {createdAt: -1}
        },
      });

      return query.fetch();
    },
    getCard({cardId}) {
      let card = Cards.createQuery({
        $filters: {_id: cardId},
        title: 1,
        createdAt: 1,
        author: {
          username: 1
        }
      });

      return card.fetchOne();
    }
  })
}