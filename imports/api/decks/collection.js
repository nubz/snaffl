import { Mongo } from 'meteor/mongo';
import schema from './schema'

const Decks = new Mongo.Collection('decks');
export default Decks
Decks.attachSchema(schema)