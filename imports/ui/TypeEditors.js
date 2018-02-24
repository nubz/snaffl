import React from 'react'
import Article from './editors/Article'


const TypeEditors = {
  'Article': Article,
  'Image': {},
  'Embed': {},
  'Location': {},
  'Event': {},
  'Entity': {},
  'MultiDeck': {},
  'Gallery': {},
  'Map': {},
  'Schedule': {},
  'Directory': {},
  'Edit': {},
  'View': {},
  'Delete': {},
  'List': {},
  'Grid': {}
}

export default function parseEditor(typeName, props) {
	const MappedEditor = TypeEditors[typeName]
	return <MappedEditor {...props} />
}