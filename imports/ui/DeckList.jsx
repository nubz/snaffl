import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List} from 'material-ui/List'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import parseIcon from "./TypeIcons"
import Paper from 'material-ui/Paper'

class DeckList extends Component {

  constructor(props) {
    super(props)
    console.log('deck list called with props', props);
    this.state = {
      open: false,
      message: 'Deck added successfully',
      decks: props.data || props.decks
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
      <div className="main-bg">
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHeadOther">{parseIcon('Recent', {height:50,width:50,color: 'white'})} { this.props.data.length ? this.props.title : 'As you add decks they will appear here'}</h3>
          {this.renderDecks()}
        </Paper>
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