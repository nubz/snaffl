import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle-outline'

export default class SnapdeckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deck: nextProps.deck
    })
  }

  viewFull = () => {
    // this is temporary map handling until deck readers are ready
    FlowRouter.go('View.Deck', {_id: this.state.deck._id})
  }

  removeFromDeck = () => {
    console.log('removing from deck')
    if (this.props.cardId !== "") {
      console.log('cardId: ' + this.props.cardId + ' from deckId: ' + this.state.deck._id)
      Meteor.call('removeCardFromDeck', this.props.cardId, this.state.deck._id)
    } else if (this.props.childId !== "") {
      console.log('deckId:' + this.props.childId + ' from childDeckId: ' + this.state.deck._id)
      Meteor.call('removeDeckFromDeck', this.props.childId, this.state.deck._id)
    } else {
      console.log('deckId:' + this.props.deckId + ' from childDeckId: ' + this.state.deck._id)
      Meteor.call('removeDeckFromDeck', this.state.deck._id, this.props.deckId)
    }

  }

  render() {
    const deck = this.state.deck
    const createdAgo = moment(deck.createdAt).fromNow()
    const author = deck.author ? deck.author.username : deck.owner
    const avatar = deck.images ? (
      <Avatar src={deck.images.thumb} />
    ) : undefined

    const canRemove = this.props.cardId !== '' || this.props.deckId || this.props.childId ? (
      <IconButton
        touch={true}
        tooltip="remove from deck"
      >
        <Remove onClick={this.removeFromDeck} />
      </IconButton>
    ) : undefined

    return (
      <ListItem
        innerDivStyle={{background: 'white', boxShadow: '0 0 2px rgba(0,0,0,0.27)', border:'1px solid #eee', marginBottom:5}}
        leftAvatar={avatar}
        primaryText={deck.title}
        secondaryText={deck.deckType + ' created by ' + author + ' ' + createdAgo}
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
  deckId: PropTypes.string,
  childId: PropTypes.string
}


SnapdeckListItem.defaultProps = {
  cardId: "",
  childId: "",
  deckId: ""
}