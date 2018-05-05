import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import parseIcon from "./TypeIcons"
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'

class DeckList extends Component {

  constructor(props) {
    super(props)
    console.log('deck list called with props', props);
    this.state = {
      open: false,
      message: 'Deck added successfully',
      decks: props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
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
    if (this.props.cardId || this.props.deckId) {
      return this.state.decks.map((link) => (
        <SnapdeckListItem
          key={link.deck._id}
          deck={link.deck}
          multiSnackBar={this.multiSnackBar.bind(this)}
          cardId={this.props.cardId}
          deckId={this.props.deckId}
        />
      ))
    }
    return this.state.decks.map((deck) => (
      <SnapdeckListItem 
        key={deck._id} 
        deck={deck} 
        multiSnackBar={this.multiSnackBar.bind(this)}
        cardId=''
        deckId=''
      />
    ))
  }
 
  render() {
    return (
      <div className="main-bg">
        {this.props.isLoading ?
          <CircularProgress style={{top: '25%', margin: 'auto'}} size={60} thickness={7}/>
          :
          <div>
            {this.props.headless ?
              (this.props.data.length ? this.renderDecks() : 'There are no decks here yet.') :

              <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
                <h3 className="paperHead deckHead">{parseIcon('Recent', {
                  height: 50,
                  width: 50,
                  color: 'white'
                })} {this.props.data.length ? this.props.title : 'As you add decks they will appear here'}</h3>
                {this.props.data.length ? this.renderDecks() : 'There are no decks here yet.'}
              </Paper>

            }

            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
              style={{'fontWeight': 700}}
            />
          </div>
        }
      </div>
    )

  }

}

DeckList.propTypes = {
  cardId: PropTypes.string,
  deckId: PropTypes.string,
  data: PropTypes.array.isRequired
}

DeckList.defaultProps = {
  cardId: "",
  deckId: "",
  title: 'Decks'
}
 
export default DeckList