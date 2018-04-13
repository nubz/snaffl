import { Mongo } from 'meteor/mongo';
import schema from './schema'

const Cards = new Mongo.Collection('cards');
export default Cards
Cards.attachSchema(schema)