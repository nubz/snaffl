import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import TagCards from '/imports/api/tagCards/collection'

export default class TagListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewCards() {
    FlowRouter.go('/tagged?tagId=' + this.props.tag._id + '&tag=' + this.props.tag.tag)
  }

  handleRequestDelete() {
    TagCards.remove(this.props.tagCardId)
  }

  render() {
    return (
      <Chip key={this.props.tagCardId} style={{display:'inline-block',marginRight:5, marginBottom: 5, backgroundColor: '#1e0e40', textTransform: 'uppercase'}} labelColor={"white"} onClick={this.viewCards.bind(this)} onRequestDelete={this.props.owned ? this.handleRequestDelete.bind(this) : null}>
        {this.props.tag.tag}
      </Chip>
    );
  }
}
 
TagListItem.propTypes = {
  tag: PropTypes.object.isRequired,
  cardId: PropTypes.string,
  owned: PropTypes.bool
}