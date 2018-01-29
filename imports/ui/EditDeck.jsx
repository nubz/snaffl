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
import { Decks } from '../api/decks.js'
import { Cards } from '../api/cards.js'
import Toggle from 'material-ui/Toggle'
import CircularProgress from 'material-ui/CircularProgress'

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

class EditDeck extends Component {

  constructor(props) {
    super(props);

    console.log('props for EditDeck', this.props)
 
    this.state = {
      open: false,
      message: 'Deck added successfully',
      inputs: {...this.props.deck},
      access: this.props.deck.access
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
      access: this.state.access
    }

    Decks.update({_id: inputs._id}, {$set: data}, () => {
      this.setState({
        open: true,
        message: 'Deck edited ok'
      })
    })

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
            defaultToggled={this.state.access === 'public'}
          />
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