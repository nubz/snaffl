import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Cards } from '../api/cards.js';
 
import SnapCard from './SnapCard.jsx';

class CardList extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
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
      <SnapCard key={card._id} card={card} />
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
 
        <ul className="card-list">
          {this.renderCards()}
        </ul>
      </div>
    );
  }

}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    cards: Cards.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedCount: Cards.find({ checked: true }).count(),
  };
}, CardList);