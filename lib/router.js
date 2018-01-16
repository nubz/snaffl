import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import MainLayout from '../imports/ui/MainLayout'
import AddCard from '../imports/ui/AddCard'
import EditCardContainer from '../imports/ui/EditCardContainer'
import CardListContainer from '../imports/ui/CardListContainer'
import App from '../imports/ui/App'
import About from '../imports/ui/About'
import Dashboard from '../imports/ui/Dashboard'
import { Accounts, STATES } from 'meteor/std:accounts-ui'
import { Session } from 'meteor/session'
import SignInContainer from '../imports/ui/SignInContainer'

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
  loginPath: '/login',
  onSignedInHook: onSignedInHook,
  onSignedOutHook: loggedOut,
  onPostSignUpHook: onPostSignUpHook
});

function onPostSignUpHook() {
    FlowRouter.go('/login/signedUp')
}

function onSignedInHook() {
    if (Meteor.isClient) {
        let route = Session.get('redirectAfterLogin') || 'Home'
        Session.set('logged', true)
        FlowRouter.go(route)
    }
}

function loggedOut() {
    if (Meteor.isClient) {
        Session.set('logged', false)
    }

    FlowRouter.go('/')
}

let exposed = FlowRouter.group({});
let loggedIn = FlowRouter.group({
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

function trackRouteEntry() {
    route = FlowRouter.current()
    Session.set('canAddCard', route.route.name !== 'Add.Card')
}

FlowRouter.triggers.enter([trackRouteEntry], {except: ['Login']});

exposed.route('/', {
    name: 'Home',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
            content() { return <App /> },
            className: 'home',
        })
    }
})

exposed.route('/login/:lastEvent?', {
    name: 'Login',
    action: function (params, queryParams) {
        ReactLayout.render(MainLayout, {
            heading: 'Login to your account',
            className: 'container',
            content() { return <SignInContainer {...params} /> }
        })
    }
})

exposed.route('/about', {
    name: 'About',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
            heading: 'About SnapCards',
            className: 'container',
            content() { return <About /> }
        })
    }
})

exposed.route('/public/cards', {
    name: 'Public.Cards',
    action: function(params, queryParams) {
        params.owner = {$ne: Meteor.userId()}
        params.access = 'public'
        ReactLayout.render(MainLayout, {
            heading: 'Public SnapCards',
            className: 'container',
            content() { return <CardListContainer {...params} /> }
        })
    }
})

loggedIn.route('/card/new', {
    name: 'Add.Card',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
            heading: 'Add a new SnapCard',
            className: 'container',
            content() { return <AddCard /> }
        })
    }
})

loggedIn.route('/card/:_id/edit', {
    name: 'Edit.Card',
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
            heading: 'Edit this SnapCard',
            className: 'container',
            content() { return <EditCardContainer {...params} /> }
        })
    }
})

loggedIn.route('/cards/:access?', {
    name: 'List.Cards',
    action: function (params, queryParams) {
        params.owner = Meteor.userId()
        params.access = params.access || 'public'
        ReactLayout.render(MainLayout, {
            heading: 'My Cards',
            className: 'container',
            content() { return <CardListContainer {...params} /> }
        })
    }
})

loggedIn.route('/dashboard', {
    name: 'Dashboard',
    action: function (params, queryParams) {
        ReactLayout.render(MainLayout, {
            heading: 'Dashboard',
            className: 'container',
            content() { return <Dashboard /> }
        })
    }
})