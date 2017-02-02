import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'


/*S H O T S */
const handleChangeMixName = (e) => {
  Session.set('mix-name-input', e.target.value)
}
const handleChangeMixPrice = (e) => {
  price = e.target.value
  Session.set('mix-price-input', Number(price).toFixed(2))
}
const handleChangeMixType = (e) => {
  Session.set('mix-type-input', e.target.value)
}
const handleChangeMixQty = (e) => {
  Session.set('mix-qty-input', e.target.value)
}
const handleInsertMix = () => {
  Meteor.call('insertMix',
  Session.get('mix-name-input'),
  Session.get('mix-price-input'),
  Session.get('mix-type-input'),
  Session.get('mix-qty-input'),
  )
}

const addMixContainer = ({}) => (
  <div>
  <Card className="add-cards animated fadeInUp" style={styles.cardContent}>
  <Paper
    zDepth={2}
    children={<div className="brand-div">
      <span className="config-header">ADD MIXES</span>
    </div>}
    />

  <TextField
  hintText="Tequila Sunrise..."
  hintStyle={styles.hint}
  floatingLabelText= 'Name'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeMixName}
/>
<TextField
  hintText="3..."
  hintStyle={styles.hint}
  floatingLabelText= 'Price'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeMixPrice}
/>
<TextField
  hintText="Cocktail..."
  hintStyle={styles.hint}
  floatingLabelText= 'Type'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeMixType}
/>
<TextField
  hintText="24..."
  hintStyle={styles.hint}
  floatingLabelText= 'Quantity'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeMixQty}
/>

<CardActions>
  <RaisedButton style={styles.button} onClick={handleInsertMix} label='Add' default={true}/>
</CardActions>
</Card>

  </div>
)
export default addMixContainer
