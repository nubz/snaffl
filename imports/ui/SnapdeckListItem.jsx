import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'

export default class SnapdeckListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewFull = () => {
    FlowRouter.go('/deck/' + this.props.deck._id)
  }

  render() {
    const deck = this.props.deck
    const images = deck.images || null
    const createdAgo = moment(deck.createdAt).fromNow()

    return (
      <ListItem
        innerDivStyle={{border:'1px solid #eee', marginBottom:5}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : <Avatar src={imageApi.avatar(deck.image)} />}
        primaryText={deck.title}
        secondaryText={deck.deckType + ' created ' + createdAgo}
        onClick={this.viewFull}
      >
      </ListItem>
    );
  }
}
 
SnapdeckListItem.propTypes = {
  deck: PropTypes.object.isRequired
}