import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import MainLayout from '../imports/ui/MainLayout'
import AddCard from '../imports/ui/AddCard'
import CardList from '../imports/ui/CardList'
import App from '../imports/ui/App'
import About from '../imports/ui/About'
import Dashboard from '../imports/ui/Dashboard'
import { Accounts } from 'meteor/std:accounts-ui'
import { Session } from 'meteor/session'

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
  loginPath: '/login',
  onSignedInHook: loggedIn,
  onSignedOutHook: loggedOut
});

function loggedIn() {
	console.log('loggedIn()')
	if (Meteor.isClient) {
		Session.set('logged', true)
		let route = Session.get('redirectAfterLogin') || 'Home'
		FlowRouter.go(route)
	}
}

function loggedOut() {
	console.log('loggedOut()')
	if (Meteor.isClient) {
		Session.set('logged', false)
	}

	FlowRouter.go('/')
}

exposed = FlowRouter.group({});
loggedIn = FlowRouter.group({
	triggersEnter: [function () {
		if (!Meteor.userId()) {
			route = FlowRouter.current()
			if (route.route.name !== 'Login') {
				if (Meteor.isClient) {
					Session.set('redirectAfterLogin', route.path)
				}
			}

			FlowRouter.go('Login');
		}
	}]
});

exposed.route('/', {
	name: 'Home',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
        	heading: 'Welcome',
        	content() { return <App /> }
        })
    }
});

exposed.route('/about', {
	name: 'About',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
        	heading: 'About SnapCards',
        	content() { return <About /> }
        })
    }
});

loggedIn.route('/card/new', {
	name: 'Add.Card',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
        	heading: 'Add a new SnapCard',
        	content() { return <AddCard /> }
        })
    }
});

loggedIn.route('/cards', {
	name: 'List.Cards',
	action: function (params, queryParams) {
		ReactLayout.render(MainLayout, {
			heading: 'My Cards',
			content() { return <CardList /> }
		})
	}
})

loggedIn.route('/dashboard', {
	name: 'Dashboard',
	action: function (params, queryParams) {
		ReactLayout.render(MainLayout, {
			heading: 'Dashboard',
			content() { return <Dashboard /> }
		})
	}
})

exposed.route('/login', {
	name: 'Login',
	action: function (params, queryParams) {
		ReactLayout.render(MainLayout, {
			heading: 'Login to your account',
			content() { return <Accounts.ui.LoginForm /> }
		})
	}
})