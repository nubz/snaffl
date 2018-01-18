import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import { Cards } from '../api/cards.js'
import Divider from 'material-ui/Divider'
import SnapCard from './SnapCard.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Secrets from '../../secrets'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'

const styles = {
  formStyle: {
    marginBottom: 30
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
    marginBottom: 20
  }
}

const defaultInputs = {
  cardType: 'Article',
  title: '',
  description: ''
}

class AddCard extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      message: 'Card added successfully',
      inputs: defaultInputs,
      imagePreview: '',
      publicId: '',
      image: ''
    }
  }

  uploadFiles(event, id) {

    console.log('uploading files', event.currentTarget)

    Session.set('imageLoading', true);

    Cloudinary.upload(
      event.currentTarget.files,
      {'folder': Secrets.cloudinary.folder},
      function (res, data) {
        console.log('uploaded!', data)
        if (id) {
          Meteor.call('updateCover', id, data.public_id, function () {
            $('.modal').modal('hide');
          });
        } else {
          this.setState({
            'imagePreview': data.url.replace('upload/', 'upload/c_scale,h_325/'),
            'image': data.url,
            'publicId': data.public_id
          })
        }

        Session.set('imageLoading', false);
      }.bind(this));
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
 
    Cards.insert({
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      owner: Meteor.userId(),
      createdAt: new Date(),
      access: 'public',
      cardType: inputs.cardType,
      image: this.state.image
    }, () => {
      this.setState({
        open: true,
        message: 'Card added ok',
        inputs: defaultInputs,
        imagePreview: '',
        publicId: '',
        image: ''
      })
    })

  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSelectChange = (event, index, value) => {
    return this.setState({'inputs': {...this.state.inputs, 'cardType': value} })
  }

  handleInputChange = (event, index, value) => this.setState({'inputs': { ...this.state.inputs, [event.target.dataset.field] : event.target.value } })
 
  renderCards() {
    return this.props.cards.map((card) => (
      <SnapCard 
        key={card._id} 
        card={card} 
        multiSnackBar={this.multiSnackBar.bind(this)} 
      />
    ))
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
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
            { this.state.imagePreview !== '' ? 
              <img style={styles.imagePreview} src={this.state.imagePreview} /> 
              : ''}
            <RaisedButton
               containerElement='label' // <-- Just add me!
               label={ this.state.imagePreview === '' ? 'Upload an image' : 'Upload a different image' }>
               <input type="file" style={styles.fileInput} onChange={this.uploadFiles.bind(this)} />
            </RaisedButton>
          </div>
          <div className="form-group">
            <SelectField 
              onChange={this.handleSelectChange} 
              floatingLabelText="Type of Card"
              floatingLabelStyle={styles.floatingLabelStyle}
              data-field="cardType"
              value={this.state.inputs.cardType}
            >
              <MenuItem value={"Article"} primaryText="Article" />
              <MenuItem value={"Image"} primaryText="Image" />
              <MenuItem value={"EmbeddedMedia"} primaryText="Media object (Video, Audio)" />
              <MenuItem value={"Location"} primaryText="Location" />
              <MenuItem value={"Event"} primaryText="Event" />
              <MenuItem value={"Entity"} primaryText="Entity" />
            </SelectField>
          </div>
          <div className="form-group">
            <RaisedButton type="submit" label="Add Card" primary={true} />
          </div>
        </form>

        <Divider />

        <h2>Recently added Cards</h2>
        {this.renderCards()}

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

AddCard.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default AddCard