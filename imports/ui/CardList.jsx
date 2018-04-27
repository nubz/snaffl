import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCardListItem from './SnapCardListItem.jsx'

class CardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Card added successfully'
    };
  }

  renderCards() {
    return this.props.data.map((card) => (
      <SnapCardListItem 
        key={card._id} 
        card={card} 
      />
    ))
  }
 
  render() {
    return (
      <div>
        <h3>{ this.props.data.length ? this.props.title : 'As you add cards they will appear here'}</h3>
        {this.renderCards()}
      </div>
    )
  }

}

CardList.propTypes = {
  title: PropTypes.string
}

CardList.defaultProps = {
  title: 'Cards'
}

export default CardList