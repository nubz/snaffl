import { Mongo } from 'meteor/mongo';
import schema from './schema'

const DeckCards = new Mongo.Collection('deckCards')
DeckCards.attachSchema(schema)
export default DeckCards