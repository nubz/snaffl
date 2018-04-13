import {setDefaults} from 'meteor/cultofcoders:grapher-react';

function ErrorComponent({error}) {
  return <div>{error.reason}</div>
};

function LoadingComponent() {
  return <div>Please wait...</div>
};

setDefaults({
  reactive: false, // you can default it to true
  single: false, // doesn't make sense to default this to true
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})

const collections = [
  'decks',
  'cards',
  'tags',
  'cardTypes',
  'deckTypes',
  'deckCards',
  'deckDecks',
  'tagCards',
  'tagSubscriptions'
]


// It is a good idea to import these collections to have them registered
// Because when we use createQuery({collection: 'xxx'}), it will try to search to see
// if any collection with that name has been loaded, and it could throw an exception
import '/imports/api/decks/collection';
import '/imports/api/cards/collection';
import '/imports/api/cardTypes/collection';
import '/imports/api/deckTypes/collection';
import '/imports/api/tagSubscriptions/collection';
import '/imports/api/tagCards/collection';
import '/imports/api/tags/collection';
import '/imports/api/deckDecks/collection';
import '/imports/api/deckCards/collection';

// Links are imported outside collection level
// The reason is that we may have two collections referencing each other, and this results
// in having the Collection object as {__esModule: ...}, and we need the true instantiation of it

// no inverse links
import '/imports/api/deckDecks/links';
// no inverse links
import '/imports/api/tagCards/links';
// no inverse links
import '/imports/api/deckCards/links';
// includes inverse links from deckDecks and deckCards
import '/imports/api/decks/links';
// contains inverse links from decks
import '/imports/api/deckTypes/links';
// contains inverse links from tagCards and deckCards
import '/imports/api/cards/links';
// contains inverse links from cards
import '/imports/api/cardTypes/links';
// contains inverse links from decks and cards
import '/imports/api/users/links';
// contains inverse links from decks
import '/imports/api/tagSubscriptions/links';
// includes inverse links from tagSubscriptions and tagCards
import '/imports/api/tags/links';
