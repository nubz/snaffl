// It is a good idea to import these collections to have them registered
// Because when we use createQuery({collection: 'xxx'}), it will try to search to see
// if any collection with that name has been loaded, and it could throw an exception
import '/imports/api/decks/collection';
import '/imports/api/cards/collection';
import '/imports/api/cardTypes/collection';
import '/imports/api/deckTypes/collection';
import '/imports/api/tagSubscriptions/collection';

// Links are imported outside collection level
// The reason is that we may have two collections referencing each other, and this results
// in having the Collection object as {__esModule: ...}, and we need the true instantation of it

import '/imports/api/decks/links';
import '/imports/api/cards/links';
import '/imports/api/users/links';
import '/imports/api/tagSubscriptions/links';
import '/imports/api/cardTypes/links';
import '/imports/api/deckTypes/links';

// We also need to import the named queries
// Otherwise they will be unusable without specifically importing them.
import './namedQueries';