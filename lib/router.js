import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import MainLayout from '../imports/ui/MainLayout'
import AddCardContainer from '../imports/containers/AddCardContainer'
import AddCardTypeContainer from '../imports/containers/AddCardTypeContainer'
import AddDeckTypeContainer from '../imports/containers/AddDeckTypeContainer'
import EditCardContainer from '../imports/containers/EditCardContainer'
import EditDeckContainer from '../imports/containers/EditDeckContainer'
import CardContainer from '../imports/containers/CardContainer'
import DeckContainer from '../imports/containers/DeckContainer'
import CardListContainer from '../imports/containers/CardListContainer'
import DeckListContainer from '../imports/containers/DeckListContainer'
import PublicCardsContainer from '../imports/containers/PublicCardsContainer'
import PublicDecksContainer from '../imports/containers/PublicDecksContainer'
import App from '../imports/ui/App'
import About from '../imports/ui/About'
import DashboardContainer from '../imports/containers/DashboardContainer'
import { Accounts, STATES } from 'meteor/std:accounts-ui'
import { Session } from 'meteor/session'
import SignInContainer from '../imports/containers/SignInContainer'
import MyCardsContainer from '../imports/containers/MyCardsContainer'

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
  window.scrollTo(0, 0);
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
      heading: 'About Snaffl',
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
      heading: 'Public Cards',
      className: 'container',
      content() { return <PublicCardsContainer {...params} /> }
    })
  }
})

exposed.route('/public/decks', {
  name: 'Public.Decks',
  action: function(params, queryParams) {
    params.owner = {$ne: Meteor.userId()}
    params.access = 'public'
    ReactLayout.render(MainLayout, {
      heading: 'Public Decks',
      className: 'container',
      content() { return <PublicDecksContainer {...params} /> }
    })
  }
})

loggedIn.route('/card/new', {
  name: 'Add.Card',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Add a new Card',
      className: 'container',
      content() { return <AddCardContainer {...params} /> }
    })
  }
})

loggedIn.route('/card/:_id/edit', {
  name: 'Edit.Card',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Edit this Card',
      className: 'container',
      content() { return <EditCardContainer {...params} /> }
    })
  }
})

loggedIn.route('/deck/:_id/edit', {
  name: 'Edit.Deck',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Edit this Deck',
      className: 'container',
      content() { return <EditDeckContainer {...params} /> }
    })
  }
})

exposed.route('/card/:_id', {
  name: 'View.Card',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content() { return <CardContainer {...params} /> }
    })
  }
})

exposed.route('/deck/:_id', {
  name: 'View.Deck',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content() { return <DeckContainer {...params} /> }
    })
  }
})

loggedIn.route('/my/cards/:access?', {
  name: 'My.Cards',
  action: function (params, queryParams) {
    params.access = params.access || 'public'
    ReactLayout.render(MainLayout, {
      heading: 'My cards',
      className: 'container',
      content() { return <MyCardsContainer {...params} /> }
    })
  }
})

loggedIn.route('/my/decks/:access?', {
  name: 'My.Decks',
  action: function (params, queryParams) {
    params.owner = Meteor.userId()
    params.access = params.access || 'public'
    ReactLayout.render(MainLayout, {
      heading: 'My ' + params.access + ' decks',
      className: 'container',
      content() { return <DeckListContainer {...params} /> }
    })
  }
})

loggedIn.route('/new/:cardType', {
  name: 'Add.CardType',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Add a new ' + params.cardType,
      className: 'container',
      content() { return <AddCardTypeContainer {...params} /> }
    })
  }
})

loggedIn.route('/new-deck/:deckType', {
  name: 'Add.DeckType',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Add a new ' + params.deckType,
      className: 'container',
      content() { return <AddDeckTypeContainer {...params} /> }
    })
  }
})


loggedIn.route('/dashboard', {
  name: 'Dashboard',
  action: function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      heading: 'Dashboard',
      className: 'container',
      content() { return <DashboardContainer {...params} /> }
    })
  }
})