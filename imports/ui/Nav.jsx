import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { lightGreen500 } from 'material-ui/styles/colors'
import { Session } from 'meteor/session'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import CircularProgress from 'material-ui/CircularProgress'
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library'
import parseIcon from './TypeIcons'

const styles = {
  navHeader: {
    height: 100,
    paddingTop: 50,
    boxSizing: 'border-box',
    background: lightGreen500,
    color: 'white',
    paddingLeft: 16
  }
}

class LoggedMenu extends Component {

  constructor(props) {
    super(props);
  }

  renderCardTypes() {
    return this.props.cardTypes.map((cardType) => (
      <MenuItem 
        rightIcon={parseIcon(cardType.value)}
        value={cardType.value} 
        primaryText={cardType.title} 
        key={cardType.value}
        data-href={'/new/' + cardType.value}
        onClick={this.props.handleClick}
      />
    ))
  }

  renderDeckTypes() {
    return this.props.deckTypes.map((deckType) => (
      <MenuItem 
        rightIcon={parseIcon(deckType.value)}
        value={deckType.value} 
        primaryText={deckType.title} 
        key={deckType.value}
        data-href={'/new-deck/' + deckType.value}
        onClick={this.props.handleClick}
      />
    ))
  }

  render() {
    return (
      <div>
        <Divider />
        <MenuItem onClick={this.props.handleClick} data-href="Dashboard">My Dashboard</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="My.Cards">My Cards</MenuItem>
        <MenuItem 
          rightIcon={<ArrowDropRight />}
          menuItems={this.renderCardTypes()}>
          Add a new card
        </MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="My.Decks">My Decks</MenuItem>
        <MenuItem 
          rightIcon={<ArrowDropRight />}
          menuItems={this.renderDeckTypes()}>
          Add a new deck
        </MenuItem>
      </div>
    )
  }
}

class NavHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.navHeader}>
        { Session.get('logged') ? Meteor.user() && Meteor.user().username : 'Welcome Guest'}
      </div>
    )
  }
}

class NonLoggedMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MenuItem onClick={this.props.handleClick} data-href="Login">Log In</MenuItem>
      </div>
    )
  }
}

class ExposedMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MenuItem onClick={this.props.handleClick} data-href="Home">Home</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="About">About</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="Public.Cards">Explore Public Cards</MenuItem>
      </div>
    )
  }
}

function MenuDecision(props) {
  if (Session.get('logged')) {
    return <LoggedMenu 
      handleClick={props.handleClick.bind(this)} 
      cardTypes={props.cardTypes}
      deckTypes={props.deckTypes}
      />;
  }
  return <NonLoggedMenu 
      handleClick={props.handleClick.bind(this)} />;
}

export default class Nav extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    this.props.handleMenuClose()
    let href = e.currentTarget.dataset.href
    FlowRouter.go(href)
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={280}
        open={this.props.open}
        logged={Session.get('logged')}
        onRequestChange={this.props.onRequestChange}
        >
        <NavHeader />
        <div>
        { this.props.loadingCardTypes ?
        <CircularProgress size={60} thickness={7} />
        :
        <MenuDecision
          handleClick={this.handleClick.bind(this)}
          cardTypes={this.props.cardTypes}
          deckTypes={this.props.deckTypes}
          />
        }
        </div>

        <Divider />
        <ExposedMenu
          handleClick={this.handleClick.bind(this)}
          />
      </Drawer>
    )
  }
}

Nav.propTypes = {
  cardTypes: PropTypes.array,
  loadingCardTypes: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  deckTypes: PropTypes.array
}
