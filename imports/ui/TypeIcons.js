import React from 'react'
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library'
import ImagePhoto from 'material-ui/svg-icons/image/photo'
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location'
import SocialPerson from 'material-ui/svg-icons/social/person'
import ActionEvent from 'material-ui/svg-icons/action/event'
import ActionDescription from 'material-ui/svg-icons/action/description'
import MapsLocalActivity from 'material-ui/svg-icons/maps/local-activity'
import ImageCollections from 'material-ui/svg-icons/image/collections'
import MapsMap from 'material-ui/svg-icons/maps/map'
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import CommunicationContacts from 'material-ui/svg-icons/communication/contacts'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import ActionBookmarkBorder from 'material-ui/svg-icons/action/bookmark-border'
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location'
import ActionHistory from 'material-ui/svg-icons/action/history'
import FileCloudCircle from 'material-ui/svg-icons/file/cloud-circle'

const TypeIcons = {
  'Article': ActionDescription,
  'Image': ImagePhoto,
  'Embed': AvVideoLibrary,
  'Location': MapsAddLocation,
  'Event': ActionEvent,
  'Entity': SocialPerson,
  'MultiDeck': MapsLocalActivity,
  'Gallery': ImageCollections,
  'Map': MapsMap,
  'Schedule': ActionDateRange,
  'Directory': CommunicationContacts,
  'Edit': EditorModeEdit,
  'View': AvPlayArrow,
  'Delete': ActionDeleteForever,
  'List': ActionViewList,
  'Grid': ActionViewModule,
  'TagMap': MapsMyLocation,
  'TagDeck': ActionBookmarkBorder,
  'Recent': ActionHistory,
  'Cloud': FileCloudCircle
}

export default function parseIcon(typeName, style, props) {
	const MappedIcon = TypeIcons[typeName]
	style = style || {h:24,w:24}
	return <MappedIcon style={style} {...props} />
}