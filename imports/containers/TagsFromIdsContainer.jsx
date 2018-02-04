import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Tags } from '../api/tags.js'
import TagList from '../ui/TagList'

export default TagsFromIdsContainer = withTracker(props => {
  const tagIds = _.pluck(props.tags, 'tagId')
  console.log('tagIds', tagIds)
  const tagsHandle = Meteor.subscribe('tags.fromIds', tagIds)
  const loading = !tagsHandle.ready()
  const tags = Tags.find({_id: {$in : tagIds}}).fetch()
  return {
    tags,
    loading
  }
})(TagList)