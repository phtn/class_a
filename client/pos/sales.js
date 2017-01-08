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
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import Code from 'material-ui/svg-icons/action/code'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'
import { styles } from './sales.style.js'
//import '../../public/micon/css/micon.min.css'


Meteor.subscribe('showSales')


class SALES extends Component {
  constructor(props){
    super(props)

    this.state = {
      drawerOpen: false,

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
       Session.setPersistent('returnTotalSale', '[ Live data ] : $ ' + parseFloat(t).toFixed(2))
     }
    )
    return Session.get('returnTotalSale')
  }
  handleDrawerToggle() {
    this.setState({drawerOpen: ! this.state.drawerOpen})
  }
  /* I N V E N T O R Y */
  showInventoryItems() {
      return this.props.beers.map((beer)=>(
          <div key={beer._id} style={styles.invDiv}>
            <LinearProgress mode='determinate' value={80} style={styles.pbar}/>
            <span style={styles.beerLabel}>{beer.name}</span>
            <hr style={styles.hr}/>
            32 / 100
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
  /* B A R T E N D E R S */
  showAllBartenders() {
    return this.props.bartenders.map((bartender) => (
      <div style={styles.bartenderDiv} key={bartender._id}>
        <span style={styles.beerLabel}>{bartender.nickname}</span>
        <Divider />
        <span style={styles.salesLabel}>{bartender.sales}</span>
      </div>
    ))
  }

  bartendersWrapper() {
    return (
      <div style={styles.root}>
      <GridList cols={4} >
        {this.showAllBartenders()}
      </GridList>
      </div>
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
        <TableBody stripedRows={false} displayRowCheckbox={false}>
          {this.showEachSale()}
        </TableBody>

      </Table>

      {/* D R A W E R */}
      <Drawer width={700} openSecondary={true} open={this.state.drawerOpen}
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
              <CardHeader
                title='EVENT'/>

            </Card>
            <Divider/>
            <Card style={styles.cardClearance}>
              <CardHeader
                title='BARTENDERS'/>

              <CardMedia children={this.bartendersWrapper()}>
              </CardMedia>

            </Card>
            <Divider/>
            <Card style={styles.cardClearance}>
              <CardHeader
                title='INVENTORY'/>
              <CardMedia children={this.inventoryWrapper()}>
              </CardMedia>

            </Card>
          </div>
      </Drawer>

      </div>
      </Mui>
    )
  }
}


SALES.propTypes = {
  sale: React.PropTypes.array,
  beers: React.PropTypes.array,
  bartenders: React.PropTypes.array
}

export default createContainer(()=> {
  return {
    sale: Sales.find().fetch().reverse(),
    beers: Beers.find().fetch(),
    bartenders: Bartenders.find().fetch()
  }
}, SALES)
