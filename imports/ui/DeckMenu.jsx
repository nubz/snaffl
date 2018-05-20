import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parseIcon from "./TypeIcons"
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import DeckCards from '/imports/api/deckCards/collection'
import DeckDecks from '/imports/api/deckDecks/collection'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import CircularProgress from 'material-ui/CircularProgress'
import Decks from '../api/decks/collection'

class DeckMenu extends Component {

  constructor(props) {
    super(props)
    console.log('deck menu called with props', props);
    this.state = {
      selectedDeck: 0,
      message: 'Deck added successfully',
      decks: props.data
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log('DeckMenu nextProps', nextProps)
    this.setState({
      decks: nextProps.data
    })
  }

  handleDeckSelect = (e, i, v) => {
    const cardId = this.props.cardId
    if (cardId) {
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
    const childId = this.props.childId
    if (childId) {
      Meteor.call('addChildDeckLink', childId, v, (err, result) => {
        this.setState({
          snackOpen: true,
          message: 'Deck added to parent deck ok',
          selectedDeck: 0
        })
      })
    }
  }

  renderAvailableDecks() {
    return this.state.decks.map((deck) => (
      <MenuItem
        rightIcon={parseIcon(deck.deckType)}
        value={deck._id}
        primaryText={deck.title}
        key={'Menu-' + deck._id}
      />
    ))
  }
 
  render() {
    return (
      <div>
      {this.state.decks.length ?
        <DropDownMenu
          iconStyle={{textColor: 'black'}}
          iconButton={<NavigationExpandMoreIcon/>}
          value={this.state.selectedDeck}
          onChange={this.handleDeckSelect}
          style={{fontSize: 20, marginTop: 20, fontWeight: 700}}
        >
          <MenuItem
            value={0}
            primaryText="+ Add to deck"
          />
          {this.renderAvailableDecks()}
        </DropDownMenu>
        :
        ''
      }
      </div>
    )
  }

}

DeckMenu.propTypes = {
  cardId: PropTypes.string,
  childId: PropTypes.string,
  cardType: PropTypes.string,
  deckType: PropTypes.string
}

DeckMenu.defaultProps = {
  cardId: "",
  childId: "",
  title: 'Decks'
}
 
export default DeckMenu