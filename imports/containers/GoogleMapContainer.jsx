import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import GoogleMap from '../ui/GoogleMap'

export default GoogleMapContainer = withTracker(props => {
  let loaded = GoogleMaps.loaded()
  return {
    loaded
  }
})(GoogleMap)