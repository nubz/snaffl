import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
  value: String,
  title: String,
  description: String,
  icon: String,
  iconPath: String,
  accepts: Array,
  'accepts.$': String,
  subscribes: {type: Array, optional: true},
  'subscribes.$': String
})