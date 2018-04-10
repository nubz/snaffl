import { Mongo } from 'meteor/mongo';

const DeckCards = new Mongo.Collection('deckCards');
export default DeckCards