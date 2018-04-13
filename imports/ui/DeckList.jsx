import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List} from 'material-ui/List'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Snackbar from 'material-ui/Snackbar'

class DeckList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Deck added successfully',
      decks: props.data || props.decks //this can be called with a grapher query or regular container
    };
  }

  multiSnackBar = (message, s) => {
    this.setState({
      open: s,
      message: message
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderDecks() {
    return this.state.decks.map((deck) => (
      <SnapdeckListItem 
        key={deck._id} 
        deck={deck} 
        multiSnackBar={this.multiSnackBar.bind(this)}
        cardId={this.props.cardId}
        deckId={this.props.deckId}
      />
    ))
  }
 
  render() {
    return (
      <div>
        <List>
          {this.renderDecks()}
        </List>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={{'fontWeight': 700}}
        />

      </div>
    )
  }

}

DeckList.propTypes = {
  cardId: PropTypes.string,
  deckId: PropTypes.string
}

DeckList.defaultProps = {
  cardId: "",
  deckId: ""
}
 
export default DeckList