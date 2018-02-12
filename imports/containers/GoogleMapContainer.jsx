import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import GoogleMap from '../ui/GoogleMap'

export default GoogleMapContainer = withTracker(props => {
  console.log('GoogleMapContainer props', props)
  let loaded = GoogleMaps.loaded()
  return {
    loaded
  }
})(GoogleMap)