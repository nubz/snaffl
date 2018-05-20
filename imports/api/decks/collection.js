import { Mongo } from 'meteor/mongo';
import schema from './schema'

const Decks = new Mongo.Collection('decks')
Decks.attachSchema(schema)
export default Decks