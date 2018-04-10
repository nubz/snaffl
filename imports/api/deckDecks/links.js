import DeckDecks from './collection';
import { Decks } from '../decks/collection'

DeckDecks.addLinks({
  'childDecks': {
    type: 'many',
    collection: Decks,
    field: 'childId'
  },
  'parentDecks': {
    type: 'many',
    collection: Decks,
    field: 'deckId'
  }
})