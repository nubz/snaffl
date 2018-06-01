import React from 'react'
import ArticleReader from './content/Article'
import ImageReader from './content/Image'
import LocationReader from './content/Location'
import EventReader from './content/Event'
import EmbedReader from './content/Embed'
import EntityReader from './content/Entity'


const TypeContent = {
  'Article': ArticleReader,
  'Image': ImageReader,
  'Embed': EmbedReader,
  'Location': LocationReader,
  'Event': EventReader,
  'Entity': EntityReader,
  'MultiDeck': {},
  'Gallery': {},
  'Map': {},
  'Schedule': {},
  'Directory': {}
}

export default (typeName, props) => {
	const MappedContent = TypeContent[typeName]
	return <MappedContent {...props} />
}