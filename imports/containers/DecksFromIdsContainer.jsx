import React from 'react'
import DeckList from '../ui/DeckList'
import query from '/imports/api/decks/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  const deckIds = _.pluck(props.linkedDecks, 'deckId')
  return query.clone({_id: {$in : deckIds}});
}, {reactive: true})(DeckList)