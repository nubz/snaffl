import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cards } from '../api/cards.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';

const cardStyle = {
  marginBottom: 10,
  padding: 10
}

const styles = {
  card: cardStyle,
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}
 
// Card component - represents a single todo item
export default class SnapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  deleteThisCard() {
    Cards.remove(this.props.card._id, () => {
      this.handleClose()
      this.props.multiSnackBar('Card deleted ok', true);
    })
  }

  chipHandleRequestDelete() {
    this.props.multiSnackBar('Not deleting tag in this demo', true);
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleEditRequest = () => {
    FlowRouter.go('/card/' + this.props.card._id + '/edit')
  }

  render() {
    const cardClassName = this.props.card.checked ? 'checked' : ''
    const title = this.props.card.title
    const actions = [
        <FlatButton
          label="Cancel"
          primary={false}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Confirm"
          primary={true}
          onClick={this.deleteThisCard.bind(this)}
        />,
      ];

    let createdAgo = moment(this.props.card.createdAt).fromNow()

    return (
      <Card style={cardStyle}>
        <CardHeader
          title={this.props.card.title}
          subtitle={this.props.card.type + ' created ' + createdAgo}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <RaisedButton label="Delete" onClick={this.handleOpen} />
          <RaisedButton label="Edit" onClick={this.handleEditRequest} />
        </CardActions>
        <CardText expandable={true}>
          {this.props.card.description}<br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          <div style={styles.wrapper}>
            <Chip
              style={styles.chip}
              onRequestDelete={this.chipHandleRequestDelete.bind(this)}
            >
              Crypto
            </Chip>
            <Chip
              style={styles.chip}
              onRequestDelete={this.chipHandleRequestDelete.bind(this)}
            >
              Bitcoin
            </Chip>
          </div>
        </CardText>
        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this SnapCard.
        </Dialog>
      </Card>
    );
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
SnapCard.propTypes = {
  card: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func.isRequired
};