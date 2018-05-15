import React from 'react'
import query from '/imports/api/deckTypes/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import DeckMenuQueryContainer from './DeckMenuQueryContainer'

export default withQuery((props) => {
  console.log('DeckMenuTypesContainer props', props)
  return query.clone({...props});
}, {reactive: true})(DeckMenuQueryContainer)