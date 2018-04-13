import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import Decks from '../api/decks/collection'
import Toggle from 'material-ui/Toggle'
import CircularProgress from 'material-ui/CircularProgress'
import imageApi from "../api/imageApi";

const styles = {
  formStyle: {
    marginBottom: 30,
    maxWidth: 960,
    margin: '10px auto'
  },
  floatingLabelStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500
  },
  imagePreview: {
    display: 'block',
    marginBottom: 20,
    maxWidth: '100%'
  },
  fileInput: {
    display: 'none'
  }
};

class EditDeck extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      message: 'Deck added successfully',
      inputs: {...this.props.deck},
      access: this.props.deck.access,
      images: this.props.deck.images || null,
      image: this.props.deck.image,
      imagePreview: ''
    }
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
    const data = {
      title: inputs.title.trim(),
      access: this.state.access,
      images: this.state.images,
      image: this.state.image
    };

    if (inputs.description) {
      data.description = inputs.description.trim();
    }

    Decks.update({_id: inputs._id}, {$set: data}, () => {
      this.setState({
        open: true,
        message: 'Deck edited ok'
      })

      FlowRouter.go('/deck/' + inputs._id)
    })

  }

  uploadFiles(event) {
    imageApi.uploadFiles(event, this)
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleInputChange = (event, index, value) => this.setState({'inputs': { ...this.state.inputs, [event.target.dataset.field] : event.target.value } })

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  }

  render() {
    return (
      <div>
        { this.props.loading ? <CircularProgress size={60} thickness={7} /> :
        <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
          <Toggle
            label="Public access"
            onToggle={this.handleAccessChange}
            labelPosition="right"
            style={{marginBottom: 20}}
            toggled={this.state.access === 'public'}
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
              floatingLabelText="Description"
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

          <div className="form-group">
            <RaisedButton type="submit" label="Save Edits" primary={true} />
          </div>
          <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </form>
        }
      </div>
    )
  }

}

EditDeck.propTypes = {
  deck: PropTypes.object,
  loading: PropTypes.bool
}

export default EditDeck