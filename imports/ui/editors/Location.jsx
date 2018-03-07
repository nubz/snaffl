import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MapEditor from '../MapEditor'
import Secrets from '../../../secrets'
import { HTTP } from 'meteor/http'

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

function HTTPRequest(method, url, data) {

  return new Promise((resolve, reject) => {
    try {
      HTTP.call(method, url, data || {}, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });

    } catch (e) {
      console.error(e)
      reject(e);
    }
  });

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

  registerMapVals = contentMap => this.contentMap = contentMap

  handleInputChange = (event, index, value) => this.setState({'content': { ...this.state.content, [event.target.dataset.field] : event.target.value } })

  handleUseCurrentLocation() {
    let location = AllGeo.getLocation()
    this.setState({'content': { ...this.state.content, 'latitude' : location.lat, 'longitude': location.lng } })
  }

  onMarkerChange = () => this.setState({'content': { ...this.state.content, 'latitude' : this.contentMap.state.lat, 'longitude': this.contentMap.state.lng } })

  findPostcode() {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(this.state.content.postcode) + "&key=" + Secrets.googleMaps.apiKey

    HTTPRequest('GET', url).then(function(response) { 
      let location = response.data.results[0].geometry.location;
      this.setState({'content': { ...this.state.content, 'latitude' : location.lat, 'longitude':location.lng } })
    }.bind(this), function(error) { });
  }

  render() {
    return (
      <div>
        <h3>Create a map</h3>
        <RaisedButton
           secondary={true} 
           containerElement='label' 
           label='Use current location'
           onClick={this.handleUseCurrentLocation.bind(this)} />
        <p>OR</p>
        { this.state.content.postcode.length ? 
          <div className="form-group">
            <RaisedButton
               secondary={true} 
               containerElement='label' 
               label='Use postcode entered in form'
               onClick={this.findPostcode.bind(this)} />
          </div> 
          : 'enter postcode below for auto generation'}

        { this.state.content.latitude != 0 ?
          <MapEditor ref={this.registerMapVals} onChange={this.onMarkerChange} latitude={this.state.content.latitude} longitude={this.state.content.longitude} /> : ''}
        {this.mapTextFields()}
      </div>
    )
  }

}

LocationEditor.propTypes = {
  card: PropTypes.object
}
 
export default LocationEditor