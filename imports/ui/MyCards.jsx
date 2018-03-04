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
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import parseIcon from './TypeIcons'

const styles = {
  tabStyle: {textTransform: 'none', fontWeight: 700, color:'black'},
  tabItem: { backgroundColor: '#eee', textColor: 'black'}
}

class MyCards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.access,
      mode: 'grid',
      typeValue: 'All',
      publicCards: this.props.publicCards,
      privateCards: this.props.privateCards
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      publicCards: nextProps.publicCards,
      privateCards: nextProps.privateCards
    })
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  handleTypeChange = (e, i, v) => {
    this.setState({
      typeValue: v,
      publicCards: v == "All" ? this.props.publicCards : this.props.publicCards.filter(card => card.cardType == v),
      privateCards: v == "All" ? this.props.privateCards : this.props.privateCards.filter(card => card.cardType == v)
    })
  }

  handleModeChange = (event, mode) => {
    const selectedMode = mode ? 'grid' : 'list'
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

  renderCardTypes() {
    return this.props.cardTypes.map((cardType) => (
      <MenuItem 
        rightIcon={parseIcon(cardType.value)}
        value={cardType.value} 
        primaryText={cardType.title} 
        key={cardType.value}
      />
    ))
  }

  render() {
    const iconStyle = {color: "white", padding:10}
    return (
        <div>
          <Toolbar style={{backgroundColor: 'white', borderBottom: '1px solid #aaa'}}>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu iconStyle={{textColor:'black'}} iconButton={<NavigationExpandMoreIcon/>} value={this.state.typeValue} onChange={this.handleTypeChange}>
                <MenuItem value={"All"} primaryText="All types of card" />
                {this.renderCardTypes()}
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <IconButton touch={true} onClick={this.setList} style={this.state.mode == 'grid' ? {opacity:1} : {opacity:0.5}}>
                <ActionViewList />
              </IconButton>
              <IconButton touch={true} onClick={this.setGrid} style={this.state.mode == 'list' ? {opacity:1} : {opacity:0.5}}>
                <ActionViewModule />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> :
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            tabItemContainerStyle={styles.tabItem}
          >
            <Tab label={<span style={styles.tabStyle}>Public Cards</span>} value="public" style={{color: 'black'}} buttonStyle={{textColor: 'black'}}>
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
                          style={{cursor:'pointer'}}
                          subtitle={<span>by <b>{tile.owner}</b></span>}
                          onClick={this.viewFull.bind(tile)}
                          actionIcon={parseIcon(tile.cardType, iconStyle)}
                        >
                          <img src={tile.images ? tile.images.medium : imageApi.medium(tile.image)} />
                        </GridTile>
                      ))}
                    </GridList> 
                : <CardList cards={this.state.publicCards} /> 
                }
            </Tab>
            <Tab label={<span style={styles.tabStyle}>Private Cards</span>} value="private">
            { this.state.mode == 'grid'? 
                    <GridList
                      cellHeight={180}
                      cols={3}
                      style={{marginTop:5}}
                    >
                      {this.state.privateCards.map((tile) => (
                        <GridTile
                          key={tile._id}
                          title={tile.title}
                          subtitle={<span>by <b>{tile.owner}</b></span>}
                          style={{cursor:'pointer'}}
                          onClick={this.viewFull.bind(tile)}
                          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                          {tile.image ? <img src={tile.image} /> : ''}
                        </GridTile>
                      ))}
                    </GridList> 
             :   <CardList cards={this.state.privateCards} />
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
    cardTypes: PropTypes.array,
    loading: PropTypes.bool,
    access: PropTypes.string
}

export default MyCards
