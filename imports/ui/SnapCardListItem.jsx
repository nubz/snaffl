import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'

export default class SnapCardListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.card._id)
  }

  removeFromDeck = () => {
    if (this.props.deckId !== "") {
      Meteor.call('removeCardFromDeck', this.props.card._id, this.props.deckId)
    }
  }

  render() {
    const card = this.props.card
    const owned = card.owner === Meteor.userId()
    const title = card.title
    let images = card.images || null
    const imageUrl = card.image || null
    if (!images && imageUrl) {
      let secureUrl = imageApi.returnSecureUrl(imageUrl)
      images = imageApi.makeImageUrls(secureUrl)
    }

    let createdAgo = moment(card.createdAt).fromNow()

    const canRemove = this.props.deckId ? (
      <IconButton
        touch={true}
        tooltip="remove from deck"
      >
        <Remove onClick={this.removeFromDeck} />
      </IconButton>
    ) : undefined

    return (
      <ListItem
        innerDivStyle={{background: 'white', boxShadow: '0 0 2px rgba(0,0,0,0.27)', border:'1px solid #eee', marginBottom:10}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : null}
        primaryText={card.title}
        secondaryText={card.cardType + ' created ' + createdAgo}
        onClick={this.viewFull}
        rightIconButton={canRemove}
      >
      </ListItem>
    );
  }
}
 
SnapCardListItem.propTypes = {
  card: PropTypes.object.isRequired,
}