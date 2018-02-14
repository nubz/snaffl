import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import { Cards } from '../api/cards.js'
import Divider from 'material-ui/Divider'
import SnapCardListItem from './SnapCardListItem.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import parseIcon from './TypeIcons'
import imageApi from '../api/imageApi'

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
  }
}

const defaultInputs = {
  title: '',
  description: '',
  cardType: 'Article'
}

class AddCard extends Component {

  constructor(props) {
    super(props);

    if (props.cardType) {
      defaultInputs.cardType = props.cardType
    }
 
    this.state = {
      open: false,
      uploading: false,
      message: 'Card added successfully',
      inputs: defaultInputs,
      imagePreview: '',
      publicId: '',
      image: '',
      access: 'private'
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
    const location = AllGeo.getLocation()
    console.log(location)
    Cards.insert({
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      owner: Meteor.userId(),
      createdAt: new Date(),
      access: this.state.access,
      cardType: inputs.cardType,
      image: this.state.image,
      images: this.state.images,
      lat: location.lat,
      lng: location.lng
    }, () => {
      this.setState({
        open: true,
        message: 'Card added ok',
        inputs: defaultInputs,
        publicId: '',
        image: '',
        access: 'private',
        images: []
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
      <SnapCardListItem 
        key={card._id} 
        card={card} 
        multiSnackBar={this.multiSnackBar.bind(this)} 
      />
    ))
  }

  renderCardTypes() {
    return this.props.cardTypes.map((cardType) => (
      <MenuItem 
        value={cardType.value} 
        primaryText={cardType.title} 
        key={cardType.value}
      />
    ))
  }

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  };

  componentDidMount() {
    // we want this to run every time
    // the page is visited or stale
    // geo data will prevail
    AllGeo.init()
    console.log('all geo init', AllGeo.getLocation())
  }
 
  render() {
    return (
      <div>
        {this.props.selectedType? <p>{parseIcon(this.props.selectedType.value)} {this.props.selectedType.description}</p> : ''}
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

          { this.props.cardType ? '' :
          <div className="form-group">
            <SelectField 
              onChange={this.handleSelectChange} 
              floatingLabelText="Type of Card"
              floatingLabelStyle={styles.floatingLabelStyle}
              data-field="cardType"
              value={this.state.inputs.cardType}
            >
            {this.renderCardTypes()}
            </SelectField>
          </div>
           }
          <div className="form-group">
            <RaisedButton type="submit" disabled={this.state.uploading} label="Add Card" primary={true} />
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
  cardType: PropTypes.string,
  cardTypes: PropTypes.array,
  loadingCardTypes: PropTypes.bool,
  loadingCards: PropTypes.bool,
  selectedType: PropTypes.object
}

export default AddCard