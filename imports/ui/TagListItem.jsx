import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import parseIcon from './TypeIcons'

export default class TagListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Chip>
        {this.props.tag.tag}
      </Chip>
    );
  }
}
 
TagListItem.propTypes = {
  tag: PropTypes.object.isRequired
}