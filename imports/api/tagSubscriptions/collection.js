import { Mongo } from 'meteor/mongo';
import schema from './schema'

const TagSubscriptions = new Mongo.Collection('tagSubscriptions');
export  default TagSubscriptions

TagSubscriptions.attachSchema(schema)