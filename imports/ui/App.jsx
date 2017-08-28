import React, { Component, PropTypes  } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Cards } from '../api/cards.js';
 
import Card from './Card.jsx';
 
// App component - represents the whole app
class App extends Component {

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
          <h1>SnapCards</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Selected Cards
          </label>
        </header>

        <form className="new-card" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new card"
          />
        </form>
 
        <ul>
          {this.renderCards()}
        </ul>
      </div>
    );
  }

}

App.propTypes = {
  cards: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    cards: Cards.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);