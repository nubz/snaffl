import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Cards } from '../api/cards.js'
import CardList from './CardList'

export default CardListContainer = withTracker(props => {
  const search = props.access ? {access: props.access} : {}
  const cards = Cards.find(search, { sort: { createdAt: -1 } }).fetch()
  return {
    cards,
  }
})(CardList)