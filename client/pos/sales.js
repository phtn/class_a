import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import { Sales } from '/collections/sales'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import light from 'material-ui/styles/baseThemes/lightBaseTheme'
import AppBar from 'material-ui/AppBar'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'

Meteor.subscribe('showSales')


const styles = {
  thead: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500
  },
  invDiv: {
    //display: 'inline',
    margin: 20,
    textAlign: 'center'
  },
  pbar: {
    transform: 'rotate(270deg)',
    height: '30px',
    width: '40px',
    display: 'block',
    margin: '10px auto'
  },
  beerLabel: {
    fontSize: '12px',
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  hr: {
    width: '100%'
  }
}

class SALES extends Component {
  constructor(props){
    super(props)
    this.state = {
      drawerOpen: false,

    }
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
  pullMenuButton() {
    return (
      <IconButton onClick={()=>this.handleDrawerToggle()}><ArrowLeft/></IconButton>
    )
  }
  handleRemoveAll() {
    Meteor.call('removeAllSales')
  }
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
  showInventory() {
    return (
      <div style={styles.root}>
      <GridList cols={4} >
        <div style={styles.invDiv}>
          <LinearProgress mode='determinate' value={80} style={styles.pbar}/>
          <span style={styles.beerLabel}>CORONA</span>
          <hr style={styles.hr}/>
          32 / 100
        </div>
        <div style={styles.invDiv}>
          <LinearProgress mode='determinate' value={90} style={styles.pbar}/>
          <span style={styles.beerLabel}>HEINEKEN</span>
          <hr/>
          45
        </div>
        <div style={styles.invDiv}>
          <LinearProgress mode='determinate' value={40} style={styles.pbar}/>
          <span style={styles.beerLabel}>MILLER LITE </span>
          <hr/>
          6
        </div>
        <div style={styles.invDiv}>
          <LinearProgress mode='determinate' value={40} style={styles.pbar}/>
          <span style={styles.beerLabel}>BUD LIGHT </span>
          <hr/>
          98
        </div>
        <div style={styles.invDiv}>
          <LinearProgress mode='determinate' value={40} style={styles.pbar}/>
          <span style={styles.beerLabel}>BUD LIGHT </span>
          <hr/>
          98
        </div>
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
        zDepth={1}/>

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

      </Table>

      {/* D R A W E R */}
      <Drawer width={700} openSecondary={true} open={this.state.drawerOpen}>
        <AppBar
          title='General Summary'
          showMenuIconButton={false}
          onTitleTouchTap={()=>this.handleDrawerToggle()}
          zDepth={3}/>
          <div>
            <Card>
              <CardHeader
                title='EVENT'/>

            </Card>
            <Divider/>
            <Card>
              <CardHeader
                title='BARTENDERS'/>

            </Card>
            <Divider/>
            <Card>
              <CardHeader
                title='INVENTORY'/>
              <CardMedia children={this.showInventory()}>
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
  sale: React.PropTypes.array
}

export default createContainer(()=> {
  return {
    sale: Sales.find().fetch().reverse()
  }
}, SALES)
