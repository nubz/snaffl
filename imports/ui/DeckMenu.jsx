import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import parseIcon from "./TypeIcons"
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import DeckCards from "../api/deckCards/collection"
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

class DeckMenu extends Component {

  constructor(props) {
    super(props)
    console.log('deck menu called with props', props);
    this.state = {
      selectedDeck: 0,
      message: 'Deck added successfully',
      decks: props.data || props.decks
    };
  }

  handleDeckSelect = (e, i, v) => {
    const cardId = this.props.cardId
    DeckCards.insert({
      deckId: v,
      cardId: cardId
    }, (err, id) => {
      const cardLink = DeckCards.getLink(id, 'card')
      cardLink.set(cardId)
      const deckLink = DeckCards.getLink(id, 'deck')
      deckLink.set(v)

      this.setState({
        snackOpen: true,
        message: 'Card added to deck ok',
        selectedDeck: 0
      })
    })
  }

  renderMyDecks() {
    return this.props.data.map((deck) => (
      <MenuItem
        rightIcon={parseIcon(deck.deckType)}
        value={deck._id}
        primaryText={deck.title}
        key={deck._id}
      />
    ))
  }
 
  render() {
    return (
      <DropDownMenu
        iconStyle={{textColor:'black'}}
        iconButton={<NavigationExpandMoreIcon/>}
        value={this.state.selectedDeck}
        onChange={this.handleDeckSelect}
        style={{fontSize:20,marginTop:20,fontWeight:700}}
      >
        <MenuItem
          value={0}
          primaryText="+ Select a deck to add this card to"
        />
        {this.renderMyDecks()}
      </DropDownMenu>
    )
  }

}

DeckMenu.propTypes = {
  cardId: PropTypes.string,
  deckId: PropTypes.string
}

DeckMenu.defaultProps = {
  cardId: "",
  deckId: "",
  title: 'Decks'
}
 
export default DeckMenu