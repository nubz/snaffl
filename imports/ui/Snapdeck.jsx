import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import Secrets from '../../secrets'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'

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
  }
}
 
// Card component - represents a single todo item
export default class Snapdeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  avatar(url) {
    return url.replace('upload/', 'upload/c_fill,g_center,h_120,w_120/')
  }

  preview(url) {
    return url.replace('upload/', 'upload/c_scale,w_240/')
  }

  fullFat(url) {
    return url.replace('upload/', 'upload/c_scale,w_1200/')
  }

  deleteThisCard() {
    if (this.props.deck.owner === Meteor.userId()) {
      Cards.remove(this.props.deck._id, () => {
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
    FlowRouter.go('/card/' + this.props.deck._id + '/edit')
  }

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.deck._id)
  }

  render() {
    const owned = this.props.deck.owner === Meteor.userId()
    const title = this.props.deck.title
    const cloudinaryUrl = this.props.deck.image || null
    const fullImage = this.props.full && cloudinaryUrl
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

    let createdAgo = moment(this.props.deck.createdAt).fromNow()

    return (
      <Card style={deckStyle} initiallyExpanded={fullImage ? true : false}>
        <CardHeader
          avatar={ cloudinaryUrl ? this.avatar(cloudinaryUrl) : null }
          title={this.props.deck.title}
          subtitle={this.props.deck.deckType + ' created ' + createdAgo}
          actAsExpander={true}
          showExpandableButton={true}
        />
        { fullImage ? 
          <CardMedia
            onClick={!this.props.standalone ? this.viewFull : () => false}
            overlay={<CardTitle title={this.props.deck.title} subtitle={this.props.deck.description} />}>
            <img src={this.fullFat(cloudinaryUrl)} alt={this.props.deck.title} />
          </CardMedia>
        : 
          <CardText expandable={true}>
            {cloudinaryUrl ? <img style={styles.previewImg} onClick={this.viewFull} src={this.preview(cloudinaryUrl)} /> : null }
            <p>{this.props.deck.description}</p>
          </CardText>
        }
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
          Confirm you want to permanently delete this Snapdeck.
        </Dialog>
      </Card>
    );
  }
}

FlatButton.propTypes = {
  deck: PropTypes.object
}
 
Snapdeck.propTypes = {
  deck: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired,
  full: PropTypes.bool,
  standalone: PropTypes.bool
}