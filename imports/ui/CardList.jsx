import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCardListItem from './SnapCardListItem.jsx'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'

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
      <SnapCardListItem 
        key={card._id} 
        card={card} 
        multiSnackBar={this.multiSnackBar.bind(this)} 
        full={true}
        standalone={false}
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
  cards: PropTypes.array.isRequired,
  loading: PropTypes.bool
}
 
export default CardList