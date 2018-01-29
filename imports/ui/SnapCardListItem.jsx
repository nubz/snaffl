import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'

const styles = {
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 10
  }
}

export default class SnapCardListItem extends Component {
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
    } else {
      this.handleClose()
      this.props.multiSnackBar('You are not authorised to delete this card', true);
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    if (this.props.card.owner === Meteor.userId()) {
      FlowRouter.go('Edit.Card', {_id: this.props.card._id})
    } else {
      this.props.multiSnackBar('You are not authorised to edit this card', true);
    }
  }

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.card._id)
  }

  render() {
    const card = this.props.card
    const owned = card.owner === Meteor.userId()
    const title = card.title
    const images = card.images || null
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

    let createdAgo = moment(card.createdAt).fromNow()

    return (
      <ListItem
        innerDivStyle={{border:'1px solid #eee', marginBottom:10}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : null}
        primaryText={card.title}
        secondaryText={card.cardType + ' created ' + createdAgo}
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
          Confirm you want to permanently delete this card.
        </Dialog>
      </ListItem>
    );
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
SnapCardListItem.propTypes = {
  card: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired,
}