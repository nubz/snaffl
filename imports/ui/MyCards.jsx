import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'material-ui/Tabs'
import CardList from './CardList'
import CardGrid from './CardGrid'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import ActionViewList from 'material-ui/svg-icons/action/view-list'
import ActionViewModule from 'material-ui/svg-icons/action/view-module'
import parseIcon from './TypeIcons'
import Paper from 'material-ui/Paper'

const styles = {
  tabStyle: {textTransform: 'none', color: 'rgb(244, 67, 54)', fontWeight: 700},
  tabItem: { backgroundColor: 'white', color: 'rgb(244, 67, 54)' }
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
      publicCards: v === "All" ? this.props.publicCards : this.props.publicCards.filter(card => card.cardType === v),
      privateCards: v === "All" ? this.props.privateCards : this.props.privateCards.filter(card => card.cardType === v)
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
        <div className="main-bg">
          <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHeadOther">{parseIcon('Cloud', {height:50,width:50,color: 'white'})} My Cards</h3>
          <Toolbar style={{backgroundColor: 'transparent', borderBottom: '1px solid #aaa'}}>
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
            style={{margin: '8px 0'}}
            tabItemContainerStyle={styles.tabItem}
          >
            <Tab label={<span style={{color: 'rgb(244, 67, 54)'}}>Public Cards</span>} value="public">
              { this.state.mode === 'grid' ? <CardGrid cards={this.state.publicCards} viewFull={this.viewFull} /> :   <CardList data={this.state.publicCards} headless={true} /> }
            </Tab>
            <Tab label={<span style={{color: 'rgb(244, 67, 54)'}}>Private Cards</span>} value="private">
            { this.state.mode === 'grid' ? <CardGrid cards={this.state.privateCards} viewFull={this.viewFull} /> :   <CardList data={this.state.privateCards} headless={true} /> }
            </Tab>
          </Tabs>
        }
          </Paper>
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
