import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'

export default class TagListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewCards() {
    FlowRouter.go('/tagged?tagId=' + this.props.tag.tagId + '&tag=' + this.props.tag.tag)
  }

  handleRequestDelete(key) {
    if (this.props.cardId.length) {
      Meteor.call('removeTagFromCard', this.props.tag.tagId, this.props.cardId)
    }
  }

  render() {
    return (
      <Chip style={{display:'inline-block',marginRight:5, marginBottom: 5, backgroundColor: '#1e0e40', textTransform: 'uppercase'}} labelColor={"white"} onClick={this.viewCards.bind(this)} onRequestDelete={this.props.owned ? this.handleRequestDelete.bind(this) : null}>
        {this.props.tag.tag}
      </Chip>
    );
  }
}
 
TagListItem.propTypes = {
  tag: PropTypes.object,
  cardId: PropTypes.string,
  deckId: PropTypes.string,
  owned: PropTypes.bool
}