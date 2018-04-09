import { Mongo } from 'meteor/mongo';
import DeckCardsSchema from "./schema";

const DeckCards = new Mongo.Collection('deckCards');
export default DeckCards

DeckCards.attachSchema(DeckCardsSchema);