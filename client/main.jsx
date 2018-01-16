import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MainLayout from '../imports/ui/MainLayout'
 
import App from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  Session.set({
  	'logged': Meteor.userId(),
  	'redirectAfterLogin': 'Dashboard'
  })
 
  FlowRouter.go(FlowRouter.current().route.name);
});