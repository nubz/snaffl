import { Mongo } from 'meteor/mongo';
import schema from './schema'

const Cards = new Mongo.Collection('cards');
Cards.attachSchema(schema)
export default Cards