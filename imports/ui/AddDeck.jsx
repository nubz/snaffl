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
import Paper from 'material-ui/Paper'
import DeckListQueryContainer from '/imports/containers/DeckListQueryContainer'


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

const startTime = moment().subtract(1, 'hours').toDate()

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
    Meteor.call('addDeck', data, (error, result) => {
      this.successState().bind(this)
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
      <div className="main-bg">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>

            <h3 className="paperHead">{parseIcon(this.props.deckType, {height:50,width:50,color: 'white'})} {this.props.deckType} info</h3>

            {this.state.uploading ?
              <div className="imagePreview">
                <CircularProgress style={{margin:'auto'}} size={60} thickness={7}/>
              </div>
              :
              <div className="imagePreview" style={{backgroundImage: 'url(' + (this.state.images ? this.state.images.small : '') + ')'}}>
                <RaisedButton
                  secondary={true}
                  containerElement='label'
                  label={this.state.images ? 'Upload a different image' : 'Upload a cover image' }>
                  <input type="file" style={styles.fileInput} onChange={this.uploadFiles.bind(this)}/>
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

          </Paper>

          { this.props.deckType === 'TagDeck' || this.props.deckType === 'TagMap' ?
            <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
              <h3 className="paperHead">{parseIcon(this.props.deckType, {height:50,width:50,color: 'white'})} Subscribe to tag</h3>
                <div className="form-group">
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
            </Paper>
            : ''}
            <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>

              <h3 className="paperHead">{parseIcon(this.props.deckType, {height:50,width:50,color: 'white'})} Publishing detail</h3>
              <Toggle
                label="Public access"
                onToggle={this.handleAccessChange}
                labelPosition="right"
                style={{marginBottom: 20}}
              />
              <div className="form-group">
                <RaisedButton type="submit" disabled={this.state.uploading} label="Add deck" primary={true} />
              </div>
            </Paper>
          </form>

        <Divider />

        {this.renderdecks()}
        <DeckListQueryContainer createdAt={{$gt: startTime}} title="Recent decks" owner={Meteor.userId()}/>

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