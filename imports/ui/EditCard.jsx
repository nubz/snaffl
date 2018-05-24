import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import Cards from '../api/cards/collection'
import Toggle from 'material-ui/Toggle'
import imageApi from '../api/imageApi'
import CircularProgress from 'material-ui/CircularProgress'
import parseEditor from './TypeEditors'
import {stateToHTML} from 'draft-js-export-html'
import {editorStateFromRaw} from "megadraft"
import Paper from 'material-ui/Paper'
import parseIcon from "./TypeIcons";

const styles = {
  formStyle: {
    marginBottom: 30,
    padding:20,
    maxWidth: 960,
    margin: '10px auto',
    background: 'white'
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
    const inputs = this.state.inputs
    let content = {}
    content[inputs.cardType] = this.contentFields.state.content

    if (inputs.cardType === 'Article' || inputs.cardType === 'Entity') {
      const contentToParse = inputs.cardType === 'Entity' ? content.Entity.bio : content[inputs.cardType]
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
      content.html = stateToHTML(editorStateFromRaw(JSON.parse(contentToParse)).getCurrentContent(), options)
    }

    const data = {
      title: inputs.title.trim(),
      description: inputs.description ? inputs.description.trim() : '',
      access: inputs.access,
      images: this.state.images,
      image: this.state.image,
      lat: inputs.lat,
      lng: inputs.lng,
      content: content
    }

    if (this.state.removeGeo) {
      data.lat = 0
      data.lng = 0
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

  handleGEOChange = (event, geo) => {
    this.setState({removeGeo: geo});
  };

  handleInputChange = (event, index, value) => this.setState({'inputs': { ...this.state.inputs, [event.target.dataset.field] : event.target.value } })

  handleAccessChange = (event, access) => {
    const selectedAccess = access ? 'public' : 'private'
    this.setState({'inputs': { ...this.state.inputs, 'access':selectedAccess } });
  }

  render() {
    return (
      <div className="main-bg">
      { this.state.loading ? 
        <CircularProgress style={{margin:'auto'}} size={60} thickness={7} />
      :
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
              <h3 className="paperHead">{parseIcon(this.state.inputs.cardType, {height:50,width:50,color: 'white'})} {this.state.inputs.cardType} info</h3>
              {this.state.uploading ?
                <div className="imagePreview">
                  <CircularProgress style=style={{margin:'auto', marginTop: -200}} size={60} thickness={7}/>
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
            </Paper>

            {parseEditor(this.props.card.cardType, {ref: function(contentFields){this.contentFields = contentFields;}.bind(this), card: this.props.card, isNew: true})}

            <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
              <h3 className="paperHead">{parseIcon(this.state.inputs.cardType, {height:50,width:50,color: 'white'})} Publishing info</h3>
              { this.state.inputs.lat && this.state.inputs.lat !== 0 ?
              <Toggle
                label="Remove posting location"
                onToggle={this.handleGEOChange}
                labelPosition="right"
                style={{marginBottom: 20}}
              />
              : ''}
              <Toggle
                label="Public access"
                onToggle={this.handleAccessChange}
                labelPosition="right"
                style={{marginBottom: 20}}
                toggled={this.state.inputs.access === 'public'}
              />

              <div className="form-group">
                <RaisedButton type="submit" label="Save Edits" primary={true} />
              </div>
            </Paper>

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