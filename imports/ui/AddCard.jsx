import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { Cards } from '../api/cards.js';
import Divider from 'material-ui/Divider'
import SnapCard from './SnapCard.jsx';
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton';

const startTime = new Date()
const style = {
  marginBottom: 30
}

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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} style={style}>
          <TextField
            floatingLabelText="Title"
            floatingLabelFixed={true}
            id="text-field-controlled"
            ref="title"
          />
          <RaisedButton label="Add Card" primary={true} onClick={this.handleSubmit.bind(this)} />
        </form>

        <Divider />

        <h2>Recently added Cards</h2>
        {this.renderCards()}

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
};
 
export default createContainer(() => {
  return {
    cards: Cards.find({owner: Meteor.userId(), createdAt: {$gt: startTime}}, { sort: { createdAt: -1 } }).fetch(),
  };
}, AddCard);