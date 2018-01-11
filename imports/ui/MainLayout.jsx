import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionGrade from 'material-ui/svg-icons/action/grade';

export default class MainLayout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <header>
            <h1><a href="/"><ActionGrade /> snapcards</a></h1>
          </header>
          <main>
            {this.props.content}
          </main>
          <footer>
            <p>Created by <a href="http://nubz.com">nubz</a></p>
          </footer>
        </div>
      </MuiThemeProvider>
    )
  }
}