import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cards from '../api/cards/collection'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import MapCardContainer from '../containers/MapCardContainer'
import TagsForCardQueryContainer from '../containers/TagsForCardQueryContainer'
import DecksForCardQueryContainer from '../containers/DecksForCardQueryContainer'
import DeckMenuQueryContainer from '../containers/DeckMenuQueryContainer'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import parseContent from './TypeContent'
import Paper from 'material-ui/Paper';
import parseIcon from './TypeIcons'
import TextField from 'material-ui/TextField'
import TagCards from "../api/tagCards/collection"
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu'
import DeckCards from "../api/deckCards/collection"
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

const cardStyle = {
  marginBottom: 10,
  padding: 10,
  maxWidth: 960,
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
    backgroundColor: '#1e0e40',
    color: '#ffffff',
    padding: 10, 
    fontSize: 16
  },
  formStyle: {
    padding: 20,
    maxWidth: 960,
    margin: '10px auto',
    background: '#ffffffe3'
  },
  floatingLabelStyle: {
    fontSize: '28px',
    color: 'black',
    marginTop: '-10px'
  }
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    console.log('card with props', props);
    this.state = {
      card: props.data,
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
    let cardId = this.state.card._id;
    if (this.props.data.owner === Meteor.userId()) {
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
    FlowRouter.go('/card/' + this.state.card._id + '/edit')
  }

  onImgLoad({target: img}) {
    styles.lightboxContainer.backgroundImage = 'url(' + this.state.card.images[this.state.imageSize] + ')'
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
            cardId: this.state.card._id,
            tagId: result
          }, (err, tagCardId) => {
            const cardLink = TagCards.getLink(tagCardId, 'card');
            cardLink.set(this.state.card._id);
            const tagLink = TagCards.getLink(tagCardId, 'tag');
            tagLink.set(result)
            this.setState({
              tagValue: ''
            })
          })
        }
      })
    }

  }

  render() {
    const owned = this.state.card.owner === Meteor.userId()
    const title = this.state.card.title
    let images = this.state.card.images || false
    const host = window.location.hostname
    const protocol = window.location.protocol
    const port = window.location.port ? ':' + window.location.port : ''
    const card = this.state.card

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

    let createdAgo = moment(card.createdAt).fromNow()

    return (
      <div className="main-bg">
      <Paper style={{padding: 20}}>
        <h3 className="paperHeadOther">{parseIcon(card.cardType, {height:50,width:50,color: 'white'})} {card.title}<span>{card.cardType} card created {createdAgo}</span></h3>
        { images ?
            <img 
              onLoad={this.onImgLoad.bind(this)} 
              src={images.medium} 
              alt={card.title}
              style={{width: '100%'}}
              onClick={this.handleLightboxOpen} 
            /> : ''
        }

        <div>
          <p>{card.description}</p>
          { card.content ?
            parseContent(card.cardType, {content: card.content, card: card}) : '' }
        </div>

        <Dialog
          title={'Delete "' + title + '"'}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Confirm you want to permanently delete this card.
        </Dialog>

        <FullscreenDialog
          title={card.title}
          actions={lightBoxAction}
          onRequestClose={() => this.setState({ lightbox: false })}
          open={this.state.lightbox}
          style={{backgroundColor: 'rgba(0,0,0,.9)'}}
          appBarStyle={{backgroundColor: '#F44336'}}
        >
          <div style={styles.lightboxContainer} />
        </FullscreenDialog>

        { card.lat ?
          <div className="cardSection">
            <h3>Posting location</h3>
            <p style={styles.meta}>Latitude: {card.lat}<br />Longitude: {card.lng}</p>
            <MapCardContainer _id={card._id} />
          </div> : ''
        }

        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={{'fontWeight': 700}}
        />
      </Paper>

      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
        <h3 className="paperHead cardHead">{parseIcon('Cloud', {height:50,width:50,color: 'white'})} API address</h3>
        <pre style={styles.meta}>
          <code><a href={"/api/cards/" + card._id} target="_blank" style={{color:'white'}}>{protocol}//{host}{port}/api/cards/{card._id}</a></code>
        </pre>
        <RaisedButton
          label="Manage Access"
          onClick={this.handleEditRequest}
          style={{marginRight:10}}/>
      </Paper>

      { owned ?
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHead editHead">{parseIcon('Edit', {height:50,width:50,color: 'white'})} Edit card</h3>
          <RaisedButton
            label="Edit"
            onClick={this.handleEditRequest} primary={true}
            style={{marginRight:10}}/>
          <RaisedButton
            label="Delete"
            onClick={this.handleOpen}/>
        </Paper> : ''
      }

        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHead tags">{parseIcon('TagDeck', {height:50,width:50,color: 'white'})} Tags</h3>
          <TagsForCardQueryContainer cardId={card._id} owned={owned} />
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
        </Paper>
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
          <h3 className="paperHead deckHead">{parseIcon('Cloud', {height:50,width:50,color: 'white'})} Decks added to</h3>

          { owned ?
            <DeckMenuQueryContainer cardId={this.props._id} owner={Meteor.userId()} />
            : ''
          }
          <DecksForCardQueryContainer cardId={this.props._id} headless={true}/>
        </Paper>

      </div>
    )
  }
}

FlatButton.propTypes = {
  card: PropTypes.object
}
 
Card.propTypes = {
  multiSnackBar: PropTypes.func
}