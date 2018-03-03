import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'
import SnapCard from './SnapCard.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import { Cards } from '../api/cards.js'
import { Decks } from '../api/decks.js'
import Toggle from 'material-ui/Toggle'
import imageApi from '../api/imageApi'
import CircularProgress from 'material-ui/CircularProgress'
import { TagCards } from '../api/tagCards'
import TagsFromIdsContainer from '../containers/TagsFromIdsContainer'
import parseEditor from './TypeEditors'

const startTime = new Date()
const styles = {
  formStyle: {
    marginBottom: 30
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
  },
}

class EditCard extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      message: 'Card added successfully',
      inputs: {...this.props.card},
      images: this.props.card.images || null,
      image: this.props.card.image
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
    if (!this.state.images) {
      let secureUrl = imageApi.returnSecureUrl(this.props.card.image)
      images = imageApi.makeImageUrls(this.props.card.image)
      this.setState({
          images: images,
          image: secureUrl
        })
    }



    const inputs = this.state.inputs
    let content = {}
    content[inputs.cardType] = this.contentFields.state.content

    const data = {
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      access: inputs.access,
      images: this.state.images,
      image: this.state.image,
      lat: inputs.lat,
      lng: inputs.lng,
      content: content
    }

    Cards.update({_id: inputs._id}, {$set: data}, () => {
      this.setState({
        open: true,
        message: 'Card edited ok'
      }, () => {
        FlowRouter.go('/card/' + inputs._id)
      })

    })

  }

  uploadFiles(event) {
    imageApi.uploadFiles(event, this)
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleInputChange = (event, index, value) => this.setState({'inputs': { ...this.state.inputs, [event.target.dataset.field] : event.target.value } })

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({'inputs': { ...this.state.inputs, 'access':selectedAccess } });
  }

  render() {
    return (
      <div>
      { this.state.loading ? 
        <CircularProgress size={60} thickness={7} />
      :
        <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
          <Toggle
            label="Public access"
            onToggle={this.handleAccessChange}
            labelPosition="right"
            style={{marginBottom: 20}}
            defaultToggled={this.state.inputs.access === 'public'}
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
              floatingLabelText="Summary"
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
            {parseEditor(this.props.card.cardType, {ref: function(contentFields){this.contentFields = contentFields;}.bind(this), card: this.props.card, isNew: true})}
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

EditCard.propTypes = {
  card: PropTypes.object,
  loading: PropTypes.bool
}
 
export default EditCard