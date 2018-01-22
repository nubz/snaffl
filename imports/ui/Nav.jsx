import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { lightGreen500 } from 'material-ui/styles/colors'
import { Session } from 'meteor/session'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

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

  render() {
    return (
      <div>
        <Divider />
        <MenuItem onClick={this.props.handleClick} data-href="Dashboard">My Dashboard</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="My.Cards">My Cards</MenuItem>
        <MenuItem 
          rightIcon={<ArrowDropRight />}
          menuItems={[
                <MenuItem primaryText="Article" data-href="/new/Article" onClick={this.props.handleClick}  />,
                <MenuItem primaryText="Image" data-href="/new/Image" onClick={this.props.handleClick} />,
                <MenuItem primaryText="Embedded Video/Audio" data-href="/new/EmbeddedMedia" onClick={this.props.handleClick} />,
                <MenuItem primaryText="Location" data-href="/new/Location" onClick={this.props.handleClick} />,
                <MenuItem primaryText="Event" data-href="/new/Event" onClick={this.props.handleClick} />,
                <MenuItem primaryText="Profile" data-href="/new/Entity" onClick={this.props.handleClick} />
              ]}>Add a new card
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
      handleClick={props.handleClick.bind(this)} />;
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
        <MenuDecision
          handleClick={this.handleClick.bind(this)}
          />
        <Divider />
        <ExposedMenu
          handleClick={this.handleClick.bind(this)}
          />
      </Drawer>
    )
  }
}