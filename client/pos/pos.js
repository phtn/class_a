import React, { Component } from 'react'
import { GridList } from 'material-ui/GridList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Logo from 'material-ui/svg-icons/av/subtitles'
import {red400} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton'
import { createContainer } from 'meteor/react-meteor-data'
import { Bartenders } from '/collections/bartenders'


const styles = {
  chip: {
    margin: 4,
    backgroundColor: '#111'
  },
  wrapper: {
  	marginTop: '10px',
  	marginBottom: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  header: {
  	fontFamily: 'Quicksand' ,
  	fontSize: '40px',
  	fontWeight: 700
  },
  tabs: {
  	backgroundColor: '#333 !important',
  	margin: 4
  },
  cat: {
  	fontFamily: 'Poppins, sans-serif',
  	fontWeight: 700,
  	fontSize: '1em !important',
  	color: '#333 !important'
  }
}

class POS extends Component {
	constructor(props) {
		super(props)
	}
  showMeBartenders() {
    return this.props.bts.map((bt)=> (
      <Chip style={styles.chip} key={bt._id}>
        <Avatar />
        <span className="bm-name">{bt.nickname}</span>
      </Chip>
    ))
  }
	render() {
    Meteor.subscribe('showBartenders')
		return (
			<div>
			<Card className="top-card">
				<Paper
					zDepth={2}
					children={<div className="brand-div">
          <a href="/admin"><Logo color={red400}/></a>
          NANOS</div>}/>



				<div style={styles.wrapper}>
					{this.showMeBartenders()}
				</div>

			</Card>

			<div>
        <Toolbar style={styles.tabs}>

        <ToolbarGroup firstChild={true}>
          <FlatButton labelStyle={styles.cat} label="Tap" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton labelStyle={styles.cat} label="Bottle" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="shots" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="mix" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="wine" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="soda" secondary={true}/>
        </ToolbarGroup>

        </Toolbar>
	    </div>


				<GridList cols={4} >
					<Card className="cards" id="corona">
						<span className="item-header">1</span>
					</Card>
					<Card className="cards">
						<span className="item-header">2</span>
					</Card>
					<Card className="cards">
						<span className="item-header">3</span>
					</Card>
					<Card className="cards">
						<span className="item-header">4</span>
					</Card>
					<Card className="cards">
						<span className="item-header">5</span>
					</Card>
				</GridList>
			</div>
		)
	}
}

POS.propTypes = {
  bts: React.PropTypes.array
};

export default createContainer(()=> {
  return {
    bts: Bartenders.find().fetch()
  }
}, POS)
