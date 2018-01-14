import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import ReactDOM from 'react-dom'
import { Cards } from '../api/cards.js'
import SnapCard from './SnapCard.jsx'
import Snackbar from 'material-ui/Snackbar'

class CardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Card added successfully'
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

  renderCards() {
    let filteredCards = this.props.cards;
    return filteredCards.map((card) => (
      <SnapCard 
        key={card._id} 
        card={card} 
        multiSnackBar={this.multiSnackBar.bind(this)} 
      />
    ))
  }
 
  render() {
    return (
      <div>
        {this.renderCards()}
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

}

CardList.propTypes = {
  cards: PropTypes.array.isRequired
}
 
export default createContainer(() => {
  return {
    cards: Cards.find({}, { sort: { createdAt: -1 } }).fetch()
  }
}, CardList)