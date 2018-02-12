import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapDeck from './MapDeck.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import CardList from './CardList'

const styles = {
  spinner: {
    marginLeft: '50%',
    left: -30,
    marginTop: '50%',
    top: -30
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
        <MapDeck
          key={this.props.deck._id} 
          deck={this.props.deck} 
          deckCards={this.props.deckCards}
          tagSubscription={this.props.tagSubscription}
          multiSnackBar={()=>false} 
          loading={this.props.loading}
        />
      }
      </div>
    )
  }
}

ViewMap.propTypes = {
  deck: PropTypes.object,
  deckCards: PropTypes.array,
  tagSubscription: PropTypes.object,
  loading: PropTypes.bool
}

export default ViewMap