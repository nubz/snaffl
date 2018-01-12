import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { Cards } from '../api/cards.js';
 
import SnapCard from './SnapCard.jsx';

class AddCard extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
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

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.title.input).value.trim();
 
    Cards.insert({
      title: text,
      owner: Meteor.userId(),
      createdAt: new Date(), // current time
      access: 'public'
    }, () => {
      this.setState({
        open: true,
        message: 'Card added ok'
      });
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.title.input).value = '';
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
 
  renderCards() {
    let filteredCards = this.props.cards;
    if (this.state.hideCompleted) {
      filteredCards = filteredCards.filter(card => !card.checked);
    }
    return filteredCards.map((card) => (
      <SnapCard key={card._id} card={card} multiSnackBar={this.multiSnackBar.bind(this)} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Selected Cards ({this.props.selectedCount})
          </label>
        </header>

        <form onSubmit={this.handleSubmit.bind(this)} >
          <TextField
            id="text-field-controlled"
            ref="title"
            placeholder="Type to add new card and hit enter"
          />
        </form>
 
        <ul className="card-list">
          {this.renderCards()}
        </ul>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

}

AddCard.propTypes = {
  cards: PropTypes.array.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    cards: Cards.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedCount: Cards.find({ checked: true }).count(),
  };
}, AddCard);