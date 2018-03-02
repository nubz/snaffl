import React from 'react'
import ArticleEditor from './editors/Article'


const TypeEditors = {
  'Article': ArticleEditor,
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