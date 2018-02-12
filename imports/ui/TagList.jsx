import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import TagListItem from './TagListItem.jsx'
import CircularProgress from 'material-ui/CircularProgress'

class TagList extends Component {

  constructor(props) {
    super(props)
  }

  renderTags() {
    return this.props.tags.map((tag) => (
      <TagListItem 
        key={tag._id} 
        tag={tag}
        cardId={this.props.cardId}
        deckId={this.props.deckId}
        owned={this.props.owned}
      />
    ))
  }
 
  render() {
    return (
      <div>
      { this.props.loading ? 
        <CircularProgress size={60} thickness={7} />
      :
        this.renderTags()
      }
      </div>
    )
  }

}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  cardId: PropTypes.string,
  deckId: PropTypes.string,
  owned: PropTypes.bool,
  loading: PropTypes.bool
}
 
export default TagList