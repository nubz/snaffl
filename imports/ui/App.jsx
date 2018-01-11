import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const style = {
  marginRight: "-20px",
  float: "right",
};
 
// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  createCard() {
    FlowRouter.go('/card/new')
  }

  render() {
    return (
      <div className="home">

          <List>
            <ListItem primaryText="Create your content once and use in many places" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Content can be articles, locations, events, photos, artwork, videos, audio and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Collabarate with others to create collections of content" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Wrap existing content from elsewhere in SnapCards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Update content in real time" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Publish collections of content in, or as standalone, websites, mobile apps, feeds and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every piece of content has it's own API endpoint" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection of content has it's own API endpoint and built in menu" rightIcon={<ActionInfo />} />
          </List>


        <FloatingActionButton style={style} onClick={this.createCard}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }

}