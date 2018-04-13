import { Mongo } from 'meteor/mongo';
import schema from './schema'

const TagCards = new Mongo.Collection('tagCards');

export default TagCards

TagCards.attachSchema(schema)