import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import CardListQueryContainer from '../containers/CardListQueryContainer'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Toggle from 'material-ui/Toggle'
import parseIcon from './TypeIcons'
import imageApi from '../api/imageApi'
import parseEditor from './TypeEditors'
import {stateToHTML} from 'draft-js-export-html'
import {editorStateFromRaw} from "megadraft"
import Paper from 'material-ui/Paper'
import Cards from '../api/cards/collection'

const startTime = moment().subtract(1, 'hours').toDate()
console.log('startTime', startTime);

const styles = {
  formStyle: {
    padding: 20,
    maxWidth: 960,
    margin: '10px auto',
    background: '#ffffffe3'
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
    width: '100%'
  }
}

const defaultInputs = {
  title: '',
  description: '',
  content: {},
  image: null
};

let loc = {latitude: 0, longitude: 0};

class AddCard extends Component {

  constructor(props) {
    super(props);

    console.log('AddCard props', props)

    this.state = {
      open: false,
      uploading: false,
      message: 'Card added successfully',
      inputs: {...defaultInputs},
      imagePreview: '',
      publicId: '',
      image: '',
      access: 'private',
      cardType: props.data.value,
      selectedType: props.data
    }

    let navigatorLocated = false;
    AllGeo.getLocationByNavigator(function (pos) {
      this.setState({'location': pos})
      console.log('locationByNavigator', pos);
      navigatorLocated = true;
    }.bind(this));

    if (!navigatorLocated) {
      AllGeo.getLocationByIp(function (pos) {
        if (!navigatorLocated) {
          this.setState({'location': pos})
          console.log('locationByIp', pos)
        }
      }.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      decks: nextProps.data
    })
  }

  uploadFiles(event) {
    imageApi.uploadFiles(event, this)
  }

  setImages(images) {
    this.uploadedImages = images;
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

    content[this.state.cardType] = this.contentFields.state.content;

    if (this.state.cardType === 'Embed') {
      // bail out to handle the extraction of meta data
      this.useEmbed(content);

      return;

    }

    if (this.state.cardType === 'Article' || this.state.cardType === 'Entity') {
      const contentToParse = this.state.cardType === 'Entity' ? content.Entity.bio : content[this.state.cardType];
      const options = {
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
      cardType: this.state.cardType,
      cardTypeId: this.state.selectedType._id,
      image: this.state.image,
      images: this.uploadedImages || this.state.images,
      content: content
    };

    if (this.state.geo) {
      data.lat = this.state.location.lat
      data.lng = this.state.location.lng
    }

    Cards.insert(data, (err, result) => {
      const authorLink = Cards.getLink(result, 'author');
      authorLink.set(data.owner)
      const typeLink = Cards.getLink(result, 'type');
      typeLink.set(data.cardTypeId)
      this.setState({
        open: true,
        message: 'Card added ok',
        inputs: defaultInputs,
        publicId: '',
        image: '',
        access: 'private',
        images: {},
        content: {}
      });
    })

  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleInputChange = (event, index, value) => this.setState({
    'inputs': {
      ...this.state.inputs,
      [event.target.dataset.field]: event.target.value
    }
  })

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({access: selectedAccess});
  };

  handleGEOChange = (event, geo) => {
    const selectedGeo = geo ? 'geo' : 'private'
    this.setState({geo: selectedGeo});
  };

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

  renderEditor(type) {
    return parseEditor(type, {
      ref: this.registerContent,
      card: {},
      isNew: true,
      geo: this.state.location
    })
  }



  render() {
    return (
      <div className="main-bg">
        <form onSubmit={this.handleSubmit.bind(this)}>

          {this.state.cardType === 'Embed' ?
            ''
            : <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>

              <h3 className="paperHead">{parseIcon(this.state.selectedType.value, {height:50,width:50,color: 'white'})} {this.state.cardType} info</h3>

              {this.state.uploading ?
                <div className="imagePreview">
                  <CircularProgress style={{margin:'auto', marginTop: -200}} size={60} thickness={7}/>
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
            </Paper>
          }

          <div className="form-group">
            {
            this.renderEditor(this.state.cardType)
            }
          </div>

          <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
            <h3 className="paperHead">{parseIcon(this.state.selectedType.value, {height:50,width:50,color: 'white'})} Publishing details</h3>

            <Toggle
              label="Record posting location"
              onToggle={this.handleGEOChange}
              labelPosition="right"
              style={{marginBottom: 20}}
            />

            <Toggle
              label="Public access"
              onToggle={this.handleAccessChange}
              labelPosition="right"
              style={{marginBottom: 20}}
            />

            <div className="form-group">
              <RaisedButton type="submit" style={{minWidth: 150}} disabled={this.state.uploading} label="Add Card" secondary={true}/>
            </div>

          </Paper>

        </form>

        <Divider/>

        <CardListQueryContainer createdAt={{$gt: startTime}} title="Recent cards" owner={Meteor.userId()}/>

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

export default AddCard