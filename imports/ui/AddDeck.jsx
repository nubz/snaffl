import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import { Decks } from '../api/decks.js'
import Divider from 'material-ui/Divider'
import SnapdeckListItem from './SnapdeckListItem.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import imageApi from '../api/imageApi'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import parseIcon from './TypeIcons'
import Paper from 'material-ui/Paper'

const styles = {
  formStyle: {
    marginBottom: 30,
    marginTop: 30
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
  deckType: 'MultiDeck'
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
      inputs: defaultInputs,
      imagePreview: '',
      publicId: '',
      image: '',
      access: 'private',
      images: null
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

  handleSubmit(event) {
    event.preventDefault();

    const inputs = this.state.inputs
 
    Decks.insert({
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      owner: Meteor.userId(),
      createdAt: new Date(),
      access: this.state.access,
      deckType: inputs.deckType,
      image: this.state.image,
      images: this.state.images
    }, () => {
      this.setState({
        open: true,
        message: 'deck added ok',
        inputs: defaultInputs,
        imagePreview: '',
        publicId: '',
        image: '',
        access: 'private',
        images: null
      })
    })

  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSelectChange = (event, index, value) => {
    return this.setState({'inputs': {...this.state.inputs, 'deckType': value} })
  }

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

  renderdeckTypes() {
    return this.props.deckTypes.map((deckType) => (
      <MenuItem 
        value={deckType.value} 
        primaryText={deckType.title} 
        key={deckType.value}
      />
    ))
  }

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  };
 
  render() {
    return (
      <div>
        {this.props.selectedType? <p>{parseIcon(this.props.selectedType.value, {width:50,height:50})} {this.props.selectedType.description}</p> : ''}
        <Paper className="dash-panel" style={styles.panel} zDepth={2}>
          <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
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
                 containerElement='label' // <-- Just add me!
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

            { this.props.deckType ? '' :
            <div className="form-group">
              <SelectField 
                onChange={this.handleSelectChange} 
                floatingLabelText="Type of deck"
                floatingLabelStyle={styles.floatingLabelStyle}
                data-field="deckType"
                value={this.state.inputs.deckType}
              >
              {this.renderdeckTypes()}
              </SelectField>
            </div>
             }

            <div className="form-group">
             <h3>Auto Population</h3>
             <p>Subscribe to tags or users to auto populate this deck as matching content is added.</p>
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Subscribe to a tag"
                floatingLabelFixed={true}
                id="text-tag"
                data-field="subscriptionTag"
                onChange={this.handleInputChange}
                value={this.state.inputs.subscriptionTags}
              />
              <TextField
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelText="Subscribe to a username"
                floatingLabelFixed={true}
                id="text-username"
                data-field="subscriptionUsername"
                onChange={this.handleInputChange}
                value={this.state.inputs.subscriptionUsernames}
              />
            </div>
            <div className="form-group">
              <RaisedButton type="submit" disabled={this.state.uploading} label="Add deck" primary={true} />
            </div>
          </form>
        </Paper>
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
  deckTypes: PropTypes.array,
  loadingdeckTypes: PropTypes.bool,
  loadingdecks: PropTypes.bool,
  selectedType: PropTypes.object
}

export default AddDeck