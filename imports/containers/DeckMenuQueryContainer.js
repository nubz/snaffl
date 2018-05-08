import React from 'react'
import DeckMenu from '../ui/DeckMenu'
import query from '/imports/api/decks/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  return query.clone({...props});
}, {reactive: true})(DeckMenu)