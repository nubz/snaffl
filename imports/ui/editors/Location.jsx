import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MapEditor from '../MapEditor'
import Secrets from '../../../secrets'
import { HTTP } from 'meteor/http'
import Paper from 'material-ui/Paper';
import parseIcon from '../TypeIcons'

const fields = [
  {"name": "postcode", "label": "Postcode", "default": "", "disabled": false},
  {"name": "propertyNumber", "label": "Property number", "default": "", "disabled": false},
  {"name": "address", "label": "Address", "default": "", "disabled": false},
  {"name": "email", "label": "Email", "default": "", "disabled": false},
  {"name": "telephone", "label": "Telephone", "default": "", "disabled": false},
  {"name": "website", "label": "Website address", "default": "", "disabled": false},
  {"name": "longitude", "label": "Longitude", "default": 0, "disabled": true},
  {"name": "latitude", "label": "Latitude", "default": 0, "disabled": true}
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

  renderTextField = field => (
      <div className={"form-group field-" +  field.name} key={"field-" + field.name}>
        <TextField
          floatingLabelStyle={field.disabled ? {} : floatingLabelStyle}
          floatingLabelText={field.label}
          floatingLabelFixed={true}
          id={field.name}
          data-field={field.name}
          onChange={this.handleInputChange}
          value={this.state.content[field.name]}
          disabled={field.disabled}
        />
      </div>
    )

  renderTextFields() {
    var clonedFields = fields.slice();
    // remove the postcode (first item in fields array) as it is duplicated in map search
    clonedFields.shift()
    return clonedFields.map((field) => (
      this.renderTextField(field)
    ))
  }

  registerMapVals = contentMap => this.contentMap = contentMap

  handleInputChange = (event, index, value) => this.setState({'content': { ...this.state.content, [event.target.dataset.field] : event.target.value } })

  handleUseCurrentLocation() {
    let loc = this.props.geo;
    this.setState({'content': { ...this.state.content, 'latitude' : loc.lat, 'longitude': loc.lng, 'map': true } })
  }

  onMarkerChange = () => this.setState({'content': { ...this.state.content, 'latitude' : this.contentMap.state.lat, 'longitude': this.contentMap.state.lng } })

  findPostcode() {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(this.state.content.postcode) + "&key=" + Secrets.googleMaps.apiKey

    HTTPRequest('GET', url).then(function(response) {
      const result = response.data.results[0];

      const location = result.geometry.location;
      const addressComponents = result.address_components;
      const exclusions = ['postal_code', 'country', 'administrative_area_level_1', 'administrative_area_level_2'];
      let address = addressComponents.reduce(function (parts, next) {
        if (exclusions.indexOf(next.types[0]) === -1) {
          parts.push(next.short_name)
        }
        return parts
      }, []).join(', ')

      this.setState({'content': { ...this.state.content, 'address': address, 'latitude' : location.lat, 'longitude':location.lng, 'map': true } })
    }.bind(this), function(error) { });
  }

  render() {
    return (
      <div>
        <Paper style={{padding: 20}}>
          <h3 className="paperHead">{parseIcon('Location', {height:50,width:50})} Create a map</h3>
          <div style={{overflow:'hidden'}}>
            <div style={{float:'left', maxWidth: '30%'}}>
              { this.renderTextField({"name": "postcode", "label": "Postcode", "default": "", "disabled": false}) }
              { this.state.content.postcode.length ?
                <div className="form-group" style={{display:'inline-block', marginTop: 30}}>
                  <RaisedButton
                     secondary={true}
                     containerElement='label'
                     label='Show map'
                     onClick={this.findPostcode.bind(this)} />
                </div>
                : ''}
              <p>OR</p>
              <RaisedButton
                secondary={true}
                containerElement='label'
                label='Use current location'
                onClick={this.handleUseCurrentLocation.bind(this)} />
            </div>
            <div style={{float:'left', width: '60%', minHeight: 500, marginLeft: 95, backgroundColor: '#eee'}}>
              { this.state.content.map ?
                <MapEditor ref={this.registerMapVals} onChange={this.onMarkerChange} latitude={this.state.content.latitude} longitude={this.state.content.longitude} /> : ''}
            </div>
          </div>
        </Paper>
        <Paper style={{padding: 20, marginTop: 30, marginBottom: 30}}>
          <h3 className="paperHead">{parseIcon('Location', {height:50,width:50})} Address fields (optional)</h3>
        { this.renderTextFields() }
        </Paper>
      </div>
    )
  }

}

LocationEditor.propTypes = {
  card: PropTypes.object,
  geo: PropTypes.object
}
 
export default LocationEditor