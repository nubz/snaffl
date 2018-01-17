import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    return this.props.cards.map((card) => (
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
          style={{'fontWeight': 700}}
        />
      </div>
    )
  }

}

CardList.propTypes = {
  cards: PropTypes.array.isRequired
}
 
export default CardList