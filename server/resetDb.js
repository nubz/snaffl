import { Cards } from '../imports/api/cards.js'
import { Decks } from '../imports/api/decks.js'
import { Tags } from '../imports/api/tags.js'
import { TagCards } from '../imports/api/tagCards'
import { TagDecks } from '../imports/api/tagDecks'

export default (reset) => {

  if (reset) {
    Cards.remove({})
    Decks.remove({})
    TagCards.remove({})
    TagDecks.remove({})
    Tags.remove({})
  }

}