import DeckDecks from './collection';
import { Decks } from '../decks/collection'

DeckDecks.addLinks({
  'childDecks': {
    collection: Decks,
    field: 'childId'
  },
  'parentDecks': {
    collection: Decks,
    field: 'deckId'
  }
})