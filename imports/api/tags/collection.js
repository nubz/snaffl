import { Mongo } from 'meteor/mongo';
import schema from './schema'

const Tags = new Mongo.Collection('tags');
export default Tags
Tags.attachSchema(schema)