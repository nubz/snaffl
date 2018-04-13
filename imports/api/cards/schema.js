import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  title: String,
  description: String,
  access: String,
  createdAt: Date,
  images: {type: Object, optional: true},
  image: {type: String, optional: true},
  cardTypeId: String,
  cardType: String,
  owner: String,
  content: {type: Object, optional: true},
  lat: {type: String, optional: true},
  lng: {type: String, optional: true}
})