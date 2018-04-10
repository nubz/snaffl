import { Cards } from '../imports/api/cards/collection'
import { Decks } from '../imports/api/decks/collection'
import { Tags } from '../imports/api/tags/collection'
import { TagCards } from '../imports/api/tagCards/collection'
import { DeckDecks } from '../imports/api/deckDecks/collection'
import { DeckCards } from '../imports/api/deckCards/collection'
import { TagSubscriptions } from '../imports/api/tagSubscriptions/collection'

export default (reset) => {

  if (reset) {
  	TagSubscriptions.remove({})
  	DeckDecks.remove({})
  	DeckCards.remove({})
    TagCards.remove({})
    Tags.remove({})
    Cards.remove({})
    Decks.remove({})
  }

}