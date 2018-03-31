import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Cards } from '../api/cards.js'
import Paper from 'material-ui/Paper'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline'
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open'
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  panel: {
    height: 180,
    width: 180,
    margin: 20,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
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
  }
};

class Dashboard extends Component {

  constructor(props) {
    super(props)
  }

  handlePublicCardsClick() {
    FlowRouter.go('My.Cards', {access: 'public'})
  }

  handlePrivateCardsClick() {
    FlowRouter.go('My.Cards', {access: 'private'})
  }

  handlePublicDecksClick() {
    FlowRouter.go('My.Decks', {access: 'public'})
  }

  handlePrivateDecksClick() {
    FlowRouter.go('My.Decks', {access: 'private'})
  }
 
  render() {
    return (
      <div>
        <Subheader>My Content</Subheader>
        <Paper className="dash-panel" style={styles.panel} zDepth={2} onClick={this.handlePublicCardsClick}>
          <Badge
            badgeContent={<IconButton tooltip="Public Cards"><ActionLockOpen /></IconButton>}
            style={styles.count}
          >
            {
              !this.props.publicLoading ? 
              this.props.publicCardCount :
              <CircularProgress size={60} thickness={7} />
            }
            <span style={styles.panelText}>Public Cards</span>
          </Badge>
        </Paper>
        <Paper className="dash-panel" style={styles.panel} zDepth={2} onClick={this.handlePrivateCardsClick}>
          <Badge
            badgeContent={<IconButton tooltip="Private Cards"><ActionLockOutline /></IconButton>}
            style={styles.count}
          >
            {
              !this.props.privateLoading ? 
              this.props.privateCardCount :
              <CircularProgress size={60} thickness={7} />
            }
            <span style={styles.panelText}>Private Cards</span>
          </Badge>
        </Paper>
        <Paper className="dash-panel" style={styles.panel} zDepth={2} onClick={this.handlePublicDecksClick}>
          <Badge
            badgeContent={<IconButton tooltip="Public Decks"><ActionLockOpen /></IconButton>}
            style={styles.count}
          >
            {
              !this.props.loading ? 
              this.props.publicDeckCount :
              <CircularProgress size={60} thickness={7} />
            }
            <span style={styles.panelText}>Public Decks</span>
          </Badge>
        </Paper>
        <Paper className="dash-panel" style={styles.panel} zDepth={2} onClick={this.handlePrivateDecksClick}>
          <Badge
            badgeContent={<IconButton tooltip="Private Decks"><ActionLockOutline /></IconButton>}
            style={styles.count}
          >
            {
              !this.props.decksLoading ? 
              this.props.privateDeckCount :
              <CircularProgress size={60} thickness={7} />
            }
            <span style={styles.panelText}>Private Decks</span>
          </Badge>
        </Paper>
        <Divider />
        <Subheader>My Stats</Subheader>
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
        <Paper style={styles.panel} zDepth={2}>
          <Badge
            badgeContent={<IconButton tooltip="Favorited"><ActionFavorite /></IconButton>}
            style={styles.statsCount}
          >
            39
            <span style={styles.panelText}>Your Cards Favourited</span>
          </Badge>
        </Paper>
      </div>
    )
  }

}

Dashboard.propTypes = {
  publicLoading: PropTypes.bool,
  privateLoading: PropTypes.bool,
  decksLoading: PropTypes.bool,
  publicCardCount: PropTypes.number.isRequired,
  privateCardCount: PropTypes.number.isRequired,
  publicDeckCount: PropTypes.number.isRequired,
  privateDeckCount: PropTypes.number.isRequired
}
 
export default Dashboard