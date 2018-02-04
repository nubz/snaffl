import { CardTypes } from '../imports/api/cardTypes.js'
import { DeckTypes } from '../imports/api/deckTypes.js'
import { Tags } from '../imports/api/tags.js'
import { TagCards } from '../imports/api/tagCards'
import { TagDecks } from '../imports/api/tagDecks'

export default (reset) => {

  if (reset) {
    CardTypes.remove({})
    DeckTypes.remove({})
    TagCards.remove({})
    TagDecks.remove({})
    Tags.remove({})
  }

  if (CardTypes.find({}).count() === 0) {
    const cardTypes = JSON.parse(Assets.getText('referenceData/cardTypes.json'))

    _.each(cardTypes, function(cardType) {
      CardTypes.insert(cardType)
    })
  }

  if (DeckTypes.find({}).count() === 0) {
    const deckTypes = JSON.parse(Assets.getText('referenceData/deckTypes.json'))

    _.each(deckTypes, function(deckType) {
      DeckTypes.insert(deckType)
    })
  }

  if (Tags.find({}).count() === 0) {
    const tags = JSON.parse(Assets.getText('referenceData/tags.json'))

    _.each(tags, function (tag) {
      Tags.insert(tag)
    })
  }

}
