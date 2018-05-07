import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCardListItem from './SnapCardListItem.jsx'
import Paper from 'material-ui/Paper'
import parseIcon from './TypeIcons'

class CardList extends Component {

  constructor(props) {
    console.log('cardlist props', props)
    super(props)
    this.state = {
      open: false,
      message: 'Card added successfully'
    };
  }

  renderCards() {
    if (this.props.deckId) {
      return this.props.data.map((link) => (
        <SnapCardListItem
          key={link.cardId}
          card={link.card}
          deckId={this.props.deckId}
        />
      ))
    }
    return this.props.data.map((card) => (
      <SnapCardListItem 
        key={card._id} 
        card={card} 
      />
    ))
  }
 
  render() {
    if (this.props.headless) {

      return (
        <div>
          {this.props.data.length ? this.renderCards() : 'There are no cards here yet.'}
        </div>
      )
    }

    return (
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHead cardHead">{parseIcon(this.props.icon, {
            height: 50,
            width: 50,
            color: 'white'
          })} {this.props.data.length ? this.props.title : 'As you add cards they will appear here'}</h3>
          {this.props.data.length ? this.renderCards() : 'There are no cards here yet.'}
        </Paper>
    )
  }

}

CardList.propTypes = {
  title: PropTypes.string,
  headless: PropTypes.bool,
  icon: PropTypes.string

}

CardList.defaultProps = {
  title: 'Cards',
  headless: false,
  icon: 'Cloud'
}

export default CardList