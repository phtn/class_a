import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import { Sales } from '/collections/sales'
import { Beers } from '/collections/beers'
import { Bartenders } from '/collections/bartenders'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import Code from 'material-ui/svg-icons/action/code'
import Drawer from 'material-ui/Drawer'
import PrintIcon from 'material-ui/svg-icons/action/print'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { styles } from './sales.style.js'


Meteor.subscribe('showSales')



class SALES extends Component {
  constructor(props){
    super(props)

    this.state = {
      drawerOpen: true,
      dialogOpen: false,
      showEventField: { display: 'none' },
      showCreateEventBtn: styles.createEventActionBtn
    }
  }

  /* E A C H S A L E */

  showEachSale() {
    return this.props.sale.map((each)=> (
      <TableRow key={each._id} selectable={false} displayBorder={true}>
        <TableRowColumn>{each.owner}</TableRowColumn>
        <TableRowColumn>{each.total}</TableRowColumn>
        <TableRowColumn>{each.ct}</TableRowColumn>
        <TableRowColumn>{each.ch}</TableRowColumn>
        <TableRowColumn>{each.items}</TableRowColumn>
        <TableRowColumn>{each.createdAt}</TableRowColumn>
      </TableRow>
    ))
  }
  pullMenuButton() {
    return (
      <IconButton onClick={()=>this.handleDrawerToggle()}><Code/></IconButton>
    )
  }
  handleRemoveAll() {
    Meteor.call('removeAllSales')
  }
  /* T O T A L S A L E S */
  returnTotalSale() {
    let t = 0
    this.props.sale.map((doc)=> {
       t += doc.total
       Session.setPersistent('returnTotalSale', 'Total Sales : $ ' + parseFloat(t).toFixed(2))
     }
    )
    return Session.get('returnTotalSale')
  }

  /* HANDLE DRAWER */
  handleDrawerToggle() {
    this.setState({drawerOpen: ! this.state.drawerOpen})
  }
  /* I N V E N T O R Y */
  showInventoryItems() {
      return this.props.beers.map((beer)=>(
          <div key={beer._id} style={styles.itemDiv}>
            <LinearProgress mode='determinate' value={beer.inStock} max={beer.qty} style={styles.pbar}/>
            <span style={styles.beerLabel}>{beer.name}</span>
            <Divider/>
            {beer.inStock}
          </div>

      )
    )
  }
  inventoryWrapper() {
    return (
      <div style={styles.root}>
      <GridList cols={4} >
        {this.showInventoryItems()}
      </GridList>
      </div>
    )
  }
  handleInventoryClick(id) {
    console.log(id)
  }
  /* B A R T E N D E R S */
  showAllBartenders() {
    return this.props.bartenders.map((bartender) => (
      <div style={styles.itemDiv} key={bartender._id}>
        <span style={styles.beerLabel}>{bartender.nickname}</span>
        <Divider />
        <span style={styles.salesLabel}>{bartender.totalSale}</span>
      </div>
    ))
  }

  setStatus(){
    Meteor.call('insertStatus')
  }

  bartendersWrapper() {
    return (
      <div style={styles.root}>
      <GridList cols={3} >
        {this.showAllBartenders()}
      </GridList>
      </div>
    )
  }

  handleCloseDialog() {
    this.setState({dialogOpen: false})
  }
  decrement(id){
    Meteor.call('minusOne', id)
    console.log(id)
  }

  createEvent() {
    this.setState({showCreateEventBtn: {display: 'none'}})
    this.setState({showEventField: styles.createEventInputField})
    this.setStatus()
  }

  handleEventChange(e) {
    return this.setState({eventInput: e.target.value})
  }

  actionsWrapper() {
    return (
      <div style={styles.root}>
        {this.showActionItems()}
      </div>
    )
  }

  showActionItems(){
    return (
      <MenuItem primaryText="Print Sales" leftIcon={<PrintIcon/>}/>
    )
  }

  render(){

    return (
      <Mui muiTheme={getMuiTheme(light)}>
      <div>
      <AppBar
        title={this.returnTotalSale()}
        showMenuIconButton={false}
        iconElementRight={this.pullMenuButton()}
        zDepth={1}
        style={styles.appBarMain}
        titleStyle={styles.apTitleMain}/>

      <br /><br /><br />
      <Table style={styles.tableBodySales}>


        <TableHeader displaySelectAll={false} adjustForCheckbox={false} headerStyle={styles.thead}>
        <TableRow>
          <TableHeaderColumn style={styles.thead}>NAME</TableHeaderColumn>
          <TableHeaderColumn style={styles.thead}>TOTAL</TableHeaderColumn>
          <TableHeaderColumn style={styles.thead}>TENDERED</TableHeaderColumn>
          <TableHeaderColumn style={styles.thead}>CHANGE</TableHeaderColumn>
          <TableHeaderColumn style={styles.thead}>ITEMS</TableHeaderColumn>
          <TableHeaderColumn style={styles.thead}>TIMESTAMP</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody stripedRows={false} displayRowCheckbox={false} style={styles.tableBody}>
          {this.showEachSale()}
        </TableBody>

      </Table>

      {/* D R A W E R */}
      <Drawer width={650} openSecondary={true} open={this.state.drawerOpen}
        containerStyle={styles.drawerContainer}>
        <AppBar
          title='General Summary'
          showMenuIconButton={false}
          onTitleTouchTap={()=>this.handleDrawerToggle()}
          zDepth={1}
          style={styles.appBarDrawer}
          titleStyle={styles.drawerTitleSales}/>
          <div>
            <Card style={styles.cardClearance}>
              /* EVENT CARD */
              <CardActions style={styles.createEventActionField}>
                <input
                  className='animated fadeIn'
                  type='text'
                  placeholder='event Name'
                  style={this.state.showEventField}
                  id='create-event-input'
                  onChange={()=>this.handleEventChange()}
                  />

                <FlatButton
                  style={this.state.showCreateEventBtn}
                  onClick={()=> this.createEvent()}
                  >Create an Event</FlatButton>
              </CardActions>
            </Card>
            {/* bartenders */}
            <Divider/>
            <Card style={styles.cardClearance}>
              <CardHeader
                title='BARTENDERS'/>
              <CardMedia children={this.bartendersWrapper()}>
              </CardMedia>
            </Card>
            {/* inventory */}
            <Divider/>
            <Card style={styles.cardClearance}>
              <CardHeader
                title='INVENTORY'/>
              <CardMedia children={this.inventoryWrapper()}>
              </CardMedia>
            </Card>
            {/* actions */}
            <Divider/>
            <Card style={styles.cardClearance}>
              <CardHeader
                title='ACTIONS'/>
              <CardMedia children={this.actionsWrapper()}>
              </CardMedia>

            </Card>

          </div>
      </Drawer>

      {/* D I A L O G */}
      <Dialog
        title="Dialog With Actions"
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={()=> this.handleCloseDialog()}>
      </Dialog>
      {/* D I A L O G  -  end */}

      </div>
      </Mui>
    )
  }
}


SALES.propTypes = {
  sale: React.PropTypes.array,
  beers: React.PropTypes.array,
  bartenders: React.PropTypes.array,
  eachSale: React.PropTypes.array,
}

export default createContainer(()=> {
  return {
    sale: Sales.find().fetch().reverse(),
    beers: Beers.find().fetch(),
    bartenders: Bartenders.find().fetch(),
    eachSale: Sales.find().fetch()
  }
}, SALES)
