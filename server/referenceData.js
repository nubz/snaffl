import { CardTypes } from '../imports/api/cardTypes/collection'
import { DeckTypes } from '../imports/api/deckTypes/collection'
import { Tags } from '../imports/api/tags/collection'
import { TagCards } from '../imports/api/tagCards/collection'
import { TagDecks } from '../imports/api/tagDecks/collection'

export default (reset, fn) => {

  if (!reset && fn) {
    return fn();
  }

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
