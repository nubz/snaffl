import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Cards } from '../imports/api/cards.js';

Meteor.startup(() => {
  // code to run on server at startup
  Cards._ensureIndex({createdAt: -1})
  Cards._ensureIndex({owner: 1})
  Cards._ensureIndex({access: 1})
  Cards._ensureIndex({title: 1})
});
