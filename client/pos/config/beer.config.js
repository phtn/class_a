import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'

/* B E E R   HELPERS */

const handleInsertBeer = () => {
  Meteor.call('insertBeer',
    Session.get('beer-name-input'),
    Session.get('beer-price-input'),
    Session.get('beer-type-input'), Session.get('beer-qty-input'),
    Session.get('setBeerImage'))
}
const handleChangeBeerName = (e) => {
  Session.set('beer-name-input', e.target.value)
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



const addBeerContainer = ({}) => (
  <div>
    <Card className="add-cards animated fadeInUp" style={styles.cardContent}>
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="config-header">ADD BEER</span>
      </div>}
      />

    <TextField
    hintText="Quadrupel..."
    hintStyle={styles.hint}
    floatingLabelText= 'Beer'
    floatingLabelStyle={styles.floating}
    style={styles.text}
    onChange={handleChangeBeerName}
  />
  <TextField
    hintText="3..."
    hintStyle={styles.hint}
    floatingLabelText= 'Price'
    floatingLabelStyle={styles.floating}
    style={styles.text}
    onChange={handleChangeBeerPrice}
  />
  <TextField
    hintText="bottles..."
    hintStyle={styles.hint}
    floatingLabelText= 'Type'
    floatingLabelStyle={styles.floating}
    style={styles.text}
    onChange={handleChangeBeerType}
  />
  <TextField
    hintText="24..."
    hintStyle={styles.hint}
    floatingLabelText= 'Quantity'
    floatingLabelStyle={styles.floating}
    style={styles.text}
    onChange={handleChangeBeerQty}
  />


  <CardActions>
    <RaisedButton style={styles.button} onClick={handleInsertBeer} label='Add' default={true}/>
  </CardActions>
  </Card>
  </div>
)
export default addBeerContainer
