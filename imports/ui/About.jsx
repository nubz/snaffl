import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

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

          <p>Snaffl is Content as a Service</p>
          <p>This prototype has been built using Meteor, React and Material UI.</p>
          <div>
            <img style={iconStyles} src="images/Meteor-logo.png" />
            <img style={iconStyles} src="images/react.png" />
          </div>
          <p>Only account holders can create content</p>

          <List>
            <ListItem primaryText="Create your content once and use in many places" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Content can be articles, locations, events, photos, artwork, videos, audio and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Collabarate with others to create Decks of Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Wrap existing content from elsewhere in Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Update content in real time" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Publish Decks in, or as standalone, websites, mobile apps, maps, feeds and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every piece of content has it's own API endpoint" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection of content has it's own API endpoint and built in menu" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection can contain other collections" rightIcon={<ActionInfo />} />
          </List>
      </div>
    );
  }

}