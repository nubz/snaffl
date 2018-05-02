import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCardListItem from './SnapCardListItem.jsx'
import Paper from 'material-ui/Paper'
import parseIcon from './TypeIcons'

class CardList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: 'Card added successfully'
    };
  }

  renderCards() {
    return this.props.data.map((card) => (
      <SnapCardListItem 
        key={card._id} 
        card={card} 
      />
    ))
  }
 
  render() {
    return (
      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
        <h3 className="paperHeadOther">{parseIcon('Recent', {height:50,width:50,color: 'white'})} { this.props.data.length ? this.props.title : 'As you add cards they will appear here'}</h3>
        {this.renderCards()}
      </Paper>
    )
  }

}

CardList.propTypes = {
  title: PropTypes.string
}

CardList.defaultProps = {
  title: 'Cards'
}

export default CardList