import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import parseIcon from "./TypeIcons"
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import DeckMenuQueryContainer from '/imports/containers/DeckMenuQueryContainer'

class DeckList extends Component {

  constructor(props) {
    super(props)
    const deckIds = _.pluck(props.data, 'deckId')
    if (props.childId) {
      deckIds.push(props.childId)
    }
    this.state = {
      open: false,
      message: 'Deck added successfully',
      decks: props.data,
      deckIds: deckIds,
      deckMenu: props.deckMenu
    };
  }

  componentWillReceiveProps(nextProps) {
    const deckIds = _.pluck(nextProps.data, 'deckId')
    if (this.props.childId) {
      deckIds.push(this.props.childId)
    }
    this.setState({
      decks: nextProps.data,
      deckMenu: nextProps.deckMenu,
      deckIds: deckIds
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
    if (this.props.cardId) {
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
    if (this.props.childId) {
      return this.state.decks.map((link) => (
        <SnapdeckListItem
          key={link.parentDeck._id}
          deck={link.parentDeck}
          multiSnackBar={this.multiSnackBar.bind(this)}
          cardId={this.props.cardId}
          deckId={this.props.childId}
        />
      ))
    }
    if (this.props.deckId) {
      return this.state.decks.map((link) => (
        <SnapdeckListItem
          key={link.childDeck._id}
          deck={link.childDeck}
          multiSnackBar={this.multiSnackBar.bind(this)}
          cardId={this.props.cardId}
          deckId={this.props.deckId}
        />
      ))
    }

    return this.state.decks.map((deck, i) => (
      <SnapdeckListItem 
        key={deck._id + i}
        deck={deck} 
        multiSnackBar={this.multiSnackBar.bind(this)}
        cardId=''
        deckId=''
      />
    ))
  }
 
  render() {
    if (this.props.headless) {

      return (
        <div>
          {this.props.data.length ? this.renderDecks() : 'There are no decks here yet.'}
          {this.state.deckMenu ?
            <DeckMenuQueryContainer cardId={this.props.cardId} childId={this.props.childId} accepts={this.props.accepts} exclusions={this.state.deckIds} owner={Meteor.userId()} />
            : ''
          }
        </div>
      )
    }
    return (
      <div className="main-bg">
        {this.props.isLoading ?
          <CircularProgress style={{top: '25%', margin: 'auto'}} size={60} thickness={7}/>
          :
          <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
            <h3 className="paperHead deckHead">
              {parseIcon(this.props.icon, {
                height: 50,
                width: 50,
                color: 'white'
              })} {this.props.data.length ? this.props.title : 'As you add decks they will appear here'}
            </h3>
            {this.props.data.length ? this.renderDecks() : 'There are no decks here yet.'}
            {this.state.deckMenu ?
              <DeckMenuQueryContainer cardId={this.props.cardId} childId={this.props.childId} accepts={this.props.accepts} exclusions={this.state.deckIds} owner={Meteor.userId()} />
              : ''
            }
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
    )
  }

}

DeckList.propTypes = {
  cardId: PropTypes.string,
  childId: PropTypes.string,
  deckId: PropTypes.string,
  data: PropTypes.array.isRequired,
  icon: PropTypes.string,
  deckMenu: PropTypes.bool
}

DeckList.defaultProps = {
  cardId: "",
  childId: "",
  deckId: "",
  title: 'Decks',
  icon: 'Cloud',
  deckMenu: false
}
 
export default DeckList