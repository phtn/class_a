import React from 'react'
import { Session } from 'meteor/session'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { styles } from '../config.style'

/* B A R T E N D E R S */
const handleInsertBartender = ()=> {
  Meteor.call('insertBartender', Session.get('codename-input'))
  
}
const handleChangeBartender = (e) => {
  Session.set('codename-input', e.target.value)
}

const addBartenderContainer = ({}) => (
  <div>
    <Card className="add-cards" style={styles.cardContent}>
    <Paper
      zDepth={2}
      children={<div className="brand-div">
        <span className="config-header">ADD BARTENDER</span>
      </div>}
      />

    <TextField
      id="codename-input"
      hintText="McGyver..."
      hintStyle={styles.hint}
      floatingLabelText= 'CodeName'
      floatingLabelStyle={styles.floating}
      style={styles.text}
      onChange={handleChangeBartender}
    />
    <CardActions>

      <RaisedButton
        style={styles.button}
        onClick={handleInsertBartender}
        label='Add' default={true}/>

    </CardActions>
    </Card>
  </div>
)
export default addBartenderContainer
