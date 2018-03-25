import { Meteor } from 'meteor/meteor'
import Publish from '../imports/api/server/publications'
import PublishApi from '../imports/api/server/http-api'
import indexDb from '../imports/api/server/index-db'
import LoadMethods from './methods'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'
import referenceData from './referenceData'
import resetDb from './resetDb'
import { DeckTypes } from '../imports/api/deckTypes.js'
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
