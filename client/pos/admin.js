import React, { Component } from 'react'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Logo from 'material-ui/svg-icons/av/subtitles'
import {red400} from 'material-ui/styles/colors';
import { GridList } from 'material-ui/GridList'
import { createContainer } from 'meteor/react-meteor-data'
import { Bartenders } from '/collections/bartenders'
import Chip from 'material-ui/Chip'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import './pos.css'


const panelStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}

class Admin extends Component {
  constructor(props) {
    super(props)
  }
  showMeBartenders() {
    return this.props.bts.map((bt)=> (
      <TableRow key={bt._id}>
        <TableRowColumn>{bt.item}</TableRowColumn>
        <TableRowColumn>{bt.nickname}</TableRowColumn>
        <TableRowColumn>{bt.status}</TableRowColumn>
        <TableRowColumn>{bt.sales}</TableRowColumn>
      </TableRow>
    ))
  }
  render() {
    Meteor.subscribe('showBartenders')

    return (
      <Mui muiTheme={getMuiTheme(dark)}>
        <div>
        <Card className="top-card">
          <Paper
            zDepth={2}
            children={<div className="brand-div">
            <a href="/admin/addbt"><Logo color={red400}/></a>ADMIN</div>}/>
        </Card>

        <div  style={panelStyles.root} >
          <Card className="bartender-panel" zDepth={0}>
          <Table fixedFooter={true} fixedHeader={true}>
            <TableHeader zDepth={2}>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                  <TableHeaderColumn>Sales</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>


                {this.showMeBartenders()}


            </TableBody>
          </Table>


          </Card>

          <Card className="sales-panel" zDepth={0}></Card>

        </div>

        </div>
      </Mui>

    )
  }
}



    Admin.propTypes = {
    	bts: React.PropTypes.array
    };

    export default createContainer(()=> {
    	return {
    		bts: Bartenders.find().fetch()
    	}
    }, Admin)
