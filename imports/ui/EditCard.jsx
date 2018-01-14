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

const startTime = new Date()
const styles = {
  formStyle: {
    marginBottom: 30
  },
  floatingLabelStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500
  }
}

class EditCard extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      open: false,
      message: 'Card added successfully',
      inputs: {...this.props.card}
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
      description: inputs.description.trim(),
      owner: inputs.owner,
      access: 'public',
      cardType: inputs.cardType
    }

    Cards.update({_id: inputs._id}, {$set: data}, () => {
      this.setState({
        open: true,
        message: 'Card edited ok'
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
            </SelectField>
          </div>
          <div className="form-group">
            <RaisedButton type="submit" label="Save Edits" primary={true} />
          </div>
        </form>

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

}

EditCard.propTypes = {
  card: PropTypes.object,
}
 
export default EditCard