import '/imports/api/grapher';
import {Meteor} from "meteor/meteor";
Meteor.startup(() => {
  Session.set({
    'logged': Meteor.userId(),
    'redirectAfterLogin': 'Dashboard'
  })
});