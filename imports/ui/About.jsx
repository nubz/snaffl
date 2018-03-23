import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';

const style = {
  position: "absolute",
  bottom: "1em",
  right: "1em",
};

const iconStyles = {
  display: 'block',
  maxWidth: '100%'
};
 
// About component - represents the whole About
export default class About extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">

        <p><span className="branding">SNAFFL</span> is Content as a Service</p>
          <p>This prototype has been built using Meteor, React and Material UI.</p>
          <div>
            <img style={iconStyles} src="images/Meteor-logo.png" />
            <img style={iconStyles} src="images/react.png" />
          </div>
          <p>Only account holders can create content</p>

          <List>
            <ListItem primaryText="Create your content once and use in many places" />
            <ListItem primaryText="Content can be articles, locations, events, photos, artwork, videos, audio and more" />
            <ListItem primaryText="Collabarate with others to create Decks of Cards" />
            <ListItem primaryText="Wrap existing content from elsewhere in Cards" />
            <ListItem primaryText="Update content in real time" />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" />
            <ListItem primaryText="Publish Decks in, or as standalone, websites, mobile apps, maps, feeds and more" />
            <ListItem primaryText="Every piece of content has it's own API endpoint" />
            <ListItem primaryText="Every collection of content has it's own API endpoint and built in menu" />
            <ListItem primaryText="Every collection can contain other collections" />
          </List>
      </div>
    )
  }

}