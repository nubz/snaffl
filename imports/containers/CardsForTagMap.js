import React from 'react'
import query from '/imports/api/tagCards/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import DeckMap from '../ui/DeckMap'

export default withQuery((props) => {
  return query.clone({...props})
}, {reactive: true})(DeckMap)