import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  title: String,
  description: {type: String, optional: true},
  createdAt: Date,
  deckType: String,
  deckTypeId: String,
  access: String,
  image: {type: SimpleSchema.RegEx.Url, optional: true},
  images: {type: Object, optional: true},
  'images.thumb': SimpleSchema.RegEx.Url,
  'images.small': SimpleSchema.RegEx.Url,
  'images.medium': SimpleSchema.RegEx.Url,
  'images.large': SimpleSchema.RegEx.Url,
  owner: String,
  subscriptionTag: {type: String, optional: true},
  tagSubscriptionId: {type: String, optional: true}
})