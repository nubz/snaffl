import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCardListItem from './SnapCardListItem.jsx'
import CircularProgress from 'material-ui/CircularProgress'

class CardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Card added successfully'
    };
  }

  renderCards() {
    return this.props.cards.map((card) => (
      <SnapCardListItem 
        key={card._id} 
        card={card} 
      />
    ))
  }
 
  render() {
    return (
      <div>
      {this.props.loading ? 
        <CircularProgress size={60} thickness={7} />
      :
        this.renderCards()
      }
      </div>
    )
  }

}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
 
export default CardList