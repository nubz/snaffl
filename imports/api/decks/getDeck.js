import { Decks } from './collection'
import {createQuery} from 'meteor/cultofcoders:grapher'

export default Decks.createQuery('getDeck', {
  $filter({filters, options, params}) {
    filters._id = params._id;
  },
  title: 1,
  description: 1,
  images: 1,
  access: 1,
  createdAt: 1,
  owner: 1,
  deckType: 1,
  type: {
    title: 1,
  },
  author: {
    username: 1
  },
  tagSubscription: 1
  });