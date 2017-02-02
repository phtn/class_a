import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'


/*S H O T S */
const handleChangeCordialName = (e) => {
  Session.set('cordial-name-input', e.target.value)
}
const handleChangeCordialPrice = (e) => {
  price = e.target.value
  Session.set('cordial-price-input', Number(price).toFixed(2))
}
const handleChangeCordialType = (e) => {
  Session.set('cordial-type-input', e.target.value)
}
const handleChangeCordialQty = (e) => {
  Session.set('cordial-qty-input', e.target.value)
}
const handleInsertCordial = () => {
  Meteor.call('insertCordial',
  Session.get('cordial-name-input'),
  Session.get('cordial-price-input'),
  Session.get('cordial-type-input'),
  Session.get('cordial-qty-input'),
  )
}

const addCordialContainer = ({}) => (
  <div>
  <Card className="add-cards animated fadeInUp" style={styles.cardContent}>
  <Paper
    zDepth={2}
    children={<div className="brand-div">
      <span className="config-header">ADD CORDIALS</span>
    </div>}
    />

  <TextField
  hintText="Grand Marnier..."
  hintStyle={styles.hint}
  floatingLabelText= 'Name'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeCordialName}
/>
<TextField
  hintText="8..."
  hintStyle={styles.hint}
  floatingLabelText= 'Price'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeCordialPrice}
/>
<TextField
  hintText="Cordial..."
  hintStyle={styles.hint}
  floatingLabelText= 'Type'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeCordialType}
/>
<TextField
  hintText="24..."
  hintStyle={styles.hint}
  floatingLabelText= 'Quantity'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeCordialQty}
/>

<CardActions>
  <RaisedButton style={styles.button} onClick={handleInsertCordial} label='Add' default={true}/>
</CardActions>
</Card>

  </div>
)
export default addCordialContainer
