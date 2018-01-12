import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import ReactDOM from 'react-dom'
import { Cards } from '../api/cards.js'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline'
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

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
  statsCount: {
    fontSize: 48
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
        <Divider />
      <Subheader>Content by {Meteor.user().username}</Subheader>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Public Cards"><ActionLockOpen /></IconButton>}
            style={styles.count}
          >
            {this.props.publicCardCount}
            <span style={styles.panelText}>Public Cards</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Private Cards"><ActionLockOutline /></IconButton>}
            style={styles.count}
          >
            {this.props.privateCardCount}
            <span style={styles.panelText}>Private Cards</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Private Decks"><ActionLockOutline /></IconButton>}
            style={styles.count}
          >
            2
            <span style={styles.panelText}>Private Decks</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Public Decks"><ActionLockOpen /></IconButton>}
            style={styles.count}
          >
            1
            <span style={styles.panelText}>Public Decks</span>
          </Badge>
        </Paper>
        <Divider />
        <Subheader>Stats for {Meteor.user().username}</Subheader>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Public Views"><ActionVisibility /></IconButton>}
            style={styles.statsCount}
          >
            312
            <span style={styles.panelText}>Public Views</span>
          </Badge>
        </Paper>
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Private Views"><ActionVisibility /></IconButton>}
            style={styles.statsCount}
          >
            1139
            <span style={styles.panelText}>Private Views</span>
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