import React from 'react'
import ArticleReader from './content/Article'


const TypeContent = {
  'Article': ArticleReader,
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

export default function parseContent(typeName, props) {
	const MappedContent = TypeContent[typeName]
	return <MappedContent {...props} />
}