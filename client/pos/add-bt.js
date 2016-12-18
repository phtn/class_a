import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import { orange500, blue500, red400 } from 'material-ui/styles/colors'
import Person from 'material-ui/svg-icons/action/account-box'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

Meteor.subscribe('showBartenders')

const handleInsert = ()=> {
  console.log('text')
  Meteor.call('insertBartender', Session.get('codename-input'))
}
const handleChange = (e) => {
  Session.set('codename-input', e.target.value)
}
const addStyles = {
  hint: {
    color: "#444",
    fontWeight: 700,
    fontFamily: 'Play'
  },
  floating: {
    color: orange500,
    fontFamily: 'Play',
    fontWeight: 700,
    fontSize: '25px'
  },
  text: {
    margin: '10px'
  },
  button: {
    fontFamily: 'Quicksand !important',
    fontWeight: 700,
    color: orange500
  }
}
const AddBT = ({}) => (
  <Mui muiTheme={getMuiTheme(dark)}>
  <div>
    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
      <a href="/admin/addbt"><Person color={red400}/></a>Add Bartender</div>}/>

    <TextField
      hintText="McGyver..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'CodeName'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChange}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsert} label='Add' default={true}/>
    </CardActions>
    </Card>
  </div>
  </Mui>
)
export default AddBT
