import { Mongo } from 'meteor/mongo';
import schema from './schema'

const DeckDecks = new Mongo.Collection('deckDecks')

DeckDecks.attachSchema(schema)
export default DeckDecks