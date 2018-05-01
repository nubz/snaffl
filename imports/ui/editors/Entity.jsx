import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import DraftEditor from '../DraftEditor'
import Paper from 'material-ui/Paper'
import parseIcon from '../TypeIcons'

const floatingLabelStyle = {
  color: 'black',
  fontSize: 20,
  fontWeight: 500
}

class EntityEditor extends Component {

  constructor(props) {
    super(props);

    if (!props.card.content) {
      props.card.content = {Entity: {
        "firstName": "",
        "lastName": "",
        "bio": JSON.stringify({
          "entityMap": {},
          "blocks": [
            {
              "key": "ag6qs",
              "text": "",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": {}
            }
          ]
        }),
        "email": "",
        "telephone": "",
        "links": []
      }}
    }

    const { Entity } = props.card.content
 
    this.state = {
      content: Entity
    }

  }

  onChangeBio = (val) => {
    this.setState({'content': { ...this.state.content, 'bio' : val } })
  }

  handleInputChange = (event, index, value) => this.setState({'content': { ...this.state.content, [event.target.dataset.field] : event.target.value } })

  returnTextField(name, label) {
    return (
      <TextField
        floatingLabelStyle={floatingLabelStyle}
        floatingLabelText={label}
        floatingLabelFixed={true}
        id={name}
        data-field={name}
        onChange={this.handleInputChange}
        value={this.state.content[name]}
      />
    )
  }

  render() {
    return (
      <div>
      <Paper style={{padding: 20, marginTop: 30, marginBottom: 30, overflow: 'hidden'}}>
        <h3 className="paperHead">{parseIcon('Entity', {height:50,width:50})} Name</h3>
        <div className="form-group">
          {this.returnTextField("firstName", "First name")}
        </div>

        <div className="form-group">
          {this.returnTextField("lastName", "Last name")}
        </div>

        <div className="form-group">
          {this.returnTextField("email", "Email")}
        </div>

        <div className="form-group">
          {this.returnTextField("telephone", "Telephone")}
        </div>

      </Paper>

        <h3>{parseIcon('Entity', {height:50,width:50})} Bio</h3>
        <div className="editor">
          <DraftEditor onChange={this.onChangeBio} content={this.state.content.bio} _id={this.props.card._id} />
        </div>

      </div>
    )
  }

}

EntityEditor.propTypes = {
  card: PropTypes.object
}
 
export default EntityEditor