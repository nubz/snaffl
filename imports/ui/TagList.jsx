import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import TagListItem from './TagListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'

class TagList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: props.tags
    };
  }

  multiSnackBar = (message, s) => {
    this.setState({
      open: s,
      message: message
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  renderTags() {
    return this.state.tags.map((tag) => (
      <TagListItem 
        key={tag._id} 
        tag={tag} 
        multiSnackBar={this.multiSnackBar.bind(this)}
      />
    ))
  }
 
  render() {
    return (
      <div>
      { this.props.loading ? 
        <CircularProgress size={60} thickness={7} />
      :
        <List>
          {this.renderTags()}
        </List>
      }
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={{'fontWeight': 700}}
        />

      </div>
    )
  }

}

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
 
export default TagList