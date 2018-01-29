import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { lightGreen500, purpleA400, deepOrange700 } from 'material-ui/styles/colors'


const styles = {
  section1: {
    height: 'calc(100vh - 64px)',
    paddingTop: 50,
    boxSizing: 'border-box',
    background: deepOrange700,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Bungee'
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
  },
}

const snafflSVG = '<svg width="100%" height="100%" viewBox="0 -50 700 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path id="path"><animate attributeName="d" from="m0,110 h0" to="m0,110 h1100" dur="6.0s" begin="0s" repeatCount="indefinite"/></path><text font-size="36" font-family="Bungee" fill="hsla(36, 100%, 100%, 1)"><textPath xlink:href="#path">Snaffl your content</textPath></text></svg>'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div style={styles.section1} className="Section">
          <div dangerouslySetInnerHTML={{ __html: snafflSVG }}></div>
        </div>

        <div style={styles.section2} className="Section">
          <List>
            <ListItem primaryText="Create your content once and use in many places" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Content is stored in Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Cards can be articles, locations, events, photos, artwork, videos, audio and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Collabarate with others to create collections of Cards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Wrap existing content from elsewhere in SnafflCards" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Update content in real time" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Real time tag and user streams for live monitoring and curation of content" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Publish collections of Cards in, or as standalone, websites, mobile apps, feeds and more" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every Card has it's own API endpoint" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection of Cards has it's own API endpoint and built in menu" rightIcon={<ActionInfo />} />
            <ListItem primaryText="Every collection can contain other collections" rightIcon={<ActionInfo />} />
          </List>
        </div>

        <div style={styles.section3} className="Section">
          <h2><a href="/login" style={{color: 'white'}}>Sign up for an account</a> to begin creating and taking control over your content</h2>
        </div>

      </div>
    )
  }

}