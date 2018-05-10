import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TagListItem from './TagListItem.jsx'
import CircularProgress from 'material-ui/CircularProgress'

class TagList extends Component {

  constructor(props) {
    console.log('TagList props', props)
    super(props)
    this.state = {
      data: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('TagList nextProps', nextProps)
    this.setState({
      data: nextProps.data
    })
  }

  renderTags() {
    if (this.state.data.length === 0) {
      return (<p>There are no tags associated with this card.</p>)
    }
    return this.state.data.map((tag) => (
      <TagListItem 
        key={tag.tagId}
        tag={tag.tag}
        cardId={this.props.cardId}
        owned={this.props.owned}
      />
    ))
  }
 
  render() {
    return (
      <div style={{marginBottom: 30}}>
      { this.props.isLoading ?
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
  owned: PropTypes.bool
}
 
export default TagList