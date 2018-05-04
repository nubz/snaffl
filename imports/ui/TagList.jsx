import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TagListItem from './TagListItem.jsx'
import CircularProgress from 'material-ui/CircularProgress'

class TagList extends Component {

  constructor(props) {
    console.log('TagList props', props)
    super(props)
  }

  renderTags() {
    if (this.props.data.length === 0) {
      return (<p>There are no tags associated with this card.</p>)
    }
    return this.props.data.map((tag) => (
      <TagListItem 
        key={tag.tagId}
        tag={tag.tag}
        cardId={this.props.cardId}
        deckId={this.props.deckId}
        owned={this.props.owned}
      />
    ))
  }
 
  render() {
    return (
      <div style={{marginBottom: 30}}>
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
  cardId: PropTypes.string,
  deckId: PropTypes.string,
  owned: PropTypes.bool
}
 
export default TagList