import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const Nav = ({brand}) => (
  <div>
    <RaisedButton label={ brand } secondary={true} style={{margin: 10}}/>
  </div>
)
export default Nav
