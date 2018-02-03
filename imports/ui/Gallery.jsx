import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from 'material-ui/CircularProgress'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

class Gallery extends Component {

  constructor(props) {
    super(props);
  }

  viewFull(e) {
    FlowRouter.go('View.Card', {_id: this._id})
  }

  render() {
    return (
        <div>
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> :
            <GridList
              cellHeight={180}
              cols={3}
              style={{marginTop:5}}
            >
              {this.props.cards.map((tile) => (
                <GridTile
                  key={tile._id}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.owner}</b></span>}
                  style={{cursor:'pointer'}}
                  onClick={this.viewFull.bind(tile)}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                >
                  {tile.images ? <img src={tile.images.small} /> : ''}
                </GridTile>
              ))}
            </GridList> 
        }
        </div>
    )
  }

}

Gallery.propTypes = {
    cards: PropTypes.array,
    loading: PropTypes.bool
}

export default Gallery
