import React, { Component } from 'react'
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

class POS extends Component {
	constructor(props) {
		super(props)
    this.state = {
      bartender: '0',
      drawer: false,
      calculator: false
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
          this.test(beer.price)
          this.openDrawer()
          this.handlePunch(beer._id, bartender, beer.name, beer.price)
          }
        }
      />
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

  removeItem(id,price) {
    Meteor.call('removeItemFromBasket', id)
    Session.set('totalAmount', Session.get('totalAmount')-Number(price) || 0)
  }
  who(name) {
    this.setState({bartender: name})
  }
  test(price) {
    let p = Number(price).toFixed(2)
    Session.set('totalAmount', Session.get('totalAmount')+Number(p))
    console.log(Session.get('totalAmount'))
  }
  closeDrawer() {
    this.setState({drawer: false})
    Meteor.call('removeAllItemsFromBasket')
    Session.set('totalAmount', 0.00)
  }
  openDrawer() {
    if(this.state.bartender !== '0'){
      this.setState({drawer: true})
    }
  }
  handlePunch(id, owner, item, price) {
    Meteor.call('insertBasket', id, owner, item, price)
  }
  handlePayment(owner, amount) {
    Meteor.call('insertSales', owner, amount)
    console.log(owner+amount)

    this.setState({calculator: true})
  }
  closeCalculator() {
    this.setState({calculator: false})
    Meteor.call('removeAllItemsFromBasket')
    Session.set('totalAmount', 0)
  }
  returnCashTendered(n) {
    Session.set('cashTendered', Session.get('cashTendered') + n)
    console.log(Session.get('cashTendered'))
  }
  showCashTendered() {
    Session.get('cashTendered')
  }
  clearCalc() {
    Session.set('cashTendered', '')
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

        <Drawer
          width={400}
          openSecondary={true}
          open={this.state.drawer}
          containerStyle={styles.drawer}>

          <AppBar
            title={'$ ' + Number(Session.get('totalAmount')).toFixed(2)}
            showMenuIconButton={true}
            titleStyle={styles.drawerTitle}
            iconElementLeft={<IconButton onClick={()=> this.handlePayment(this.state.bartender,Number(Session.get('totalAmount')).toFixed(2))}><Keyboard/></IconButton>}
            zDepth={3}
            />
            {this.showMeBasket()}
            <Divider/>
          {/*<RaisedButton label="CHECKOUT" onClick={()=> this.closeDrawer()} fullWidth={true}/>*/}
        </Drawer>
        <Drawer width={305} open={this.state.calculator} openSecondary={true} containerStyle={styles.calculator}>
          <div className="calc-top-div">
            <MenuItem primaryText="Cash Tendered" secondaryText={Session.get('cashTendered')}/>
            <span className="cash-change">{Session.get('cashChange')}</span>
          </div>
          <div className="calc-mid-div">
            <FlatButton label='1' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('1')}/>
            <FlatButton label='2' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('2')}/>
            <FlatButton label='3' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('3')}/>
            <FlatButton label='4' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('4')}/>
            <FlatButton label='5' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('5')}/>
            <FlatButton label='6' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('6')}/>
            <FlatButton label='7' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('7')}/>
            <FlatButton label='8' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('8')}/>
            <FlatButton label='9' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('9')}/>
            <FlatButton label='0' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('0')}/>
            <FlatButton label='.' labelStyle={styles.calcLabel} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.returnCashTendered('.')}/>
            <FlatButton label='clear' labelStyle={styles.calcClear} hoverColor="none" rippleColor='red' style={styles.calcButtons} onClick={()=> this.clearCalc()}/>
          </div><br/>
          <RaisedButton label='checkout' primary={true} fullWidth={true} labelStyle={styles.checkout} onClick={()=> this.closeCalculator()}/>
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
