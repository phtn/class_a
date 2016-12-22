import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
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
import { Beers } from '/collections/beers'
import { Basket } from '/collections/basket'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'

const styles = {
  chip: {
    margin: 4,
    backgroundColor: '#111',
  },
  chipActive: {
    margin: 4,
    backgroundColor: '#00a78e',
  },
  chipLabel: {
    fontFamily: 'Quicksand',
    fontSize: '1.5em'
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
  	margin: 4,
    width: '40%',
  },
  cat: {
  	fontFamily: 'Poppins, sans-serif',
  	fontWeight: 700,
  	fontSize: '1em !important',
  	color: '#333 !important'
  },
  punch: {
    fontFamily: 'Quicksand',
    fontWeight: 700,
    height: '100px',
    width: '150px',
    margin: 4
  },
  ripple: {
    color: '#000'
  },
  corona: {
    color: '#2b82ad',
    fontSize: '1em',
    fontFamily: 'Poppins'
  },
  gridlist: {
    width: '150%'
  }
}
class POS extends Component {
	constructor(props) {
		super(props)
    this.state = {
      bartender: '0',
      drawer: false,
    }
	}
  showMeBartenders() {

    return this.props.bts.map((bt)=> (
      <Chip style={
        this.state.bartender === bt._id ? styles.chipActive : styles.chip
      } key={bt._id} labelStyle={styles.chipLabel}>
        {/*<Avatar />*/}
        <span onClick={()=>this.who(bt._id)}>{bt.nickname}</span>
      </Chip>
    ))

  }

  showMeBeers() {
    let bartender = this.state.bartender
    return this.props.beers.map((beer)=> (
      <RaisedButton key={beer._id}
        label={beer.name}
        backgroundColor='#eee'
        labelStyle={styles.corona}
        rippleStyle={styles.ripple}
        buttonStyle={styles.punch}
        onClick={()=>{
          console.log(bartender)
          this.openDrawer()
          this.handlePunch(beer._id, bartender, beer.name, beer.price)
          }
        }
      />
    ))

  }

  showMeBasket() {
    return this.props.basket.map((item)=> (
      <MenuItem key={item._id} primaryText={item.item} secondaryText={'$ ' + item.price} onClick={this.removeItem(item._id)}/>
    ))
  }
  removeItem(id) {
    Meteor.call('removeItemFromBasket', id)
  }
  who(name) {
    this.setState({bartender: name})
  }
  test() {
    console.log(this.state.bartender)
  }
  closeDrawer() {
    this.setState({drawer: false})
    console.log('close test')
  }
  openDrawer() {
    if(this.state.bartender !== '0'){
      this.setState({drawer: true})
    }
  }
  handlePunch(id, owner, item, price) {
    Meteor.call('insertBasket', id, owner, item, price)
  }

	render() {

    Meteor.subscribe('showBartenders')
    Meteor.subscribe('showBasket')
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
          <FlatButton labelStyle={styles.cat} label="BEER" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup >
          <FlatButton labelStyle={styles.cat} label="COCKTAILS" secondary={true}/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="WINE" secondary={true}/>
        </ToolbarGroup>

        </Toolbar>
	    </div>


				<GridList cols={2} >
          <div className="items-div">

            {this.showMeBeers()}



          </div>
          <div className="cashier-div">
          </div>
        </GridList>

        <Drawer width={400} openSecondary={true} open={this.state.drawer}>
          <AppBar title="Drawer" showMenuIconButton={false}/>
            {this.showMeBasket()}
            <Divider/>
          <RaisedButton label="CHECKOUT" onClick={()=> this.closeDrawer()}/>
        </Drawer>
			</div>
		)
	}
}

POS.propTypes = {
  bts: React.PropTypes.array,
  beers: React.PropTypes.array,
  basket: React.PropTypes.array
};

export default createContainer(()=> {
  return {
    bts: Bartenders.find().fetch(),
    beers: Beers.find().fetch(),
    basket: Basket.find().fetch()
  }
}, POS)
