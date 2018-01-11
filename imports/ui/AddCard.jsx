import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Cards } from '../api/cards.js';
 
import Card from './Card.jsx';
 
// App component - represents the whole app
class AddCard extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Cards.insert({
      title: text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

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
      <Card key={card._id} card={card} />
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

        <form className="new-card" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new card and hit enter"
          />
        </form>
 
        <ul className="card-list">
          {this.renderCards()}
        </ul>
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