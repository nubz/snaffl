import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'

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

export default class SnapdeckListItem extends Component {
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
      <ListItem
        innerDivStyle={{border:'1px solid #eee', marginBottom:10}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : <Avatar src={imageApi.avatar(deck.image)} />}
        primaryText={deck.title}
        secondaryText={deck.deckType + ' created ' + createdAgo + ' with ' + deck.cards.length + ' cards within'}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        nestedItems={[
          <ListItem
            key={1}
            primaryText="Edit"
            onClick={this.handleEditRequest}
            leftIcon={parseIcon('Edit')}
          />,
          <ListItem
            key={2}
            primaryText="Delete"
            onClick={this.handleOpen}
            leftIcon={parseIcon('Delete')}
          />,
          <ListItem
            key={3}
            primaryText="View"
            onClick={this.viewFull}
            leftIcon={parseIcon('View')}
          />,
        ]}
      >
        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this deck.
        </Dialog>
      </ListItem>
    );
  }
}

FlatButton.propTypes = {
  deck: PropTypes.object
}
 
SnapdeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired
}