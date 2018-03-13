import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'
import parseIcon from './TypeIcons'

export default class SnapdeckListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewFull = () => {
    console.log('viewfull')
    // this is temporary map handling until deck readers are ready
    const view = this.props.deck.deckType === 'Map' ? 'View.Map' : 'View.Deck'
    console.log('with view ' + view + ' and id ' + this.props.deck._id)
    FlowRouter.go(view, {_id: this.props.deck._id})
  }

  removeFromDeck = () => {
    if (this.props.cardId !== "") {
      Meteor.call('removeCardFromDeck', this.props.cardId, this.props.deck._id)
    } else {
      Meteor.call('removeDeckFromDeck', this.props.deckId, this.props.deck._id)
    }

  }

  render() {
    const deck = this.props.deck
    const createdAgo = moment(deck.createdAt).fromNow()
    const avatar = deck.images ? (
      <Avatar src={deck.images.thumb} />
    ) : undefined

    const canRemove = this.props.cardId !== '' || this.props.deckId ? (
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
        leftAvatar={avatar}
        primaryText={deck.title}
        secondaryText={deck.deckType + ' created ' + createdAgo}
        onClick={this.viewFull.bind(this)}
        rightIconButton={canRemove}
      >
      </ListItem>
    );
  }
}
 
SnapdeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  cardId: PropTypes.string,
  deckId: PropTypes.string
}