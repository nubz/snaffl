import { CardTypes } from '../imports/api/cardTypes.js'
import { DeckTypes } from '../imports/api/deckTypes.js'

export default (reset) => {

  if (reset) {
    CardTypes.remove({})
    DeckTypes.remove({})
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

}
