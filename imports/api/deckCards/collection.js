import { Mongo } from 'meteor/mongo';
import schema from './schema'

const DeckCards = new Mongo.Collection('deckCards');
export default DeckCards

DeckCards.attachSchema(schema)