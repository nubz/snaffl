import { Meteor } from 'meteor/meteor';

const Users = Meteor.users;

if (Meteor.isServer) {
  Users.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
  });
  Users.deny({
    insert: () => false,
    update: () => false,
    remove: () => false,
  })
}

export default Users;