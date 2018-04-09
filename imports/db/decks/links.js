import { Decks } from '../../api/decks'
import {DeckTypes} from '../../api/deckTypes'
import {TagSubscriptions} from "../../api/tagSubscriptions";

export default () => {
  Decks.addLinks({
    'author': {
      type: 'one',
      collection: Meteor.users,
      field: 'owner'
    },
    'type': {
      type: 'one',
      collection: DeckTypes,
      field: 'deckTypeId'
    },
    'tagSubscription': {
      type: 'one',
      collection: TagSubscriptions,
      field: 'tagSubscriptionId'
    }
  });
}
