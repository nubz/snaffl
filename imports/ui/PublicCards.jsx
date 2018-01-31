import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardList from './CardList'
import CircularProgress from 'material-ui/CircularProgress'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import imageApi from '../api/imageApi'
import Toggle from 'material-ui/Toggle'
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'

class PublicCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'list',
      typeValue: 'All',
      publicCards: this.props.cards
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentDidMount', nextProps)
    this.setState({
      publicCards: nextProps.cards
    })
  }

  handleTypeChange = (e, i, v) => {
    this.setState({
      typeValue: v,
      publicCards: v == "All" ? this.props.cards : this.props.cards.filter(card => card.cardType == v),
    })
  }

  handleModeChange = (event, mode) => {
    const selectedMode = mode ? 'grid' : 'mode'
    this.setState({mode: selectedMode});
  };

  setList = () => {
    this.setState({mode: 'list'})
  }

  setGrid = () => {
    this.setState({mode: 'grid'})
  }

  viewFull(e) {
    FlowRouter.go('View.Card', {_id: this._id})
  }

  render() {
    console.log('publicCards', this.state.publicCards)
    return (
        <div>
          <Toolbar style={{backgroundColor: 'white', borderBottom: '1px solid #aaa'}}>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu iconStyle={{textColor:'black'}} iconButton={<NavigationExpandMoreIcon/>} value={this.state.typeValue} onChange={this.handleTypeChange}>
                <MenuItem value={"All"} primaryText="All types of card" />
                <MenuItem value={"Image"} primaryText="Image cards" />
                <MenuItem value={"Article"} primaryText="Article cards" />
                <MenuItem value={"Location"} primaryText="Location cards" />
                <MenuItem value={"Event"} primaryText="Event cards" />
                <MenuItem value={"Entity"} primaryText="Profile cards" />
                <MenuItem value={"Embed"} primaryText="Embed cards" />
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <IconButton touch={true} onClick={this.setList}>
                <ActionViewList />
              </IconButton>
              <IconButton touch={true} onClick={this.setGrid}>
                <ActionViewModule />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> :
          <div>
          { this.state.mode == 'grid' ? 
              <GridList
                cellHeight={180}
                cols={3}
                style={{marginTop:5}}
              >
                {this.state.publicCards.map((tile) => (
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
          : <CardList cards={this.state.publicCards} /> 
          }
          </div>
        }
        </div>
    )
  }

}

PublicCards.propTypes = {
    cards: PropTypes.array,
    loading: PropTypes.bool
}

export default PublicCards
