import React from 'react'
import CardList from '../ui/CardList'
import query from '/imports/api/cards/query.js'
import { withQuery } from 'meteor/cultofcoders:grapher-react'

export default withQuery((props) => {
  console.log('cardlist query with props', props)
  return query.clone({...props})
}, {reactive: true})(CardList)