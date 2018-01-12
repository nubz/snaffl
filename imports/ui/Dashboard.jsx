import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Cards } from '../api/cards.js';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';

const styles = {
  panel: {
    height: 180,
    width: 180,
    margin: 20,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  count: {
    fontSize: 64
  },
  panelText: {
    display: 'block',
    fontSize: 19
  },
  fab: {
    position: "fixed",
    bottom: "1em",
    right: "1em",
  }
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  createCard() {
    FlowRouter.go('Add.Card')
  }
 
  render() {
    return (
      <div>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Public Cards"><UploadIcon /></IconButton>}
            style={styles.count}
          >
            {this.props.publicCardCount}
            <span style={styles.panelText}>Public Cards</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Private Cards"><UploadIcon /></IconButton>}
            style={styles.count}
          >
            {this.props.privateCardCount}
            <span style={styles.panelText}>Private Cards</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Private Decks"><UploadIcon /></IconButton>}
            style={styles.count}
          >
            2
            <span style={styles.panelText}>Private Decks</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Public Decks"><UploadIcon /></IconButton>}
            style={styles.count}
          >
            1
            <span style={styles.panelText}>Public Decks</span>
          </Badge>
        </Paper>
        <FloatingActionButton style={styles.fab} onClick={this.createCard}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }

}

Dashboard.propTypes = {
  publicCardCount: PropTypes.number.isRequired,
  privateCardCount: PropTypes.number.isRequired,
};
 
export default createContainer(() => {
  return {
    privateCardCount: Cards.find({ owner: Meteor.userId(), access: {$ne: 'public'} }).count(),
    publicCardCount: Cards.find({ owner: Meteor.userId(), access: 'public'}).count(),
  };
}, Dashboard);