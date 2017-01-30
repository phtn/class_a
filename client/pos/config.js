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
import { Shots } from '/collections/shots'
import { Wines } from '/collections/wines'



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
    fontSize: '14px'
  },
  text: {
    marginLeft: 2
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


    {/* W I N E C A R D */}
    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="config-header">ADD WINE</span>
      </div>}/>

    <TextField
      hintText="Argiano..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Wine'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="Merlot..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Type'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="Red..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Category'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="4.5..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Price'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="1..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Quantity'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsertBeer} label='Add' default={true}/>
    </CardActions>
    </Card>

    {/* S H O T S  C A R D */}
    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="config-header">ADD SHOTS</span>
      </div>}/>

    <TextField
      hintText="Patron..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Shots'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="4.5..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Price'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="1..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Quantity'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <CardActions>
      <RaisedButton style={addStyles.button} onClick={handleInsertBeer} label='Add' default={true}/>
    </CardActions>
    </Card>

    {/* S H O T S  C A R D */}
    <Card className="add-cards">
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="config-header">ADD SHOTS</span>
      </div>}/>

    <TextField
      hintText="Patron..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Shots'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="4.5..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Price'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
    />
    <TextField
      hintText="1..."
      hintStyle={addStyles.hint}
      floatingLabelText= 'Quantity'
      floatingLabelStyle={addStyles.floating}
      style={addStyles.text}
      onChange={null}
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
