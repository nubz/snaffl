import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'
import DeckCardsContainer from '../containers/DeckCardsContainer'

const deckStyle = {
  marginBottom: 10,
  padding: 10
}

const styles = {
  deck: deckStyle,
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15
  },
  previewImg: {
    display: 'block',
    marginBottom: 20,
    cursor: 'pointer'
  },
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 10
  }
}

export default class Snapdeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  deleteThisDeck() {
    if (this.props.deck.owner === Meteor.userId()) {
      Decks.remove(this.props.deck._id, () => {
        this.handleClose()
        this.props.multiSnackBar('Deck deleted ok', true);
      })
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    FlowRouter.go('Edit.Deck', {_id: this.props.deck._id})
  }

  viewFull = () => {
    FlowRouter.go('/deck/' + this.props.deck._id)
  }

  render() {
    const deck = this.props.deck
    const owned = deck.owner === Meteor.userId()
    const title = deck.title
    const images = deck.images || null
    const fullImage = this.props.full && images
    const actions = [
        <FlatButton
          label="Cancel"
          primary={false}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Confirm"
          primary={true}
          onClick={this.deleteThisDeck.bind(this)}
        />,
      ];

    let createdAgo = moment(deck.createdAt).fromNow()

    return (
      <div className="container">
        <h2>{deck.title}</h2>
        <p>{deck.description}</p>
        <RaisedButton label="Delete" onClick={this.handleOpen} />
        <RaisedButton label="Edit" onClick={this.handleEditRequest} />
        <hr />
        <h3>Cards:</h3>
        <DeckCardsContainer cards={deck.cards} />
        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this deck.
        </Dialog>
      </div>
    )
  }
}

FlatButton.propTypes = {
  deck: PropTypes.object
}
 
Snapdeck.propTypes = {
  deck: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired
}