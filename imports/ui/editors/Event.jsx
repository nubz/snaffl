import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Paper from 'material-ui/Paper'
import parseIcon from '../TypeIcons'

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

  returnDateParts = (date) => {
    let m = moment(date);
    return { day: m.format('D'), month: m.format('MMMM'), monthShort: m.format('MMM'), year: m.format('YYYY'), yearShort: m.format('YY')}
  }

  returnTimeParts = (date) => {
    let m = moment(date);
    return { time12hr: m.format('h:mm'), time24hr: m.format('kk:mm'), period: m.format('a')}
  }

  handleChangeStartDate = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'startDate' : date, 'startDateParts': this.returnDateParts(date) }
    })
  }

  handleChangeStartTime = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'startTime' : date, 'startTimeParts': this.returnTimeParts(date) }
    })
  }


  handleChangeEndDate = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'endDate' : date, 'endDateParts': this.returnDateParts(date) }
    })
  }

  handleChangeEndTime = (event, date) => {
    this.setState({
      'content': { ...this.state.content, 'endTime' : date, 'endTimeParts': this.returnTimeParts(date) }
    })
  }

  render() {
    return (
      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
        <h3 className="paperHead">{parseIcon('Event', {height:50,width:50,color: 'white'})} Event timings</h3>
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
      </Paper>
    )
  }

}

EventEditor.propTypes = {
  card: PropTypes.object
}
 
export default EventEditor