import React, { Component, PropTypes } from 'react';
import { Cards } from '../api/cards.js';
 
// Card component - represents a single todo item
export default class Card extends Component {

 toggleChecked() {
    // Set the checked property to the opposite of its current value
    Cards.update(this.props.card._id, {
      $set: { checked: !this.props.card.checked },
    });
  }

  deleteThisCard() {
    Cards.remove(this.props.card._id);
  }

  render() {
    const cardClassName = this.props.card.checked ? 'checked' : '';

    return (
      <li className={cardClassName}>
        <button className="delete" onClick={this.deleteThisCard.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.card.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">{this.props.card.title}</span>
      </li>
    );
  }
}
 
Card.propTypes = {
  // This component gets the Card to display through a React prop.
  // We can use propTypes to indicate it is required
  card: PropTypes.object.isRequired,
};