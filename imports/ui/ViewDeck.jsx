import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snapdeck from './Snapdeck.jsx'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  spinner: {
    marginLeft: '50%',
    left: -30,
    marginTop: '50%',
    top: -30
  }
}

class ViewDeck extends Component {

  constructor(props) {
    super(props);
    console.log('ViewDeck with props', props);
  }
 
  render() {
    return (
      <div style={{position:'relative'}}>
      { this.props.loading ? 
        <CircularProgress style={styles.spinner} size={60} thickness={7} />
      : 
        <Snapdeck
          key={this.props.deck._id} 
          deck={this.props.deck} 
          decks={this.props.decks}
          deckCards={this.props.deckCards}
          deckParents={this.props.deckParents}
          deckChildren={this.props.deckChildren}
          tagSubscription={this.props.tagSubscription}
          multiSnackBar={()=>false}
        />
      }
      </div>
    )
  }
}

ViewDeck.propTypes = {
  deck: PropTypes.object,
  decks: PropTypes.array,
  deckCards: PropTypes.array,
  deckParents: PropTypes.array,
  deckChildren: PropTypes.array,
  tagSubscription: PropTypes.object,
  loading: PropTypes.bool
}

export default ViewDeck