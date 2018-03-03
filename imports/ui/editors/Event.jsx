import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

const floatingLabelStyle = {
  color: 'black',
  fontSize: 20,
  fontWeight: 500
}

class EventEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Event: {
        "startDate": null,
        "startTime": null,
        "endDate": null,
        "endTime": null,
        "venue": {
          "name": "",
          "address": "",
          "postcode":"",
          "contact": {
            "email": "",
            "telephone": ""
          }
        }

      }}
    }

    const { Event } = props.card.content
 
    this.state = {
      content: Event
    }

  }

  handleChangeStartDate = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'startDate' : date } 
    })
  }

  handleChangeStartTime = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'startTime' : date } 
    })
  }


  handleChangeEndDate = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'endDate' : date } 
    })
  }

  handleChangeEndTime = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'endTime' : date } 
    })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <DatePicker
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelText="Start date"
            floatingLabelFixed={true}
            hintText="Start date"
            value={this.state.content.startDate}
            onChange={this.handleChangeStartDate}
            name="startDate"
          />
        </div>
        <div className="form-group">
          <TimePicker
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelText="Start time"
            floatingLabelFixed={true}
            format="ampm"
            hintText="Start time"
            value={this.state.content.startTime}
            onChange={this.handleChangeStartTime}
          />
        </div>
        <div className="form-group">
          <DatePicker
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelText="End date"
            floatingLabelFixed={true}
            hintText="End date"
            value={this.state.content.endDate}
            onChange={this.handleChangeEndDate}
            name="startDate"
          />
        </div>
        <div className="form-group">
          <TimePicker
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelText="End time"
            floatingLabelFixed={true}
            format="ampm"
            hintText="End time"
            value={this.state.content.endTime}
            onChange={this.handleChangeEndTime}
          />
        </div>
      </div>
    )
  }

}

EventEditor.propTypes = {
  card: PropTypes.object
}
 
export default EventEditor