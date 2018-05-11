import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import parseIcon from "./TypeIcons";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-bg">
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHead siteHead">{parseIcon('MultiDeck', {height:50,width:50,color: 'white'})} A headless CMS</h3>
          <p>This is a prototype of <span className="branding">SNAFFL</span> - a headless content management system</p>
          <p>Use this service to create and organise content for use in many places. Each individual piece of content has its own API endpoint and each collection of content you organise here also has its own API endpoint that returns a menu structure for ease of building front end navigation.</p>
          <p>There are distinct content types such as Article, Image, Profile, Media Embed, Event and Location that allow you to enter the relevant fields for each.</p>
          <p>Whilst typed decks (e.g. Maps, Schedules, Directories) may look suspiciously like presentation coupling, it&rsquo;s not, the typing of collections does make sense so that maps only contain location cards and schedules  only contain events, how one chooses to display the contents is still totally down to the decisions made at the presentation layer of your consumers. In addition it is totally possible to make collections of mixed types in a MultiDeck so the optional typed decks (e.g. creating a "directory" deck for entity cards) only relate to contents - not presentation.</p>
          { Meteor.userId() ? <p><a href='/dashboard'>View your dashboard</a></p> : <p><a href='/login'>Sign up for an account</a></p> }
        </Paper>
      </div>
    )
  }

}