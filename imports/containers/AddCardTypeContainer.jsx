import React from 'react'
import AddCard from '../ui/AddCard'
import query from '/imports/api/cardTypes/query.js'
import { withQuery } from 'meteor/cultofcoders:grapher-react'

export default withQuery((props) => {
  return query.clone({...props})
}, {single: true, reactive: true})(AddCard)