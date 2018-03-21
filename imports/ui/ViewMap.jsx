import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapDeck from './MapDeck.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import CardList from './CardList'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Avatar from 'material-ui/Avatar'

const styles = {
  spinner: {
    marginLeft: '50%',
    left: -30,
    marginTop: '50%',
    top: -30
  },
  avatar: {
    margin: '0 1em'
  }
}

class ViewMap extends Component {

  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div style={{position:'relative'}}>
      { this.props.loading ? 
        <CircularProgress style={styles.spinner} size={60} thickness={7} />
      : 
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <Avatar style={styles.avatar} src={this.props.deck.images.thumb} />
              <h2>{this.props.deck.title}</h2>
            </ToolbarGroup>
          </Toolbar>
          
          <MapDeck
            key={this.props.deck._id} 
            deck={this.props.deck} 
            decks={this.props.decks}
            deckCards={this.props.deckCards}
            deckParents={this.props.deckParents}
            deckChildren={this.props.deckChildren}
            tagSubscription={this.props.tagSubscription}
            multiSnackBar={()=>false} 
            loading={this.props.loading}
          />
        </div>
      }
      </div>
    )
  }
}

ViewMap.propTypes = {
  deck: PropTypes.object,
  decks: PropTypes.array,
  deckCards: PropTypes.array,
  deckParents: PropTypes.array,
  deckChildren: PropTypes.array,
  tagSubscription: PropTypes.object,
  loading: PropTypes.bool
}

export default ViewMap