import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { lightGreen500, purpleA400 } from 'material-ui/styles/colors'


const styles = {
  listStyle: {
    maxWidth: '85%',
    margin: '0 auto'
  },
  section1: {
    height: 'calc(100vh - 64px)',
    paddingTop: 50,
    boxSizing: 'border-box',
    background: lightGreen500,
    color: 'white',
    textAlign: 'center'
  },
  section2: {
    paddingTop: 50,
    boxSizing: 'border-box',
  },
  section3: {
    paddingTop: 50,
    boxSizing: 'border-box',
    background: purpleA400,
    color: 'white',
    textAlign: 'center'
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div style={styles.section1} className="Section">
          <h1>SnapCards helps you create and organise all of your content in one place</h1>
        </div>

        <div style={styles.section2} className="Section">
          <List style={styles.listStyle}>
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
        </div>

        <div style={styles.section3} className="Section">
          <h1>Sign up for an account to begin creating and taking control over your content</h1>
        </div>

      </div>
    )
  }

}