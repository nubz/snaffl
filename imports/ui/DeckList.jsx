import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'

class DeckList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Deck added successfully'
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
    return this.props.decks.map((deck) => (
      <SnapdeckListItem 
        key={deck._id} 
        deck={deck} 
        multiSnackBar={this.multiSnackBar.bind(this)}
      />
    ))
  }
 
  render() {
    return (
      <div>
      { this.props.loading ? 
        <CircularProgress size={60} thickness={7} />
      :
        <List>
          {this.renderDecks()}
        </List>
      }
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
  decks: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
 
export default DeckList