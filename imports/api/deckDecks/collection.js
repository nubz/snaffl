import { Mongo } from 'meteor/mongo';
import DeckDecksSchema from './schema.js';

const DeckDecks = new Mongo.Collection('deckDecks');
export default DeckDecks;

DeckDecks.attachSchema(DeckDecksSchema);