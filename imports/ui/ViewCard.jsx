import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SnapCard from './SnapCard.jsx'
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

class ViewCard extends Component {

  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div style={{position:'relative'}}>
      { this.props.loading ? 
        <CircularProgress style={styles.spinner} size={60} thickness={7} />
      : 
        <SnapCard 
          key={this.props.card._id} 
          card={this.props.card} 
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

ViewCard.propTypes = {
  card: PropTypes.object,
  loading: PropTypes.bool
}

export default ViewCard