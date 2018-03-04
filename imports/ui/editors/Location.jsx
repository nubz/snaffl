import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const fields = [
  {"name": "address", "label": "Address", "default": ""},
  {"name": "postcode", "label": "Postcode", "default": ""},
  {"name": "email", "label": "Email", "default": ""},
  {"name": "telephone", "label": "Telephone", "default": ""},
  {"name": "longitude", "label": "Longitude", "default": 0},
  {"name": "latitude", "label": "Latitude", "default": 0}
]

const defaultFields = fields.reduce((result, n) => {
  result[n.name] = n.default
  return result
}, {})

const floatingLabelStyle = {
  color: 'black',
  fontSize: 20,
  fontWeight: 500
}

class LocationEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Location: defaultFields}
    }

    const { Location } = props.card.content
 
    this.state = {
      content: Location
    }

  }

  mapTextFields() {
    return fields.map((field) => (
      <div className="form-group" key={"field-" + field.name}>
        <TextField
          floatingLabelStyle={floatingLabelStyle}
          floatingLabelText={field.label}
          floatingLabelFixed={true}
          id={field.name}
          data-field={field.name}
          onChange={this.handleInputChange}
          value={this.state.content[field.name]}
        />
      </div>
    ))
  }

  handleInputChange = (event, index, value) => this.setState({'content': { ...this.state.content, [event.target.dataset.field] : event.target.value } })

  handleUseCurrentLocation() {
    let location = AllGeo.getLocation()
    this.setState({'content': { ...this.state.content, 'latitude' : location.lat, 'longitude': location.lng } })
  }

  render() {
    return (
      <div>
          {this.mapTextFields()}
          <h3>Create a map</h3>
          <RaisedButton
             secondary={true} 
             containerElement='label' 
             label='Use current location'
             onClick={this.handleUseCurrentLocation.bind(this)} />
      </div>
    )
  }

}

LocationEditor.propTypes = {
  card: PropTypes.object
}
 
export default LocationEditor