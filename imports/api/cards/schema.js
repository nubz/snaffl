import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  title: String,
  description: {type: String, optional: true},
  access: String,
  createdAt: Date,
  images: {type: Object, optional: true},
  'images.thumb': SimpleSchema.RegEx.Url,
  'images.small': SimpleSchema.RegEx.Url,
  'images.medium': SimpleSchema.RegEx.Url,
  'images.large': SimpleSchema.RegEx.Url,
  image: {type: SimpleSchema.RegEx.Url, optional: true},
  cardTypeId: String,
  cardType: String,
  owner: String,
  content: {type: Object, optional: true, blackbox: true},
  lat: {type: Number, optional: true},
  lng: {type: Number, optional: true}
})