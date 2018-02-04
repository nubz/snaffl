import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import { DeckCards } from '../api/deckCards.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'
import Snackbar from 'material-ui/Snackbar'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import parseIcon from './TypeIcons'
import DecksFromIdsContainer from '../containers/DecksFromIdsContainer'
import TagsFromIdsContainer from '../containers/TagsFromIdsContainer'

const cardStyle = {
  marginBottom: 10,
  padding: 10
}

const styles = {
  card: cardStyle,
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
  }
}

export default class SnapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackOpen: false,
      message: '',
      selectedDeck: 0
    }
  }

  deleteThisCard() {
    if (this.props.card.owner === Meteor.userId()) {
      Cards.remove(this.props.card._id, () => {
        this.handleClose()
        FlowRouter.go('My.Cards')
      })
    }
  }

  handleRequestClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  chipHandleRequestDelete() {
    this.props.multiSnackBar('Not deleting tag in this demo', true);
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    FlowRouter.go('/card/' + this.props.card._id + '/edit')
  }

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.card._id)
  }

  handleDeckSelect = (e, i, v) => {
    DeckCards.insert({
        deckId: v,
        cardId: this.props.card._id
    }, () => {
      this.setState({
        snackOpen: true,
        message: 'Card added to deck ok',
        selectedDeck: v
      })
    })

  }

  renderMyDecks() {
    return this.props.decks.map((deck) => (
      <MenuItem 
        rightIcon={parseIcon(deck.deckType)}
        value={deck._id} 
        primaryText={deck.title} 
        key={deck._id}
      />
    ))
  }

  render() {
    const owned = this.props.card.owner === Meteor.userId()
    const cardClassName = this.props.card.checked ? 'checked' : ''
    const title = this.props.card.title
    let images = this.props.card.images || false
    /* a little dance to handle cards uploaded before images
    ** were auto generated from secure url
    */
    const imageUrl = this.props.card.image || null
    if (!images && imageUrl) {
      let secureUrl = imageApi.returnSecureUrl(imageUrl)
      images = imageApi.makeImageUrls(secureUrl)
    }
    const actions = [
        <FlatButton
          label="Cancel"
          primary={false}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Confirm"
          primary={true}
          onClick={this.deleteThisCard.bind(this)}
        />,
      ];

    let createdAgo = moment(this.props.card.createdAt).fromNow()

    return (
      <Card style={cardStyle} initiallyExpanded={false}>
        <CardHeader
          avatar={ images ? images.thumb : null }
          title={this.props.card.title}
          subtitle={this.props.card.cardType + ' created ' + createdAgo}
          actAsExpander={true}
          showExpandableButton={true}
        />

        { images ?

        <CardMedia>
          <img src={images.large} alt={this.props.card.title} />
        </CardMedia>
        : '' 
        }

        <CardText expandable={true}>
          <h2>{this.props.card.title}</h2>
          <p>{this.props.card.description}</p>
        </CardText>

        { owned ? 

        <CardActions>
          <RaisedButton label="Delete" onClick={this.handleOpen} />
          <RaisedButton label="Edit" onClick={this.handleEditRequest} />
        </CardActions>
        : ''
        }

        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this SnapCard.
        </Dialog>
        <hr />
        <h3>Tags</h3>
        <TagsFromIdsContainer tags={this.props.cardTags} />
        <h3>Contained within decks:</h3>
        <DecksFromIdsContainer decks={this.props.cardDecks} />
        <DropDownMenu iconStyle={{textColor:'black'}} iconButton={<NavigationExpandMoreIcon/>} value={this.state.selectedDeck} onChange={this.handleDeckSelect}>
          <MenuItem value={0} primaryText="Add to deck" />
          {this.renderMyDecks()}
        </DropDownMenu>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={{'fontWeight': 700}}
        />
      </Card>
    );
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
SnapCard.propTypes = {
  card: PropTypes.object.isRequired,
  decks: PropTypes.array,
  cardDecks: PropTypes.array,
  cardTags: PropTypes.array,
  multiSnackBar: PropTypes.func.isRequired
}