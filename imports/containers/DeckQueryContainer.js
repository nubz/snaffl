import React from 'react'
import Deck from '../ui/Deck'
import query from '/imports/api/decks/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  return query.clone({...props});
}, {single: true, reactive: true})(Deck)