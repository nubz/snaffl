import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { Session } from 'meteor/session'
import NavContainer from '../containers/NavContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepPurpleA400, deepPurpleA600, grey400, green700, green500, deepOrange500 } from 'material-ui/styles/colors'

const customTheme = {
  palette: {
    primary1Color: deepPurpleA400,
    primary2Color: deepPurpleA600,
    primary3Color: grey400,
    pickerHeaderColor: deepOrange500
  }
};

const theme = getMuiTheme(customTheme);

injectTapEventPlugin();


const styles = {
  title: {
    cursor: 'pointer',
    fontFamily: 'Chewy',
    fontSize: 36
  },
  fab: {
    position: "fixed",
    bottom: "1em",
    right: "1em",
  }
};

function logOut() {
  Meteor.logout(() => {
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

  handleMenuToggle = () => this.setState({open: !this.state.open});

  handleMenuClose = () => this.setState({open: false});

  onRequestChange = (open) => this.setState({open});

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
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
              { this.props.heading ? <h1>{this.props.heading}</h1> : ''}
            </header>
            <main id="content-wrapper">
              {this.props.content()}
            </main>
          </div>
          <footer>
            <div className={this.props.className}><span className="branding">SNAFFL</span> created by <a href="http://nubz.com">nubz</a></div>
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