import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'
import { TagCards } from '../api/tagCards'
import { TagDecks } from '../api/tagDecks'

export default class TagListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewCards() {
    FlowRouter.go('/tagged?tagId=' + this.props.tag._id + '&tag=' + this.props.tag.tag)
  }

  handleRequestDelete(key) {
    if (this.props.cardId.length) {
      Meteor.call('removeTagFromCard', this.props.tag._id, this.props.cardId)
    }
  }

  render() {
    return (
      <Chip style={{display:'inline-block',marginRight:5, marginBottom: 5}} onClick={this.viewCards.bind(this)} onRequestDelete={this.props.owned ? this.handleRequestDelete.bind(this) : null}>
        {this.props.tag.tag}
      </Chip>
    );
  }
}
 
TagListItem.propTypes = {
  tag: PropTypes.object.isRequired,
  cardId: PropTypes.string,
  deckId: PropTypes.string,
  owned: PropTypes.bool
}