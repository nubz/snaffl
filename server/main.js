import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Cards } from '../imports/api/cards.js'
import { Decks } from '../imports/api/decks.js'
import { CardTypes } from '../imports/api/cardTypes.js'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'
// note this will not work without a secrets.js file
// a secrets.js file can contain secret api keys and 
// access codes for third party services
import Secrets from '../secrets'

const makeImageUrls = function (id, remote_image) {
  var remote = remote_image && remote_image !== '' ? remote_image : false;
  return {
    large: remote || 'http://res.cloudinary.com/nubz/image/upload/c_scale,w_1200/v1439984721/' + id + '.jpg',
    medium: remote || 'http://res.cloudinary.com/nubz/image/upload/c_scale,w_600/v1439984721/' + id + '.jpg',
    small: remote || 'http://res.cloudinary.com/nubz/image/upload/c_scale,w_240/v1439984721/' + id + '.jpg',
    cropped: remote || 'http://res.cloudinary.com/nubz/image/upload/c_fill,g_center,h_300,w_250/v1439984721/' + id + '.jpg',
    thumb: remote || 'http://res.cloudinary.com/nubz/image/upload/c_fill,g_center,h_240,w_240/v1439984721/' + id + '.jpg'
  };
}

Meteor.startup(() => {

  if (CardTypes.find({}).count() === 0) {
    var cardTypes = JSON.parse(Assets.getText('referenceData/cardTypes.json'))

    _.each(cardTypes, function(cardType) {
      CardTypes.insert(cardType);
    });
  }

  // code to run on server at startup
  Cards._ensureIndex({createdAt: -1})
  Cards._ensureIndex({owner: 1})
  Cards._ensureIndex({access: 1})
  Cards._ensureIndex({title: 1})

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

  Meteor.publish('cards.owned', function() {

    if (!this.userId) {
      return this.ready();
    }

    return Cards.find({
      owner: this.userId
    })

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

  Meteor.publish('decks.owned', function() {

    if (!this.userId) {
      return this.ready();
    }

    return Decks.find({
      owner: this.userId
    })

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

    updateCover: function (id, public_id) {
      var images = makeImageUrls(public_id, false);
      // determine which type of tile
      if (Cards.findOne(id)) {
        Cards.update({_id: id}, {$set: {'publicId': public_id, 'images': images}});
      } else {
        Decks.update({_id: id}, {$set: {'publicId': public_id, 'images': images}});
      }
    },
  })
})
