import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

class EntityReader extends Component {

  constructor(props) {
    super(props);
    const { Entity } = props.content
    const editorState = editorStateFromRaw(JSON.parse(Entity.bio))
    this.state = {editorState}
  }

  render() {
    const { Entity } = this.props.content

    return (
      <div>
        <p>Name: {Entity.firstName} {Entity.lastName}</p>
        <p>Bio:</p>
        <MegadraftEditor
          editorState={this.state.editorState}
          readOnly={true}/>
      </div>
    )
  }

}

EntityReader.propTypes = {
  content: PropTypes.object
}
 
export default EntityReader