import '/imports/api/grapher';
import {Meteor} from "meteor/meteor";
Meteor.startup(() => {
  Session.set('redirectAfterLogin', 'Dashboard')
  Session.set('logged', Meteor.userId())
});