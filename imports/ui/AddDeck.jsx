import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import Decks from '../api/decks/collection'
import Divider from 'material-ui/Divider'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import imageApi from '../api/imageApi'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import parseIcon from './TypeIcons'

const styles = {
  formStyle: {
    padding: 20,
    maxWidth: 960,
    margin: '10px auto',
    background: 'white'
  },
  floatingLabelStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500
  },
  fileInput: {
    display: 'none'
  },
  imagePreview: {
    display: 'block',
    marginBottom: 20,
    maxWidth: '100%'
  },
  panel: {
    width: '100%',
    padding: 15
  }
}

const defaultInputs = {
  title: '',
  description: '',
  deckType: 'MultiDeck',
  subscriptionTag: ''
}

class AddDeck extends Component {

  constructor(props) {
    super(props);

    if (props.deckType) {
      defaultInputs.deckType = props.deckType
    }
 
    this.state = {
      open: false,
      uploading: false,
      message: 'deck added successfully',
      inputs: {...defaultInputs},
      imagePreview: '',
      publicId: '',
      image: '',
      access: 'private',
      images: {}
    }
  }

  uploadFiles(event) {
    imageApi.uploadFiles(event, this)
  }

  multiSnackBar = (message, s) => {
    this.setState({
      open: s,
      message: message
    })
  }

  successState() {
    console.log('successState()')
    this.setState({
      open: true,
      message: 'deck added ok',
      inputs: defaultInputs,
      imagePreview: '',
      publicId: '',
      image: '',
      access: 'private',
      images: {}
    })
  }

  setImages(images) {
    this.uploadedImages = images;
    console.log('images = ', this.uploadedImages)
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputs = this.state.inputs;
    const data = {
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      owner: Meteor.userId(),
      createdAt: new Date(),
      access: this.state.access,
      deckType: inputs.deckType,
      deckTypeId: this.props.selectedType._id,
      image: this.state.image,
      subscriptionTag: inputs.subscriptionTag.trim()
    };
    data.images = Object.assign({}, {...this.uploadedImages});
    const linkData = {
      'author': Meteor.userId(),
      'type': this.props.selectedType._id
    }
    Decks.insert(data, (error, result) => {
      Meteor.call('setLinks', Decks, result, linkData, () => {
        const deckTagSubscriptionLink = Decks.getLink(result, 'tagSubscription')
        if (inputs.subscriptionTag.trim().length) {
          let tagProps = {
            tag: inputs.subscriptionTag.trim(),
            deckId: result,
            grapherLink: deckTagSubscriptionLink,
            types: this.props.selectedType.subscribes
          }
          Meteor.call('createTagSubscription', tagProps, this.successState.bind(this))
        } else {
          this.successState()
        }
      });
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleInputChange = (event, index, value) => this.setState({'inputs': { ...this.state.inputs, [event.target.dataset.field] : event.target.value } })
 
  renderdecks() {
    return this.props.decks.map((deck) => (
      <SnapdeckListItem 
        key={deck._id} 
        deck={deck} 
        multiSnackBar={this.multiSnackBar.bind(this)} 
      />
    ))
  }

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  };
 
  render() {
    return (
      <div style={styles.formStyle}>
        {this.props.selectedType? <p>{parseIcon(this.props.selectedType.value, {width:50,height:50})} {this.props.selectedType.description}</p> : ''}

          <form onSubmit={this.handleSubmit.bind(this)}>
            <Toggle
              label="Public access"
              onToggle={this.handleAccessChange}
              labelPosition="right"
              style={{marginBottom: 20}}
            />
            { this.state.uploading ? 
              <CircularProgress size={60} thickness={7} />
            :
            <div className="form-group">
              { this.state.images ? 
                <img style={styles.imagePreview} src={this.state.images.small} /> 
              : ''}
              <RaisedButton
                 secondary={true} 
                 containerElement='label'
                 label={ this.state.imagePreview === '' ? 'Upload a cover image' : 'Upload a different image' }>
                 <input type="file" style={styles.fileInput} onChange={this.uploadFiles.bind(this)} />
              </RaisedButton>
            </div>
            }
            <div className="form-group">
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Title"
                floatingLabelFixed={true}
                id="text-field-controlled"
                data-field="title"
                onChange={this.handleInputChange}
                value={this.state.inputs.title}
              />
            </div>
            <div className="form-group">
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Summary (optional)"
                hintText="A short, plain text summary"
                floatingLabelFixed={true}
                id="description"
                data-field="description"
                multiLine={true}
                rows={2}
                onChange={this.handleInputChange}
                value={this.state.inputs.description}
              />
            </div>

            { this.props.deckType === 'TagDeck' || this.props.deckType === 'TagMap' ?
            <div className="form-group">
             <h3>Auto Population</h3>
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Enter a tag to subscribe to"
                floatingLabelFixed={true}
                id="text-tag"
                data-field="subscriptionTag"
                onChange={this.handleInputChange}
                value={this.state.inputs.subscriptionTag}
              />
            </div>
              : ''}
            <div className="form-group">
              <RaisedButton type="submit" disabled={this.state.uploading} label="Add deck" primary={true} />
            </div>
          </form>

        <Divider />

        <h2>Recently added decks</h2>
        {this.renderdecks()}

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

}

AddDeck.propTypes = {
  decks: PropTypes.array.isRequired,
  deckType: PropTypes.string,
  loading: PropTypes.bool,
  selectedType: PropTypes.object
}

export default AddDeck