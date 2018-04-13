import { Mongo } from 'meteor/mongo';
import schema from './schema'

const DeckDecks = new Mongo.Collection('deckDecks');
export default DeckDecks

DeckDecks.attachSchema(schema)