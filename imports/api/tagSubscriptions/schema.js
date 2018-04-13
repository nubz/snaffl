import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  tagId: String,
  deckId: String,
  types: Array,
  'types.$': String
})