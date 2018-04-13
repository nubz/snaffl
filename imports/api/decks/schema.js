import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  title: String,
  description: {type: String, optional: true},
  createdAt: Date,
  deckType: String,
  deckTypeId: String,
  access: String,
  image: {type: String, optional: true},
  images: {type: Object, optional: true},
  owner: String,
  subscriptionTag: {type: String, optional: true},
  tagSubscriptionId: {type: String, optional: true}
})