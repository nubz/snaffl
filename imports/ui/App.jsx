import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'


const styles = {
  section2: {
    padding: '50px 0',
    boxSizing: 'border-box',
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={styles.section2} className="Section">
          <h2>Snaffl</h2>
          <p>This is a prototype of snaffl - content as a service</p>
          <List>
            <ListItem primaryText="Create your content once and use in many places" />
            <ListItem primaryText="Content is stored in Cards" />
            <ListItem primaryText="Cards can be articles, locations, events, photos, artwork, videos, audio and more" />
            <ListItem primaryText="Collabarate with others to create collections of Cards" />
            <ListItem primaryText="Wrap existing content from elsewhere in SnafflCards" />
            <ListItem primaryText="Update content in real time" />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" />
            <ListItem primaryText="Publish collections of Cards in, or as standalone, websites, mobile apps, feeds and more" />
            <ListItem primaryText="Every Card has it's own API endpoint" />
            <ListItem primaryText="Every collection of Cards has it's own API endpoint and built in menu" />
            <ListItem primaryText="Every collection can contain other collections" />
            <ListItem primaryText="Only account holders can create content" />
          </List>
          <p><a href='/login'>Sign up for an account</a></p>
        </div>
      </div>
    )
  }

}