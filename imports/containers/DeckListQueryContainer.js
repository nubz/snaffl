import React from 'react'
import DeckList from '../ui/DeckList'
import query from '/imports/api/decks/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  console.log('decklist props', props)
  return query.clone({...props});
}, {reactive: true})(DeckList)