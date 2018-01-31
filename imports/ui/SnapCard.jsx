import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'

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
    }
  }

  deleteThisCard() {
    if (this.props.card.owner === Meteor.userId()) {
      Cards.remove(this.props.card._id, () => {
        this.handleClose()
        this.props.multiSnackBar('Card deleted ok', true);
      })
    }
  }

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
      console.log('secureUrl = ' + secureUrl)
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
      </Card>
    );
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
SnapCard.propTypes = {
  card: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired
}