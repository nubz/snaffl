import React from 'react'
import TagList from '/imports/ui/TagList'
import query from '/imports/api/tagCards/query.js';
import {withQuery} from 'meteor/cultofcoders:grapher-react';

export default withQuery((props) => {
  return query.clone({...props});
}, {reactive: true})(TagList)