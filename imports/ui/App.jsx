import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const style = {
  position: "fixed",
  bottom: "1em",
  right: "1em",
};
 
// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  createCard() {
    FlowRouter.go('Add.Card')
  }

  render() {
    return (
      <div className="home">

          <List>
            <ListItem primaryText="Create your content once and use in many places" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Content is stored in Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Cards can be articles, locations, events, photos, artwork, videos, audio and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Collabarate with others to create collections of Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Wrap existing content from elsewhere in SnapCards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Update content in real time" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Publish collections of Cards in, or as standalone, websites, mobile apps, feeds and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every Card has it's own API endpoint" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection of Cards has it's own API endpoint and built in menu" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection can contain other collections" rightIcon={<ActionInfo />} />
          </List>


        <FloatingActionButton style={style} onClick={this.createCard}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }

}