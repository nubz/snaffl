import { Mongo } from 'meteor/mongo';
import schema from './schema'

const CardTypes = new Mongo.Collection('cardTypes');
export default CardTypes
CardTypes.attachSchema(schema)