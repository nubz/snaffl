import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import Cards from '../api/cards/collection'
import Divider from 'material-ui/Divider'
import SnapCardListItem from './SnapCardListItem.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import parseIcon from './TypeIcons'
import imageApi from '../api/imageApi'
import parseEditor from './TypeEditors'
import {stateToHTML} from 'draft-js-export-html'
import { editorStateFromRaw } from "megadraft"

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
  }
}

const defaultInputs = {
  title: '',
  description: '',
  content: {},
  image: null
};

let loc = {latitude: 0,longitude: 0};

class AddCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      uploading: false,
      message: 'Card added successfully',
      inputs: {...defaultInputs},
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
  };

  useEmbed(content) {
    const inputs = this.state.inputs;
    if (content.Embed.oEmbed === content.Embed.embedUrl) {
      extractMeta(content.Embed.oEmbed, function (err, res) {
        inputs.title = res.title;
        inputs.description = res.description;
        const image = res.image || res.thumbnail_url;
        if (image) {
          Meteor.call('uploadRemote', image, function (err, data) {
            if (data) {
              this.setState({
                'image': data.secure_url,
                'images': imageApi.makeImageUrls(data.secure_url),
                'publicId': data.public_id,
                'uploading': false
              });
              this.saveContent(inputs, content)
            }

          }.bind(this))
        } else {
          inputs.title = content.Embed.embedUrl;
          inputs.description = 'Unable to extract meta data for this resource.'
          this.saveContent(inputs, content)
        }


      }.bind(this))
    } else {
      // make api call to oembed resource
      Meteor.call('callOEmbed', content.Embed.oEmbed, function (err, res) {
        if (res) {
          inputs.title = res.data.title;
          inputs.description = res.data.description;

          const image = res.data.image || res.data.thumbnail_url;

          Meteor.call('uploadRemote', image, function (err, data) {

            if (data) {
              this.setState({
                'image': data.secure_url,
                'images': imageApi.makeImageUrls(data.secure_url),
                'publicId': data.public_id,
                'uploading': false
              });
              inputs.title = inputs.title || content.Embed.url;
              inputs.description = inputs.description || 'Embedded media';
              this.saveContent(inputs, content)
            }

          }.bind(this))
        } else {
          inputs.title = content.Embed.embedUrl;
          inputs.description = 'Unable to extract meta data for this resource.'
          this.saveContent(inputs, content)
        }
      }.bind(this))
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    const inputs = this.state.inputs
    let content = {};

    content[this.props.cardType] = this.contentFields.state.content;

    if (this.props.cardType === 'Embed') {
      // bail out to handle the extraction of meta data
      this.useEmbed(content);

      return;

    }

    if (this.props.cardType === 'Article' || this.props.cardType === 'Entity') {
      const contentToParse = this.props.cardType === 'Entity' ? content.Entity.bio : content[inputs.cardType];
      let options = {
        blockRenderers: {
          atomic: (block) => {
            let data = block.getData();
            if (data.get('type') === 'image') {
              let src = data.get('src');
              let dim = data.get('display')
              let width = dim === 'medium' ? 240 : '100%';
              return '<img src="' + src + '" width="' + width + '" style="display: block; margin: 10px; border-width: 2px; border-color: black; box-sizing: border-box; border-style: solid;">'
            }
            if (data.get('type') === 'video') {
              let src = data.get('src');
              return '<iframe src="' + src + '" width="100%" height="500" allowfullscreen="true" frameborder="no"></iframe>'
            }
          },
        }
      }
      content.html = stateToHTML(editorStateFromRaw(JSON.parse(contentToParse)).getCurrentContent(), options);
    }

    this.saveContent(inputs, content)

  }

  saveContent(inputs, content) {
    let data = {
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      owner: Meteor.userId(),
      createdAt: new Date(),
      access: this.state.access,
      cardType: this.props.cardType,
      cardTypeId: this.props.selectedType._id,
      image: this.state.image,
      images: this.state.images,
      content: content
    };

    if (this.state.geo) {
      let location = AllGeo.getLocation()
      data.lat = location.lat
      data.lng = location.lng
    }

    Cards.insert(data, (err, result) => {
      const cardOwnerLink = Cards.getLink(result, 'author');
      const cardTypeLink = Cards.getLink(result, 'type');
      cardOwnerLink.set(data.owner)
      cardTypeLink.set(data.cardTypeId)
      this.setState({
        open: true,
        message: 'Card added ok',
        inputs: defaultInputs,
        publicId: '',
        image: '',
        access: 'private',
        images: [],
        content: {}
      })
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  };

  handleGEOChange = (event, geo) => {
    const selectedGeo = geo ? 'geo' : 'private'
    this.setState({geo: selectedGeo});
  };

  componentDidMount() {
    // we want this to run every time
    // the page is visited or stale
    // geo data will prevail
    let navigatorLocated = false;
    AllGeo.getLocationByNavigator(function (pos) {
      loc = pos
      navigatorLocated = true;
    });

    if (!navigatorLocated) {
        AllGeo.getLocationByIp(function (pos) {
            if (!navigatorLocated) {
              loc = pos
            }
        });
    }

  }

  registerContent = contentFields => this.contentFields = contentFields

  returnTextField(name, label) {
    return (
      <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelText={label}
        floatingLabelFixed={true}
        id={name}
        data-field={name}
        onChange={this.handleInputChange}
        value={this.state.inputs[name]}
      />
    )
  }
  returnLoc() {
    return loc;
  }
  render() {
    return (
      <div style={styles.formStyle}>

        {this.props.selectedType? <p>{parseIcon(this.props.selectedType.value)} {this.props.selectedType.description}</p> : ''}

        <form onSubmit={this.handleSubmit.bind(this)}>

          <Toggle
            label="Public access"
            onToggle={this.handleAccessChange}
            labelPosition="right"
            style={{marginBottom: 20}}
          />

          { this.props.cardType === 'Embed' ?
          ''
          : <div>

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
            {this.returnTextField("title", "Title")}
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
            </div>
            }

          <div className="form-group">
            {
              parseEditor(this.props.cardType, {
                ref: this.registerContent,
                card: {},
                isNew: true,
                geo: this.returnLoc
              })
            }
          </div>

          <Toggle
            label="Record posting location"
            onToggle={this.handleGEOChange}
            labelPosition="right"
            style={{marginBottom: 20}}
          />

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
  cardType: PropTypes.string.isRequired,
  cardTypes: PropTypes.array,
  loadingCardTypes: PropTypes.bool,
  loadingCards: PropTypes.bool,
  selectedType: PropTypes.object
}

export default AddCard