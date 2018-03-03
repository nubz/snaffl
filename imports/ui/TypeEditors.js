import React from 'react'
import ArticleEditor from './editors/Article'
import ImageEditor from './editors/Image'
import LocationEditor from './editors/Location'
import EmbedEditor from './editors/Embed'
import EventEditor from './editors/Event'
import EntityEditor from './editors/Entity'


const TypeEditors = {
  'Article': ArticleEditor,
  'Image': ImageEditor,
  'Embed': EmbedEditor,
  'Location': LocationEditor,
  'Event': EventEditor,
  'Entity': EntityEditor,
  'MultiDeck': {},
  'Gallery': {},
  'Map': {},
  'Schedule': {},
  'Directory': {}
}

export default function parseEditor(typeName, props) {
	const MappedEditor = TypeEditors[typeName]
	return <MappedEditor {...props} />
}