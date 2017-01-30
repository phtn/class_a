import React, { Component } from 'react'
import { render } from 'react-dom'
import Mui from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Router, Route, Link, browserHistory } from 'react-router'

import Nav from './nav'
import Main from './main'
import POS from './pos/pos'
import Admin from './pos/admin'
import Config from './pos/pos.config'
//import Config from './pos/config'
import Sales from './pos/sales'

injectTapEventPlugin(); // touchscreen plugin

export default class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <Mui muiTheme={getMuiTheme(dark)}>
      <div>
        <POS />
      </div>
      </Mui>
    )
  }
}
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="admin" component={Admin}>

    </Route>
    <Route path="/admin/config" component={Config} />
    <Route path="/admin/sales" component={Sales} />
  </Router>
), document.getElementById('container'))
