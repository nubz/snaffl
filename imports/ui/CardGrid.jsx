import imageApi from '../api/imageApi'
import parseIcon from './TypeIcons'
import {GridList, GridTile} from 'material-ui/GridList'
import React, { Component } from 'react'

class CardGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.cards
    })
  }

  render() {
    const iconStyle = {color: "white", padding:10}
    return (
      <GridList
        cellHeight={180}
        cols={3}
        style={{marginTop:5}}
      >
        {this.state.cards.map((tile) => (
          <GridTile
            key={tile._id}
            title={tile.title}
            style={{cursor:'pointer'}}
            subtitle={<span>by <b>{tile.owner}</b></span>}
            onClick={this.props.viewFull.bind(tile)}
            actionIcon={parseIcon(tile.cardType, iconStyle)}
          >
            <img src={tile.images ? tile.images.medium : imageApi.medium(tile.image)} />
          </GridTile>
        ))}
      </GridList>
    )
  }
}

export default CardGrid
