import React from 'react'
import CardList from '../ui/CardList'
import cardQuery from '/imports/api/tagCards/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  return cardQuery.clone({...props})
}, {reactive: true})(CardList)