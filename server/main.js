import { Meteor } from 'meteor/meteor'
import Publish from '../imports/api/server/publications'
import PublishApi from '../imports/api/server/http-api'
import indexDb from '../imports/api/server/index-db'
import LoadMethods from './methods'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'
import referenceData from './referenceData'
import resetDb from './resetDb'
import { DeckTypes } from '../imports/api/deckTypes/collection'
import { Decks } from '../imports/api/decks/collection'
import { TagSubscriptions } from '../imports/api/tagSubscriptions/collection'
import initDeckLinks from '../imports/db/decks/links'
import initUserLinks from '../imports/db/users/links'
import getDeck from '../imports/api/decks/getDeck'
import '/imports/startup/server';
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
  referenceData(false);

  if (wipeDb) {
    resetDb(true);
  }

  const decksWithoutTypeIds = Decks.find({deckTypeId: {$exists: false }}).fetch();

  decksWithoutTypeIds.forEach(deck => {
    let type = DeckTypes.findOne({value: deck.deckType})
    Decks.update({_id: deck._id}, {$set: {deckTypeId: type._id}}, (err, data) => {
      console.log('updated deck ' + deck.title + ' with deckType ' + type.value + ' with deckTypeId ' + type._id + ' result: ', data);
    })
  })

  const tagSubscriptions = TagSubscriptions.find({}).fetch();
  tagSubscriptions.forEach(sub => {
    Decks.update({_id: sub.deckId}, {$set: {tagSubscriptionId: sub._id}})
  });
  initUserLinks();
  initDeckLinks();

  getDeck.expose()
  const allDecks = Decks.find({}).fetch();

  _.each(allDecks, (deck) => {
    const deckOwnerLink = Decks.getLink(deck, 'author');
    const deckTypeLink = Decks.getLink(deck, 'type');
    const deckTagSubscriptionLink = Decks.getLink(deck, 'tagSubscription')
    deckOwnerLink.set(deck.owner)
    deckTypeLink.set(deck.deckTypeId)
    if (deck.tagSubscriptionId) {
      deckTagSubscriptionLink.set(deck.tagSubscriptionId)
    }
  })

  /*
  ** Create indexes on collections
  */
  indexDb()

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
  **  in the future we will decouple Cloudinary to permit other storage
  **  providers via a generic CDN package
  */
  Cloudinary.config(Secrets.cloudinary.config)

  /*
  ** Publish all data
  */
  Publish()

  /*
  ** Load Meteor.methods
  */
  LoadMethods()

  /*
  ** Expose the HTTP API
  */
  PublishApi()

})
