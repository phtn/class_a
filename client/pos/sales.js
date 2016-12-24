import React from 'react'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'


const Sales = () => (
  <Mui muiTheme={getMuiTheme(dark)}>
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
      <TableHeaderColumn>#</TableHeaderColumn>
      <TableHeaderColumn>NAME</TableHeaderColumn>
      <TableHeaderColumn>TOTAL</TableHeaderColumn>
      <TableHeaderColumn>TENDERED</TableHeaderColumn>
      <TableHeaderColumn>CHANGE</TableHeaderColumn>
      <TableHeaderColumn colSpan={3}>ITEMS</TableHeaderColumn>
    </TableRow>
    </TableHeader>
  </Table>
  </Mui>
)
export default Sales
