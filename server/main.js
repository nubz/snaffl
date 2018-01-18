import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Cards } from '../imports/api/cards.js'
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
