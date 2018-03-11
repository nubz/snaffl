import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Session } from 'meteor/session'
import NavContainer from '../containers/NavContainer'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const styles = {
  title: {
    cursor: 'pointer',
    fontFamily: 'Bungee'
  },
  fab: {
    position: "fixed",
    bottom: "1em",
    right: "1em",
  }
};

function logOut() {
  Meteor.logout(() => {
    console.log('logged out')
    if (Meteor.isClient) {
      Session.set('logged', false)
    }

    FlowRouter.go('Home')
  })
}

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    )
  }
}

const o = {horizontal: 'right', vertical: 'top'}

function iconButtonElement() {
  return (<IconButton><MoreVertIcon /></IconButton>)
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={iconButtonElement()}
    targetOrigin={o}
    anchorOrigin={o}
  >
    <MenuItem primaryText="Sign out" onClick={logOut} />
  </IconMenu>
)

Logged.muiName = 'IconMenu';

export default class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  goHome() {
    FlowRouter.go('Home');
  }

  login() {
    FlowRouter.go('Login');
  }

  createCard() {
    FlowRouter.go('Add.Card')
  }

  handleMenuToggle = () => this.setState({open: !this.state.open});

  handleMenuClose = () => this.setState({open: false});

  onRequestChange = (open) => this.setState({open});

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span style={styles.title}>SNAFFL</span>}
            onTitleClick={this.goHome}
            iconElementRight={Session.get('logged') ? <Logged /> : <Login />}
            onLeftIconButtonClick={this.handleMenuToggle}
            onRightIconButtonClick={Session.get('logged') ? () => false : this.login }
          />
          <div className={this.props.className}>
            <header>
              { this.props.heading ? <h1 style={{fontSize:'1.2em'}}>{this.props.heading}</h1> : ''}
            </header>
            <main id="content-wrapper">
              {this.props.content()}
            </main>
          </div>
          <footer>
            <div className={this.props.className}>Snaffl created by <a href="http://nubz.com">nubz</a></div>
          </footer>

          <NavContainer
            open={this.state.open}
            onRequestChange={this.onRequestChange.bind(this)}
            handleMenuToggle={this.handleMenuToggle.bind(this)}
            handleMenuClose={this.handleMenuClose.bind(this)}
            cardTypes={[]}
            cardTypesLoading={true}
            >
          </NavContainer>
        </div>
      </MuiThemeProvider>
    )
  }
}