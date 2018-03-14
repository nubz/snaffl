import { Cards } from '../imports/api/cards.js'
import { Decks } from '../imports/api/decks.js'
import { Tags } from '../imports/api/tags.js'
import { TagCards } from '../imports/api/tagCards'
import { TagDecks } from '../imports/api/tagDecks'
import { DeckDecks } from '../imports/api/deckDecks'
import { DeckCards } from '../imports/api/deckCards'
import { TagSubscriptions } from '../imports/api/tagSubscriptions'

export default (reset) => {

  if (reset) {
  	TagSubscriptions.remove({})
  	DeckDecks.remove({})
  	DeckCards.remove({})
    TagCards.remove({})
    TagDecks.remove({})
    Tags.remove({})
    Cards.remove({})
    Decks.remove({})
  }

}