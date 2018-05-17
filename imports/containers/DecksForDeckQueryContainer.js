import React from 'react'
import DeckList from '../ui/DeckList'
import query from '/imports/api/deckDecks/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  console.log('query for deck list', props)
  return query.clone({...props})
}, {reactive: true})(DeckList)