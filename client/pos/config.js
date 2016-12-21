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
import { GridList } from 'material-ui/GridList'


Meteor.subscribe('showBartenders')

const handleInsert = ()=> {
  console.log('text')
  Meteor.call('insertBartender', Session.get('codename-input'))
}
const handleChangeBartender = (e) => {
  Session.set('codename-input', e.target.value)
}
const handleChangeBeerName = (e) => {
  Session.set('beer-name-input', e.target.value)
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
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: '10px !important',
  }
}
const Config = ({}) => (
  <Mui muiTheme={getMuiTheme(dark)}>
  <div>
    <GridList cols={4}>


    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="fa fa-user-circle fa-2x config-icon"></span>
        <span className="config-header">ADD BARTENDER</span>
      </div>}
      />

    <TextField
      hintText="McGyver..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'CodeName'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBartender}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsert} label='Add' default={true}/>
    </CardActions>
    </Card>


    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="fa fa-beer fa-2x config-icon"></span>
        <span className="config-header">ADD BEER</span>
      </div>}
      />

    <TextField
      hintText="Quadrupel..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Beer'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerName}
    />
    <TextField
      hintText="3..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Price'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerName}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsert} label='Add' default={true}/>
    </CardActions>
    </Card>

    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="fa fa-glass fa-2x config-icon"></span>
        <span className="config-header">ADD WINE</span>
      </div>}/>

    <TextField
      hintText="Shiraz..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Wine'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerName}
    />
    <TextField
      hintText="4.5..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Price'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerName}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsert} label='Add' default={true}/>
    </CardActions>
    </Card>

    </GridList >
  </div>
  </Mui>
)
export default Config
