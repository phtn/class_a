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
import { createContainer } from 'meteor/react-meteor-data'
import { Beers } from '/collections/beers'

Meteor.subscribe('showBartenders')
Meteor.subscribe('showBeers')


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

const handleInsertBartender = ()=> {
  Meteor.call('insertBartender', Session.get('codename-input'))
  document.getElementById('codename-input')
}
const handleInsertBeer = () => {
  Meteor.call('insertBeer', Session.get('beer-name-input'), Session.get('beer-price-input'), Session.get('beer-type-input'), Session.get('beer-qty-input'), Session.get('setBeerImage'))
}
const handleChangeBartender = (e) => {
  Session.set('codename-input', e.target.value)
}
const handleChangeBeerName = (e) => {
  Session.set('beer-name-input', e.target.value)
  switch(e.target.value){
    case 'corona' || 'Corona' || 'CORONA':
      Session.set('setBeerImage', '/public/img/corona.png')
      break;
    default:
      Session.set('setBeerImage', '')
  }
}
const handleChangeBeerPrice = (e) => {
  price = e.target.value
  Session.set('beer-price-input', Number(price).toFixed(2))
}
const handleChangeBeerType = (e) => {
  Session.set('beer-type-input', e.target.value)
}
const handleChangeBeerQty = (e) => {
  Session.set('beer-qty-input', e.target.value)
}

const Config = ({}) => (
  <Mui muiTheme={getMuiTheme(dark)}>
  <div>
    <GridList cols={3}>


    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="fa fa-user-circle fa-2x config-icon"></span>
        <span className="config-header">ADD BARTENDER</span>
      </div>}
      />

    <TextField
      id="codename-input"
      hintText="McGyver..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'CodeName'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBartender}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsertBartender} label='Add' default={true}/>
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
      onChange={handleChangeBeerPrice}
    />
    <TextField
      hintText="bottles..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Type'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerType}
    />
    <TextField
      hintText="24..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Quantity'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={handleChangeBeerQty}
    />

    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsertBeer} label='Add' default={true}/>
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
      <RaisedButton style={addStyles.button} onClick={handleInsertBeer} label='Add' default={true}/>
    </CardActions>
    </Card>

    </GridList >
  </div>
  </Mui>
)
Config.propTypes = {
  beers: React.PropTypes.array
};

export default createContainer(()=> {
  return {
    beers: Beers.find().fetch()
  }
}, Config)
