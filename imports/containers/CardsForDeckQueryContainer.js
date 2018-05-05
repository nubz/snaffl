import React from 'react'
import CardList from '../ui/CardList'
import query from '/imports/api/deckCards/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  console.log('query for card list', props)
  return query.clone({...props})
}, {reactive: true})(CardList)