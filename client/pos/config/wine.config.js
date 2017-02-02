import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'


/*S H O T S */
const handleChangeWineName = (e) => {
  Session.set('wine-name-input', e.target.value)
}
const handleChangeWinePrice = (e) => {
  price = e.target.value
  Session.set('wine-price-input', Number(price).toFixed(2))
}
const handleChangeWineType = (e) => {
  Session.set('wine-type-input', e.target.value)
}
const handleChangeWineCat = (e) => {
  Session.set('wine-cat-input', e.target.value)
}
const handleChangeWineQty = (e) => {
  Session.set('wine-qty-input', e.target.value)
}
const handleInsertWine = () => {
  Meteor.call('insertWine',
  Session.get('wine-name-input'),
  Session.get('wine-price-input'),
  Session.get('wine-type-input'),
  Session.get('wine-cat-input'),
  Session.get('wine-qty-input'),
  )
}

const addWineContainer = ({}) => (
  <div>
  <Card className="add-cards animated fadeInUp" style={styles.cardContent}>
  <Paper
    zDepth={2}
    children={<div className="brand-div">
      <span className="config-header">ADD WINES</span>
    </div>}
    />

  <TextField
  hintText="Barefoot..."
  hintStyle={styles.hint}
  floatingLabelText= 'Name'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeWineName}
/>
<TextField
  hintText="4..."
  hintStyle={styles.hint}
  floatingLabelText= 'Price'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeWinePrice}
/>
<TextField
  hintText="Red..."
  hintStyle={styles.hint}
  floatingLabelText= 'Type'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeWineType}
/>
<TextField
  hintText="Shiraz..."
  hintStyle={styles.hint}
  floatingLabelText= 'Category'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeWineCat}
/>
<TextField
  hintText="24..."
  hintStyle={styles.hint}
  floatingLabelText= 'Quantity'
  floatingLabelStyle={styles.floating}
  style={styles.text}
  onChange={handleChangeWineQty}
/>

<CardActions>
  <RaisedButton style={styles.button} onClick={handleInsertWine} label='Add' default={true}/>
</CardActions>
</Card>

  </div>
)
export default addWineContainer
