import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

		<i className="material-icons">art_track</i>
		<label>
	        <input
	          type="checkbox"
	          readOnly
	          checked={this.props.card.checked}
	          onClick={this.toggleChecked.bind(this)}
	        />

	        <span className="text-with-icon">{this.props.card.title}</span>
        </label>
      </li>
    );
  }
}
 
Card.propTypes = {
  // This component gets the Card to display through a React prop.
  // We can use propTypes to indicate it is required
  card: PropTypes.object.isRequired,
};