import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EventReader extends Component {

  constructor(props) {
    super(props);
  }

  render() { 
    const { Event } = this.props.content

    let timeToGo = moment(Event.startDate).fromNow()
    let startDate = moment(Event.startDate).format('LL')
    let startTime = moment(Event.startTime).format('LT')
    let endDate = moment(Event.endDate).format('LL')
    let endTime = moment(Event.endTime).format('LT')

    return (
      <div>
        <h3><strong><em>Starting in {timeToGo}</em></strong></h3>
        <p>Starts:<br /><span style={{fontSize:24}}>{startDate}</span> {startTime}</p>
        <p>Ends:<br /> <span style={{fontSize:24}}>{endDate}</span> {endTime}</p>
      </div>
    )
  }

}

EventReader.propTypes = {
  content: PropTypes.object
}
 
export default EventReader