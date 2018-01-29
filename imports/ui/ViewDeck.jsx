import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snapdeck from './Snapdeck.jsx'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  spinner: {
    marginLeft: '50%',
    left: -30,
    marginTop: '50%',
    top: -30
  }
}

class ViewDeck extends Component {

  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div style={{position:'relative'}}>
      { this.props.loading ? 
        <CircularProgress style={styles.spinner} size={60} thickness={7} />
      : 
        <Snapdeck
          key={this.props.deck._id} 
          deck={this.props.deck} 
          full={true}
          standalone={true}
          multiSnackBar={()=>false} 
          loading={this.props.loading}
        />
      }
      </div>
    )
  }
}

ViewDeck.propTypes = {
  deck: PropTypes.object,
  loading: PropTypes.bool
}

export default ViewDeck