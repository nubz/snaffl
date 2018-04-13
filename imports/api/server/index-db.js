import Cards from '../cards/collection'
import DeckCards from '../deckCards/collection'
import DeckDecks from '../deckDecks/collection'
import Tags from '../tags/collection'
import TagCards from '../tagCards/collection'

export default () => {
  Cards._ensureIndex({createdAt: -1})
  Cards._ensureIndex({owner: 1})
  Cards._ensureIndex({access: 1})
  Cards._ensureIndex({title: 1})
  DeckCards._ensureIndex({deckId: 1})
  DeckCards._ensureIndex({cardId: 1})
  DeckCards._ensureIndex({deckId: 1, cardId: 1})
  DeckDecks._ensureIndex({deckId: 1})
  DeckDecks._ensureIndex({childId: 1})
  DeckDecks._ensureIndex({deckId: 1, childId: 1})
  Tags._ensureIndex({tag: 1})
  TagCards._ensureIndex({tagId: 1})
  TagCards._ensureIndex({cardId: 1})
  TagCards._ensureIndex({tagId: 1, cardId: 1})
}