import { Mongo } from 'meteor/mongo';
import schema from './schema'

const DeckTypes = new Mongo.Collection('decktypes');
export default DeckTypes
DeckTypes.attachSchema(schema)