import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2 className="branding">SNAFFL</h2>
        <p>This is a prototype of <span className="branding">SNAFFL</span> - content as a service</p>
        <p>Use this service to create and organise content for use in many places. Each individual piece of content has its own API endpoint and each collection of content you organise here also has its own API endpoint that returns a menu structure for ease of building front end navigation.</p>
        <p>There are distinct content types such as Article, Image, Profile, Media Embed, Event and Location that allow you to enter the relevant fields for each.</p>
        <p>There are distinct collection types also, gather Locations into Maps, Images into Galleries and Events into Schedules for example. Using the same piece of content in multiple collections is one advantage of using <span className="branding">SNAFFL</span></p>
        <p><a href='/login'>Sign up for an account</a></p>
      </div>
    )
  }

}