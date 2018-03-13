import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import { DeckCards } from '../api/deckCards.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import imageApi from '../api/imageApi'
import Snackbar from 'material-ui/Snackbar'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import parseIcon from './TypeIcons'
import DecksFromIdsContainer from '../containers/DecksFromIdsContainer'
import { TagCards } from '../api/tagCards'
import TagsFromIdsContainer from '../containers/TagsFromIdsContainer'
import TextField from 'material-ui/TextField'
import MapCardContainer from '../containers/MapCardContainer'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import parseContent from './TypeContent'

const cardStyle = {
  marginBottom: 10,
  padding: 10,
  maxWidth: 768,
  margin: '10px auto'
}

const styles = {
  lightboxContainer: {
    backgroundSize: 'contain',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'calc(100% - 64px)',
    width: '100%'
  },
  meta: {
    backgroundColor: '#eee', 
    padding: 10, 
    fontSize: 10
  }
}

export default class SnapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackOpen: false,
      message: '',
      selectedDeck: 0,
      tagValue: '',
      render: true,
      lightbox: false,
      imageSize: 'large'
    }
  }

  deleteThisCard() {
    let cardId = this.props.card._id;
    if (this.props.card.owner === Meteor.userId()) {
      Cards.remove(cardId, () => {
        this.setState({render: false})
        this.handleClose()
        Meteor.call('removeFromAllDecks', cardId)
        FlowRouter.go('My.Cards')
      })
    }
  }

  handleRequestClose = () => {
    this.setState({
      snackOpen: false,
    });
  };

  handleLightboxClose = () => {
    this.setState({lightbox: false})
  }

  handleLightboxOpen = () => {
    this.setState({lightbox: true})
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

  viewFull = () => {
    FlowRouter.go('/card/' + this.props.card._id)
  }

  handleDeckSelect = (e, i, v) => {
    DeckCards.insert({
        deckId: v,
        cardId: this.props.card._id
    }, () => {
      this.setState({
        snackOpen: true,
        message: 'Card added to deck ok',
        selectedDeck: v
      })
    })

  }

  handleTagTyping(e) {
    this.setState({
      tagValue: e.currentTarget.value
    })
  }

  handleTagChange(event, value) {
    if (this.state.tagValue.length) {
      Meteor.call('touchTag', this.state.tagValue, (error, result) => {
        if (!error) {
          TagCards.insert({
            cardId: this.props.card._id,
            tagId: result
          }, () => {
            this.setState({
                tagValue: ''
              })
          })
        }
      })
    }

  }

  renderMyDecks() {
    return this.props.decks.map((deck) => (
      <MenuItem 
        rightIcon={parseIcon(deck.deckType)}
        value={deck._id} 
        primaryText={deck.title} 
        key={deck._id}
      />
    ))
  }

  onImgLoad({target: img}) {
    styles.lightboxContainer.backgroundImage = 'url(' + this.props.card.images[this.state.imageSize] + ')'
  }

  shouldComponentUpdate() {
    return this.state.render
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ 
      imageSize: window.innerWidth < 600 || window.innerHeight < 600 ? 'medium' : 'large'
    })
  }

  render() {
    const owned = this.props.card.owner === Meteor.userId()
    const title = this.props.card.title
    let images = this.props.card.images || false
    const host = window.location.hostname
    const protocol = window.location.protocol
    const port = window.location.port == "80" ? '' : ':' + window.location.port
    /* a little dance to handle cards uploaded before images
    ** were auto generated from secure url
    */
    const imageUrl = this.props.card.image || null
    if (!images && imageUrl) {
      let secureUrl = imageApi.returnSecureUrl(imageUrl)
      images = imageApi.makeImageUrls(secureUrl)
    }
      
    const lightBoxAction = [
        <FlatButton
          label="Cancel"
          primary={false}
          onClick={this.handleLightboxClose}
        />
      ];

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
        />
      ];

    let createdAgo = moment(this.props.card.createdAt).fromNow()

    return (
      <Card 
        style={cardStyle} 
        initiallyExpanded={true}
      >
        <CardHeader
          avatar={ images ? images.thumb : null }
          title={this.props.card.title}
          subtitle={this.props.card.cardType + ' created ' + createdAgo}
          actAsExpander={true}
          showExpandableButton={true}
        />

        { images ?
          <CardMedia>
            <img 
              onLoad={this.onImgLoad.bind(this)} 
              src={images.medium} 
              alt={this.props.card.title} 
              onClick={this.handleLightboxOpen} 
            />
          </CardMedia> : '' 
        }

        <CardText expandable={true}>
          <h2>{this.props.card.title}</h2>
          <p>{this.props.card.description}</p>
          { this.props.card.content ? 
            parseContent(this.props.card.cardType, {content: this.props.card.content, card: this.props.card}) : '' }
        </CardText>

        { owned ? 
          <CardActions>
            <RaisedButton 
              label="Delete" 
              onClick={this.handleOpen} />
            <RaisedButton 
              label="Edit" 
              onClick={this.handleEditRequest} />
          </CardActions> : '' 
        }

        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this SnapCard.
        </Dialog>

        <FullscreenDialog
          title={this.props.card.title}
          actions={lightBoxAction}
          onRequestClose={() => this.setState({ lightbox: false })}
          open={this.state.lightbox}
          style={{backgroundColor: 'rgba(0,0,0,.9)'}}
        >
          <div style={styles.lightboxContainer} />
        </FullscreenDialog>

        <div className="cardSection">

          <h3>Tags</h3>

          { owned ? 
            <div style={{marginBottom: 20}}>
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Add a tag"
                hintText="Add one tag at a time"
                floatingLabelFixed={true}
                id="addTag"
                data-field="tag"
                value={this.state.tagValue}
                onChange={this.handleTagTyping.bind(this)}
              />
              <RaisedButton 
                label="Add tag" 
                onClick={this.handleTagChange.bind(this)} 
              />
            </div> : ''
          }

          <TagsFromIdsContainer 
            tags={this.props.cardTags} 
            owned={owned} 
            cardId={this.props.card._id} 
            deckId={""} 
          />

        </div>

        <div className="cardSection">

          <h3>Decks</h3>

          { owned ?
            <DropDownMenu 
              iconStyle={{textColor:'black'}} 
              iconButton={<NavigationExpandMoreIcon/>} 
              value={this.state.selectedDeck} 
              onChange={this.handleDeckSelect}
            >
              <MenuItem 
                value={0} 
                primaryText="Add to deck" 
              />
              {this.renderMyDecks()}
            </DropDownMenu> : '' 
          }

          <DecksFromIdsContainer linkedDecks={this.props.linkedDecks} cardId={this.props.card._id} />

        </div>

        <div className="cardSection">
          <h3>API</h3>
          <pre style={styles.meta}>
            <code><a href={"/api/cards/" + this.props.card._id} target="_blank">{protocol}//{host}{port}/api/cards/{this.props.card._id}</a></code>
          </pre>
        </div>

        { this.props.card.lat ?
          <div className="cardSection">
            <h3>Posting location</h3>
            <p style={styles.meta}>Latitude: {this.props.card.lat}<br />Longitude: {this.props.card.lng}</p>
            <MapCardContainer _id={this.props.card._id} />
          </div> : ''
        }

        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={{'fontWeight': 700}}
        />
      </Card>
    )
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
SnapCard.propTypes = {
  card: PropTypes.object.isRequired,
  decks: PropTypes.array,
  linkedDecks: PropTypes.array,
  cardTags: PropTypes.array,
  multiSnackBar: PropTypes.func.isRequired
}