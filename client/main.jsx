import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MainLayout from '../imports/ui/MainLayout'
 
import App from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  FlowRouter.go("/");
});