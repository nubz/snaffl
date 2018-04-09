import { DeckDecks } from './collection';

DeckDecks.addLinks({
  'childDecks': {
    collection: Decks,
    fieldName: 'childId'
  },
  'parentDecks': {
    collection: Decks,
    fieldName: 'deckId'
  }
})