import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import parseIcon from './TypeIcons'

class CardTypeMenuItems extends Component {
  constructor(props) {
    super(props);
  }

  renderCardTypes() {
    return this.props.cardTypes.map((cardType) => (
      <MenuItem 
        rightIcon={parseIcon(cardType.value)}
        value={cardType.value} 
        primaryText={cardType.title} 
        key={cardType.value}
      />
    ))
  }

  render() {
    return (
      <div>
      {this.props.loading ? <CircularProgress /> : this.renderCardTypes()}
      </div>
    )
  }
}

CardTypeMenuItems.PropTypes = {
    cardTypes: PropTypes.array,
    loading: PropTypes.bool
}

export default CardTypeMenuItems