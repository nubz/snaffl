import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import CardList from './CardList'
import CircularProgress from 'material-ui/CircularProgress'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import imageApi from '../api/imageApi'
import Toggle from 'material-ui/Toggle'

class MyCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.access,
      mode: 'list'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  handleModeChange = (event, mode) => {
    const selectedMode = mode ? 'grid' : 'mode'
    this.setState({mode: selectedMode});
  };

  viewFull(e) {
    FlowRouter.go('View.Card', {_id: this._id})
  }

  render() {
    return (
        <div>
          <Toggle
            label="View as a grid"
            onToggle={this.handleModeChange}
            labelPosition="right"
            style={{marginBottom: 20, float:'right'}}
          />
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> :
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="Public Cards" value="public">
                { this.state.mode == 'grid' ? 
                    <GridList
                      cellHeight={180}
                      cols={3}
                      style={{marginTop:5}}
                    >
                      {this.props.publicCards.map((tile) => (
                        <GridTile
                          key={tile._id}
                          title={tile.title}
                          subtitle={<span>by <b>{tile.owner}</b></span>}
                          onClick={this.viewFull.bind(tile)}
                          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                          <img src={tile.images ? tile.images.medium : imageApi.medium(tile.image)} />
                        </GridTile>
                      ))}
                    </GridList> 
                : <CardList cards={this.props.publicCards} /> 
                }
            </Tab>
            <Tab label="Private Cards" value="private">
            { this.state.mode == 'grid'? 
                    <GridList
                      cellHeight={180}
                      cols={3}
                      style={{marginTop:5}}
                    >
                      {this.props.privateCards.map((tile) => (
                        <GridTile
                          key={tile._id}
                          title={tile.title}
                          subtitle={<span>by <b>{tile.owner}</b></span>}
                          onClick={this.viewFull.bind(tile)}
                          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                          {tile.image ? <img src={tile.image} /> : ''}
                        </GridTile>
                      ))}
                    </GridList> 
             :   <CardList cards={this.props.privateCards} />
             }
            </Tab>
          </Tabs>
        }
        </div>
    )
  }

}

MyCards.propTypes = {
    publicCards: PropTypes.array,
    privateCards: PropTypes.array,
    loading: PropTypes.bool,
    access: PropTypes.string
}

export default MyCards
