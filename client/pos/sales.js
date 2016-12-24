import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Sales } from '/collections/sales'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import AppBar from 'material-ui/AppBar'

Meteor.subscribe('showSales')

const styles = {
  thead: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500
  }
}

class SALES extends Component {
  constructor(props){
    super(props)
  }
  viewEachSale() {
    return this.props.sale.map((each)=> (
      <TableRow key={each._id} selectable={false} displayBorder={false}>
        <TableRowColumn>{each.owner}</TableRowColumn>
        <TableRowColumn>{each.total}</TableRowColumn>
        <TableRowColumn>{each.ct}</TableRowColumn>
        <TableRowColumn>{each.ch}</TableRowColumn>
        <TableRowColumn>{each.items}</TableRowColumn>
        <TableRowColumn>{each.createdAt}</TableRowColumn>
      </TableRow>
    ))
  }
  render(){
    return (
      <Mui muiTheme={getMuiTheme(light)}>
      <div>
      <AppBar title={'LIVE DATA'} showMenuIconButton={false}/>

      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} headerStyle={styles.thead}>
        <TableRow>
          <TableHeaderColumn>NAME</TableHeaderColumn>
          <TableHeaderColumn>TOTAL</TableHeaderColumn>
          <TableHeaderColumn>TENDERED</TableHeaderColumn>
          <TableHeaderColumn>CHANGE</TableHeaderColumn>
          <TableHeaderColumn>ITEMS</TableHeaderColumn>
          <TableHeaderColumn>TIMESTAMP</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} displayRowCheckbox={false}>
          {this.viewEachSale()}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>XXX</TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
      </Mui>
    )
  }
}


SALES.propTypes = {
  sale: React.PropTypes.array
}

export default createContainer(()=> {
  return {
    sale: Sales.find().fetch().reverse()
  }
}, SALES)
