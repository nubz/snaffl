import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cards from '../api/cards/collection'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import MapCardContainer from '../containers/MapCardContainer'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import parseContent from './TypeContent'
import Paper from 'material-ui/Paper';
import parseIcon from './TypeIcons'

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
    backgroundColor: '#eee', 
    padding: 10, 
    fontSize: 10
  },
  formStyle: {
    padding: 20,
    maxWidth: 960,
    margin: '10px auto',
    background: '#ffffffe3'
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

  render() {
    const owned = this.state.card.owner === Meteor.userId()
    const title = this.state.card.title
    let images = this.state.card.images || false
    const host = window.location.hostname
    const protocol = window.location.protocol
    const port = window.location.port === "80" ? '' : ':' + window.location.port
      
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

    let createdAgo = moment(this.state.card.createdAt).fromNow()

    return (
      <div style={styles.formStyle}>
      <Paper style={{padding: 20}}>
        <h3 className="paperHeadOther">{parseIcon(this.state.card.cardType, {height:50,width:50,color: 'white'})} {this.state.card.title}</h3>
        { images ?
            <img 
              onLoad={this.onImgLoad.bind(this)} 
              src={images.medium} 
              alt={this.state.card.title}
              style={{minWidth: '100%'}}
              onClick={this.handleLightboxOpen} 
            /> : ''
        }

        <div>
          <p>{this.state.card.description}</p>
          { this.state.card.content ?
            parseContent(this.state.card.cardType, {content: this.state.card.content, card: this.state.card}) : '' }
        </div>

        { owned ? 
          <div>
            <RaisedButton 
              label="Delete" 
              onClick={this.handleOpen} />
            <RaisedButton 
              label="Edit" 
              onClick={this.handleEditRequest} />
          </div> : ''
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
          title={this.state.card.title}
          actions={lightBoxAction}
          onRequestClose={() => this.setState({ lightbox: false })}
          open={this.state.lightbox}
          style={{backgroundColor: 'rgba(0,0,0,.9)'}}
        >
          <div style={styles.lightboxContainer} />
        </FullscreenDialog>

        <div className="cardSection">
          <h3>API</h3>
          <pre style={styles.meta}>
            <code><a href={"/api/cards/" + this.state.card._id} target="_blank">{protocol}//{host}{port}/api/cards/{this.state.card._id}</a></code>
          </pre>
        </div>

        { this.state.card.lat ?
          <div className="cardSection">
            <h3>Posting location</h3>
            <p style={styles.meta}>Latitude: {this.state.card.lat}<br />Longitude: {this.state.card.lng}</p>
            <MapCardContainer _id={this.state.card._id} />
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