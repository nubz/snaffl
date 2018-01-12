import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class LoggedMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Divider />
        <MenuItem onClick={this.props.handleClick} data-href="Dashboard">My Dashboard</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="Add.Card">Add a new card</MenuItem>
        <MenuItem onClick={this.props.handleClick} data-href="List.Cards">My Cards</MenuItem>
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
        <Divider />
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
        width={200}
        open={this.props.open}
        logged={Session.get('logged')}
        onRequestChange={this.props.onRequestChange}
        >
        <ExposedMenu
          handleClick={this.handleClick.bind(this)}
          />
        <MenuDecision
          handleClick={this.handleClick.bind(this)}
          />
      </Drawer>
    )
  }
}