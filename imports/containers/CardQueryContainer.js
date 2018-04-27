import React from 'react'
import Card from '../ui/Card'
import query from '/imports/api/cards/query.js'
import { withQuery } from 'meteor/cultofcoders:grapher-react'

export default withQuery((props) => {
  return query.clone({...props})
}, {single: true, reactive: true})(Card)