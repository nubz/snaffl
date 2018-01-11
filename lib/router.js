import React, { Component } from 'react'
import MainLayout from '../imports/ui/MainLayout'
import AddCard from '../imports/ui/AddCard'
import App from '../imports/ui/App'

FlowRouter.route('/', {
    action: function(params, queryParams) {
        ReactLayout.render(MainLayout, {
        	content: <App />
        })
    }
});

FlowRouter.route('/card/new', {
    action: function(params, queryParams) {
        console.log("routed to new card form");
        ReactLayout.render(MainLayout, {
        	content: <AddCard />
        })
    }
});