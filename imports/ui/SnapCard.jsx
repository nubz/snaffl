import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cards } from '../api/cards.js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

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

const cardStyle = {
  'marginBottom': 10
}
 
// Card component - represents a single todo item
export default class SnapCard extends Component {
  constructor(props) {
    super(props);
  }

  deleteThisCard() {
    Cards.remove(this.props.card._id, () => {
      this.props.multiSnackBar('Card deleted ok', true);
    })
  }

  chipHandleRequestDelete() {
    this.props.multiSnackBar('Not deleting tag in this demo', true);
  }

  render() {
    const cardClassName = this.props.card.checked ? 'checked' : '';

    return (
      <Card style={cardStyle}>
        <CardHeader
          title={this.props.card.title}
          subtitle="Article"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <RaisedButton label="Delete" onClick={this.deleteThisCard.bind(this)} />
          <RaisedButton label="Edit" />
        </CardActions>
        <CardText expandable={true}>
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
      </Card>
    );
  }
}
 
SnapCard.propTypes = {
  // This component gets the Card to display through a React prop.
  // We can use propTypes to indicate it is required
  card: PropTypes.object.isRequired,
  multiSnackBar: PropTypes.func
};