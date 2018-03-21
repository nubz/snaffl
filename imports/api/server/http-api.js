import { Meteor } from 'meteor/meteor'
import { Restivus } from 'meteor/nimble:restivus'
import { Cards } from '../cards'
import { Decks } from '../decks'

export default () => {

  let Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addCollection(Cards);

  Api.addCollection(Decks);

  Api.addRoute('menu/:deckId', {authRequired: false}, {
    get: function () {
      return Meteor.call('deckMenu', this.urlParams.deckId, true)
    }
  })

  Api.addRoute('tagged/:tag', {authRequired: false}, {
    get: function () {
      return Meteor.call('tagged', this.urlParams.tag);
    }
  });

  Api.addRoute('article/:id', {authRequired: false}, {
    get: function () {
      return Meteor.call('getArticle', this.urlParams.id)
    }
  })

}