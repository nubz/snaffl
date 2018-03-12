import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'
import parseIcon from './TypeIcons'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="remove from deck"
  >
    <Remove />
  </IconButton>
);

export default class SnapdeckListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewFull = () => {
    // this is temporary map handling until deck readers
    // are ready
    if (this.props.deck.deckType == 'Map') {
      FlowRouter.go('View.Map', {_id: this.props.deck._id})
    } else {
      FlowRouter.go('/deck/' + this.props.deck._id)
    }

  }

  removeFromDeck = () => {
    Meteor.call('removeCardFromDeck', this.props.cardId, this.props.deck._id)
  }

  render() {
    const deck = this.props.deck
    const images = deck.images || null
    const createdAgo = moment(deck.createdAt).fromNow()
    let canRemove = this.props.cardId !== '' ? (
      <IconButton
        touch={true}
        tooltip="remove from deck"
      >
        <Remove onClick={this.removeFromDeck} />
      </IconButton>
    ) : undefined

    return (
      <ListItem
        innerDivStyle={{border:'1px solid #eee', marginBottom:5}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : <Avatar src={imageApi.avatar(deck.image)} />}
        primaryText={deck.title}
        secondaryText={deck.deckType + ' created ' + createdAgo}
        onClick={this.viewFull}
        rightIconButton={canRemove}
      >
      </ListItem>
    );
  }
}
 
SnapdeckListItem.propTypes = {
  deck: PropTypes.object.isRequired
}