import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Accounts, STATES } from 'meteor/std:accounts-ui'

export default class SignInContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
	    	{ this.props.lastEvent ? 
				<h2>You have signed up ok, now you can log in</h2> 
				: '' 
			}
			<Accounts.ui.LoginForm  {...{
		        formState: STATES.SIGN_IN,
		        loginPath: '/login'
		      }}/>
	    </div>
	)
  }

}