import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
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
import Keyboard from 'material-ui/svg-icons/hardware/keyboard'
import IconButton from 'material-ui/IconButton'
import { styles } from './styles'
import TextField from 'material-ui/TextField'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import Snackbar from 'material-ui/Snackbar'

import '../unicorn.css'

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
      lift: {visibility: 'hidden'}
    }
    this.timer = undefined
	}
  componentWilUnMount() {
    clearTimeout(this.timer)
  }
  showMeBartenders() {

    return this.props.bts.map((bt)=> (
      <Chip style={
        this.state.bartender === bt.nickname ? styles.chipActive : styles.chip
      } key={bt._id} labelStyle={styles.chipLabel}>
        {/*<Avatar />*/}
        <span onClick={()=>this.who(bt.nickname)}>{bt.nickname}</span>
      </Chip>
    ))

  }

  showMeBeers() {
    let bartender = this.state.bartender
    return this.props.beers.map((beer)=> (
      <button
        className="button button-3d button-box button-jumbo"
        style={{minHeight: '150px',
                minWidth: '150px',
                margin: 5,
                marginBottom: 13,
                backgroundColor: '#fff'
              }}
        key={beer._id}
        onClick={() => this.handlePunch(beer._id, bartender, beer.name, beer.price)
        }>
        <img style={styles.beerButtons} src={beer.img} />
      </button>

    ))

  }

  showMeBasket() {
    return this.props.basket.map((item)=> (

      <MenuItem
        style={styles.menu}
        key={item._id}
        primaryText={item.item}
        secondaryText={'$ ' + item.price}
        onClick={()=> this.removeItem(item._id,item.price)} />
    ))
  }

  viewCategory() {

    switch(this.state.category){
    case 'beers':
    return this.showMeBeers()
    break
    default:
    this.showMeBeers()

    }
  }


  removeItem(id,price) {
    Meteor.call('removeItemFromBasket', id)
    Session.setPersistent('totalAmount', Session.get('totalAmount') > 0 ? Session.get('totalAmount')-Number(price) : 0)
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
    this.setState({itemsSold: this.state.itemsSold + item + ', '})
  }
  calcTotal(price) {
    let p = Number(price).toFixed(2)
    Session.setPersistent('totalAmount', Session.get('totalAmount') + Number(p))
    console.log(Session.get('totalAmount'))
  }
  closeDrawer() {
    this.setState({drawer: false})
    console.log(Basket.find().count())
    Basket.find().count() !== 0  ? this.setState({lift: {visibility: 'visible'}}) : this.setState({lift: {visibility: 'hidden'}})

  }
  handlePunch(id, owner, item, price) {
    if(this.state.bartender !== '0'){
      this.calcTotal(price)
      this.setState({drawer: true})
      Meteor.call('insertBasket', id, owner, item, price)
      this.logItems(item)
    }
    this.setState({completeSnack: false})
  }
  openCalc(owner, amount) {
    if (Basket.find().count() !== 0) {
      this.setState({calculator: !this.state.calculator})
    }
  }
  checkout(owner, total, ct, ch, items) {
    this.setState({calculator: false})
    this.setState({snackSale: total})
    this.setState({snackChange: ch})
    this.closeDrawer()
    Meteor.call('insertSales', owner, total, ct, ch, items)
    Meteor.call('removeAllItemsFromBasket')
    Session.setPersistent('totalAmount', 0.00)

    Session.set('cashTendered', '')
    this.clearCalc()
    this.setState({completeSnack: true})
    this.setState({lift: {visibility: 'hidden'}})

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
	render() {

    Meteor.subscribe('showBartenders')
    Meteor.subscribe('showBasket')
    Meteor.subscribe('showSales')
    Session.setDefault('totalAmount', 0)
    Session.setDefault('cashTendered', '')

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
          <FlatButton labelStyle={styles.cat} label="BEER" onClick={()=> this.setCategory('beers') }/>
        </ToolbarGroup>

        <ToolbarGroup >
          <FlatButton labelStyle={styles.cat} label="COCKTAILS" secondary={true} onClick={()=> this.setCategory('cocktails') }/>
        </ToolbarGroup>

        <ToolbarGroup lastChild={true}>
          <FlatButton labelStyle={styles.cat} label="WINE" secondary={true} onClick={()=> this.setCategory('wine') }/>
        </ToolbarGroup>

        </Toolbar>
	    </div>

				<GridList cols={2} >
          <div className="items-div">
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
            showMenuIconButton={true}
            titleStyle={styles.drawerTitle}
            iconElementLeft={<IconButton onClick={()=> this.openCalc()}><Keyboard/></IconButton>}
            iconElementRight={<IconButton onClick={()=> this.closeDrawer()}><ArrowRight/></IconButton>}

            zDepth={3}
            />
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
  basket: React.PropTypes.array
};

export default createContainer(()=> {
  return {
    bts: Bartenders.find().fetch(),
    beers: Beers.find().fetch(),
    basket: Basket.find().fetch()
  }
}, POS)
