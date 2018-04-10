import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imageApi from '../api/imageApi'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

export default class SnapCardListItem extends Component {
  constructor(props) {
    super(props);
  }

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.card._id)
  }

  render() {
    const card = this.props.card
    const owned = card.owner === Meteor.userId()
    const title = card.title
    let images = card.images || null
    const imageUrl = card.image || null
    if (!images && imageUrl) {
      let secureUrl = imageApi.returnSecureUrl(imageUrl)
      images = imageApi.makeImageUrls(secureUrl)
    }

    let createdAgo = moment(card.createdAt).fromNow()

    return (
      <ListItem
        innerDivStyle={{background: 'white', boxShadow: '0 0 2px rgba(0,0,0,0.27)', border:'1px solid #eee', marginBottom:10}}
        leftAvatar={images ? <Avatar src={images.thumb} /> : null}
        primaryText={card.title}
        secondaryText={card.cardType + ' created ' + createdAgo}
        onClick={this.viewFull}
      >
      </ListItem>
    );
  }
}
 
SnapCardListItem.propTypes = {
  card: PropTypes.object.isRequired,
}