import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { GridList, GridTile } from 'material-ui/GridList'
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
/* C O L L E C T I O N S */
import { Bartenders } from '/collections/bartenders'
import { Beers } from '/collections/beers'
import { Shots } from '/collections/shots'
import { Mixes } from '/collections/mixes'
import { Cordials } from '/collections/cordials'
import { Wines } from '/collections/wines'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import Keyboard from 'material-ui/svg-icons/hardware/keyboard'
import IconButton from 'material-ui/IconButton'
import { styles } from './styles'
import TextField from 'material-ui/TextField'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import FaceIcon from 'material-ui/svg-icons/action/face'
import BeerIcon from 'material-ui/svg-icons/maps/local-drink'
import MixsIcon from 'material-ui/svg-icons/maps/local-bar'
import ShotsIcon from 'material-ui/svg-icons/social/whatshot'
import SodaIcon from 'material-ui/svg-icons/editor/bubble-chart'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'


import '../unicorn.css'

let activeBar = [] // Active Bartender List ( Logged In )

class POS extends Component {
	constructor(props) {
		super(props)

		this.state = {
      bartender: '0',
      category: 'beers',
      drawer: false,
      calculator: false,
      ct: '',
      change: '',
      itemsSold: '',
      completeSnack: false,
      snackSale: 0,
      snackChange: 0,
      checkoutStatus: false,
      lift: {visibility: 'hidden'},
			settingsDrawer: false,
      openLogIn: false,
      idInput: ''
    }

	}
	/* B A R T E N D E R S */
  showMeBartenders() {
    return this.props.bts.map((bt)=> (
      <Chip className="animated flipInX" style={
        this.state.bartender === bt.nickname ? styles.chipActive : styles.chip
      } key={bt._id} labelStyle={styles.chipLabel}>
        {/*<Avatar />*/}
        <span onClick={()=>this.who(bt.nickname)}>{bt.nickname}</span>
      </Chip>
    ))
  }
	/* B E E R S */
  showMeBeers() {
    let bartender = this.state.bartender
    return this.props.beers.map((beer)=> (
      <button
        className="button button-3d button-box button-jumbo animated flipInX"
        style={styles.beerButton}
        key={beer._id}
        onClick={() => this.handlePunch(beer._id, bartender, beer.name, beer.price, beer.type)
        }>

      <GridTile
				title={beer.type}
				actionIcon={<Chip>{beer.price}</Chip>}
				style={styles.gridTileCaption}>
				<img src={beer.img} style={styles.buttonImg}/>
			</GridTile>

      </button>
    ))
  }
	/* SHOTS */
	showMeShots() {
		let bartender = this.state.bartender
		return this.props.shots.map((shot)=> (
			<button
				className="button button-3d button-box button-jumbo animated flipInX"
				style={styles.beerButton}
				key={shot._id}
				onClick={() => this.handlePunch(shot._id, bartender, shot.name, shot.price, shot.type)
				}>
				<GridTile
					title={shot.name}
					actionIcon={<Chip>{shot.price}</Chip>}
					style={styles.gridTileCaption}>
					<img src={shot.img} style={styles.buttonImg}/>
				</GridTile>
			</button>
		))
	}
	/*M I X E S*/
	showMeMixes() {
		let bartender = this.state.bartender
		return this.props.mixes.map((mix)=> (
			<button
				className="button button-3d button-box button-jumbo animated flipInX"
				style={styles.beerButton}
				key={mix._id}
				onClick={() => this.handlePunch(mix._id, bartender, mix.name, mix.price, mix.type)
				}>
				<GridTile
					title={mix.name}
					actionIcon={<Chip>{mix.price}</Chip>}
					style={styles.gridTileCaption}></GridTile>
			</button>
		))
	}

	/* C O R D I A L S */
	showMeCordials() {
		let bartender = this.state.bartender
		return this.props.cordials.map((cordial)=> (
			<button
				className="button button-3d button-box button-jumbo animated flipInX"
				style={styles.beerButton}
				key={cordial._id}
				onClick={() => this.handlePunch(cordial._id, bartender, cordial.name, cordial.price, cordial.type)
				}>
				<GridTile
					title={cordial.name}
					actionIcon={<Chip>{cordial.price}</Chip>}
					style={styles.gridTileCaption}></GridTile>
			</button>
		))
	}
	/* W I N E S */
	showMeWines() {
		let bartender = this.state.bartender
		return this.props.wines.map((wine)=> (
			<button
				className="button button-3d button-box button-jumbo animated flipInX"
				style={styles.beerButton}
				key={wine._id}
				onClick={() => this.handlePunch(wine._id, bartender, wine.name, wine.price, wine.type)
				}>
				<GridTile
					title={wine.name}
					actionIcon={<Chip>{wine.price}</Chip>}
					style={styles.gridTileCaption}></GridTile>
			</button>
		))
	}

  showMeBasket() {
    return this.props.basket.map((item)=> (

      <MenuItem
        style={styles.menu}
        key={item._id}
        primaryText={<span>{item.item} &middot; <strong>{item.type}</strong></span>}
        secondaryText={'$ ' + item.price}
        onClick={()=> this.removeItem(item._id,item.price, item.id)} />
    ))
  }

  viewCategory() {

    switch(this.state.category){
    case 'beers':
    return this.showMeBeers()
    break
		case 'shots':
		return this.showMeShots()
		break
		case 'mixes':
		return this.showMeMixes()
		break
		case 'cordials':
		return this.showMeCordials()
		break
		case 'wine':
		return this.showMeWines()
		break
		case 'soda':
		return this.showMeSoda()
		break
    default:
    this.showMeBeers()

    }
  }
  removeItem(id,price,beerId) {
    Meteor.call('removeItemFromBasket', id)
    Session.setPersistent('totalAmount', Session.get('totalAmount') > 0 ? Session.get('totalAmount')-Number(price) : 0)
		//Session.setPersistent('returnTotalBasket', Session.get('returnTotalBasket') > 0 ? Session.get('returnTotalBasket')-Number(price) : 0)
		this.decrementBeerCount(beerId)
	}
  who(name) {
    this.setState({bartender: name})
    this.setState({completeSnack: false})
  }
  setCategory(cat) {
    this.setState({category: cat})
    this.setState({completeSnack: false})
  }
  logItems(item) {
    this.setState({itemsSold: this.state.itemsSold + item + ' '})
  }
	logEachSale(name, amount) {
		localStorage.setItem(name, Number(localStorage.getItem(name)) + amount)
	}
	clearItems() {
		this.setState({itemsSold: ''})
	}
	logBeerCount(id, value) {
		localStorage.setItem(id, Number(localStorage.getItem(id)) + value)
	}
	decrementBeerCount(id) {
		localStorage.setItem(id, Number(localStorage.getItem(id)) - 1)
	}
  calcTotal(price) {
    let p = Number(price).toFixed(2)
    Session.setPersistent('totalAmount', Session.get('totalAmount') + Number(p))
    //console.log(Session.get('totalAmount'))
  }




	updateBeerInStock() {
		for (let key in localStorage) {
			if (key.length === 17){
				Meteor.call('updateBeerCount', key, parseInt(localStorage.getItem(key)))
				console.log(localStorage.getItem(key), key)
				localStorage.setItem(key, 0)
			}
		}
	}
  closeDrawer() {
    this.setState({drawer: false})
    //console.log(Basket.find().count())
    Basket.find().count() !== 0  ? this.setState({lift: {visibility: 'visible'}}) : this.setState({lift: {visibility: 'hidden'}})

  }
  handlePunch(id, owner, item, price, type) {

    if(this.state.bartender !== '0'){
      this.calcTotal(price)
      this.setState({drawer: true})
      Meteor.call('insertBasket', id, owner, item, price, type)
      this.logItems(item)
			this.logBeerCount(id, 1)
    }
    this.setState({completeSnack: false})
  }
  openCalc(owner, amount) {
    if (Basket.find().count() !== 0) {
      this.setState({calculator: !this.state.calculator})
    }
  }
  checkout(owner, total, ct, ch, items) {
		Meteor.call('insertEachSale', owner, 'EVENT', total)
    this.setState({calculator: false})
    this.setState({snackSale: total})
    this.setState({snackChange: ch})
    this.closeDrawer()
    Meteor.call('insertSales', owner, total, ct, ch, items)
    Meteor.call('removeAllItemsFromBasket')
    Session.setPersistent('totalAmount', 0.00)

    Session.setPersistent('cashTendered', '')
    this.clearCalc()
    this.setState({completeSnack: true})
    this.setState({lift: {visibility: 'hidden'}})
		this.returnTotalSales()
		this.clearItems()
		this.logEachSale(owner, total)
		this.updateBeerInStock()
  }
  enterCashTendered(n) {
    this.setState({ct: this.state.ct + n}, function() {
      let change = Number(this.state.ct) - Number(Session.get('totalAmount'))
      console.log(change.toFixed(2))
      this.setState({change: change.toFixed(2)})
    })

    Session.get('cashTendered', this.state.ct)

  }
  showCashTendered(ct) {
    console.log(ct)
  }
  clearCalc() {
    this.setState({ct: ''})
    this.setState({change: ''})
  }
	returnTotalSales() {
		let totalSales = 0
		Sales.find().map((doc)=> {
			totalSales += doc.total
			Session.setPersistent('returnTotalSales', 'LIVE TOTAL SALES: $' + totalSales)
		})
	}
  handleLogin(){
    this.setState({idInput: '1'})
    console.log(this.state.idInput)
  }
	handleLoginPunch(n){
		if(this.state.idInput.length !== 4) {
			this.setState({idInput: this.state.idInput + n}, function(){
				console.log(this.state.idInput)
			})
		}
	}

	render() {

    const signInActions = [
			<FlatButton label="cancel" onClick={()=>this.handleLogin()}/>,
      <FlatButton label="login" onClick={()=>this.handleLogin()}/>
    ]

    Session.setDefault('totalAmount', 0)
    Session.setDefault('cashTendered', '')

		return (
			<div>
			<Card className="top-card">
				<Paper
					zDepth={2}
					children={<div className="brand-div animated fadeInDownBig">
          <a href="/admin"><Logo color={red400}/></a>
          NANOS

					</div>}/>
      {/* B A R T E N D E R S  bts1 */}
				<div style={styles.wrapper}>
					<span
            className="fa fa-sign-in fa-2x"
            style={styles.settings}
            onClick={()=>console.log('1')}></span>

          {this.showMeBartenders()}

					{/* DIALOG */}
          <Dialog
            title=""
            open={this.state.openLogIn}
            actions={signInActions}
            contentStyle={styles.loginContentStyle}>
	            <span style={styles.firstAttempt} className="fa fa-circle"></span>
							<span style={styles.idInput} className="fa fa-circle"></span>
							<span style={styles.idInput} className="fa fa-circle"></span>
							<span style={styles.idInput} className="fa fa-circle"></span>
						<br/>
            <Divider />
						<div style={styles.loginBtnDiv}>
	            <FlatButton label="7" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(7)}/>
							<FlatButton label="8" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(8)}/>
							<FlatButton label="9" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(9)}/>
							<FlatButton label="4" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(4)}/>
							<FlatButton label="5" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(5)}/>
							<FlatButton label="6" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(6)}/>
							<FlatButton label="1" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(1)}/>
							<FlatButton label="2" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(2)}/>
							<FlatButton label="3" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(3)}/>
							<FlatButton label="0" style={styles.loginButtons} onClick={()=> this.handleLoginPunch(0)}/>
						</div>
          </Dialog>

				</div>
			</Card>

			{/* S E T T I N G S */}
			<Drawer open={this.state.settingsDrawer} containerStyle={styles.settingsDrawerContainer} width={300}>
				<header style={styles.settingsHeader}>settings</header>
				<Divider />
				<MenuItem primaryText="Add Bartender" leftIcon={<FaceIcon color="#555"/>} style={styles.smenu} />
				<Divider/>
				<MenuItem primaryText="Add Beer" leftIcon={<BeerIcon color="#555"/>} style={styles.smenu} />
				<MenuItem primaryText="Add Mixes" leftIcon={<MixsIcon color="#555"/>} style={styles.smenu} />
				<MenuItem primaryText="Add Shots" leftIcon={<ShotsIcon color="#555"/>} style={styles.smenu} />
				<MenuItem primaryText="Add Wine" leftIcon={<MixsIcon color="#555"/>} style={styles.smenu} />
				<MenuItem primaryText="Add Soda" leftIcon={<SodaIcon color="#555"/>} style={styles.smenu} />
			</Drawer>
			{/* set1 */}
			<div>
        <Toolbar style={styles.tabs}>

        <ToolbarGroup className="animated fadeInLeft" firstChild={true}>
          <FlatButton labelStyle={styles.cat} label="BEER" onClick={()=> this.setCategory('beers') }/>
        </ToolbarGroup>

				<ToolbarGroup className="animated fadeInLeft" firstChild={true}>
          <FlatButton labelStyle={styles.cat} label="SHOTS" onClick={()=> this.setCategory('shots') }/>
        </ToolbarGroup>

        <ToolbarGroup className="animated fadeInLeft" >
          <FlatButton labelStyle={styles.cat} label="MIXES" onClick={()=> this.setCategory('mixes') }/>
        </ToolbarGroup>

				<ToolbarGroup className="animated fadeInLeft" >
          <FlatButton labelStyle={styles.cat} label="CORDIALS" onClick={()=> this.setCategory('cordials') }/>
        </ToolbarGroup>

        <ToolbarGroup className="animated fadeInLeft" lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="WINE" onClick={()=> this.setCategory('wine') }/>
        </ToolbarGroup>

        </Toolbar>
	    </div>

				<GridList cols={2} >
          <div className="items-div animated fadeIn">
            {this.viewCategory()}
          </div>
          <div className="cashier-div">
          </div>
        </GridList>

        <Drawer
          width={400}
          openSecondary={true}
          open={this.state.drawer}
          containerStyle={styles.drawer}>

          <AppBar
            title={'$ ' + Number(Session.get('totalAmount')).toFixed(2)}
            style={styles.drawerAppBar}
            showMenuIconButton={true}
            titleStyle={styles.drawerTitle}
            iconElementLeft={<IconButton onClick={()=> this.openCalc()}><Keyboard/></IconButton>}
            iconElementRight={<IconButton onClick={()=> this.closeDrawer()}><ArrowRight/></IconButton>}

            zDepth={3} />
            {this.showMeBasket()}
            <Divider/>
        </Drawer>
        <Drawer width={340} open={this.state.calculator} openSecondary={true} containerStyle={styles.calculator}>
          <div className="calc-top-div">
            <MenuItem primaryText="Cash Tendered" secondaryText={'$ ' + this.state.ct} style={styles.calcItem_1}/>
            <Divider/>
            <MenuItem primaryText="Change" secondaryText={this.state.change} style={styles.calcItem_2}/>
          </div>
          <div className="calc-mid-div">
            <FlatButton label='1' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('1')}/>
            <FlatButton label='2' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('2')}/>
            <FlatButton label='3' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('3')}/>
            <FlatButton label='4' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('4')}/>
            <FlatButton label='5' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('5')}/>
            <FlatButton label='6' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('6')}/>
            <FlatButton label='7' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('7')}/>
            <FlatButton label='8' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('8')}/>
            <FlatButton label='9' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('9')}/>
            <FlatButton label='0' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('0')}/>
            <FlatButton label='.' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.enterCashTendered('.')}/>
            <FlatButton label='clear' labelStyle={styles.calcClear} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.clearCalc()}/>
          </div><br/>

          <RaisedButton
            label='checkout'
            primary={true}
            fullWidth={true}
            labelStyle={styles.checkout}
            disabled={this.state.change < 0 || this.state.change == this.state.ct ? true : false}
            onClick={
              ()=> this.checkout(
                this.state.bartender,
                Number(Session.get('totalAmount').toFixed(2)),
                this.state.ct,
                this.state.change,
                this.state.itemsSold)
              }/>

        </Drawer>

      {/* S N A C K B A R */}

      <Snackbar
        open={this.state.completeSnack}
        message={'SALE COMPLETE : '+' $ '  + Number(this.state.snackSale).toFixed(2) + ' | CHANGE : $ ' + Number(this.state.snackChange).toFixed(2)}
        autoHideDuration={5000}
        bodyStyle={styles.snackBody}
        contentStyle={styles.snackContent}
      />

      {/*L I F T - F O L D E R*/}

      <div className="lift" style={this.state.lift}></div>
        <IconButton  style={{
          position: 'absolute',
          top: '9px',
          right: 0,
          visibility: this.state.lift == {visibility: 'hidden'} ? 'hidden' : 'visible'
        }} onClick={()=> this.setState({drawer: true})}><ArrowLeft/></IconButton>
			</div>
		)
	}
}

POS.propTypes = {
  bts: React.PropTypes.array,
  beers: React.PropTypes.array,
  basket: React.PropTypes.array,
	shots: React.PropTypes.array,
	mixes: React.PropTypes.array,
	cordials: React.PropTypes.array,
	wines: React.PropTypes.array,
};

export default createContainer(()=> {
  return {
    bts: Bartenders.find({status: 'active'}).fetch(),
    beers: Beers.find({mode: 'active'}).fetch(),
    basket: Basket.find().fetch(),
		shots: Shots.find().fetch(),
		mixes: Mixes.find().fetch(),
		cordials: Cordials.find().fetch(),
		wines: Wines.find().fetch(),
  }
}, POS)
