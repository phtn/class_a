import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'


/*S H O T S */
const handleChangeShotName = (e) => {
  Session.set('shot-name-input', e.target.value)
}
const handleChangeShotPrice = (e) => {
  price = e.target.value
  Session.set('shot-price-input', Number(price).toFixed(2))
}
const handleChangeShotType = (e) => {
  Session.set('shot-type-input', e.target.value)
}
const handleChangeShotQty = (e) => {
  Session.set('shot-qty-input', e.target.value)
}
const handleInsertShot = () => {
  Meteor.call('insertShot',
  Session.get('shot-name-input'),
  Session.get('shot-price-input'),
  Session.get('shot-type-input'),
  Session.get('shot-qty-input'),
  )
}

const addShotContainer = ({}) => (
  <div>
  <Card className="add-cards" style={styles.cardContent}>
  <Paper
    zDepth={2}
    children={<div className="brand-div">
      <span className="config-header">ADD SHOTS</span>
    </div>}
    />

  <TextField
  hintText="Ketel One..."
  hintStyle={styles.hint}
  floatingLabelText= 'Name'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeShotName}
/>
<TextField
  hintText="3..."
  hintStyle={styles.hint}
  floatingLabelText= 'Price'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeShotPrice}
/>
<TextField
  hintText="Vodka..."
  hintStyle={styles.hint}
  floatingLabelText= 'Type'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeShotType}
/>
<TextField
  hintText="24..."
  hintStyle={styles.hint}
  floatingLabelText= 'Quantity'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeShotQty}
/>

<CardActions>
  <RaisedButton style={styles.button} onClick={handleInsertShot} label='Add' default={true}/>
</CardActions>
</Card>

  </div>
)
export default addShotContainer
