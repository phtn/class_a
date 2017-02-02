import React, { Component } from 'react'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'
import {Tabs, Tab} from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'


import { styles } from './config.style'


import AddBartender from './config/bartender.config'
import AddBeer from './config/beer.config'
import AddShot from './config/shot.config'
import AddMix from './config/mix.config'
import AddCordial from './config/cordial.config'
import AddWine from './config/wine.config'

Meteor.subscribe('showBartenders')
Meteor.subscribe('showBeers')
Meteor.subscribe('showShots')
Meteor.subscribe('showMixes')
Meteor.subscribe('showCordials')
Meteor.subscribe('showWines')
Meteor.subscribe('showBasket')
Meteor.subscribe('showSales')


class Config extends Component {
	constructor(props){
		super(props)
		this.state = {
			comp: 'bartender'
		}
	}

	renderThis( component ){
		switch(component){
			case 'bartender': {
				return <AddBartender />
			}
			case 'beer': {
				return <AddBeer />
			}
			case 'shot': {
				return <AddShot />
			}
			case 'mix': {
				return <AddMix />
			}
			case 'cordial': {
				return <AddCordial />
			}
			case 'wine': {
				return <AddWine />
			}
		}
	}

	render(){
		return(
			<Mui muiTheme={getMuiTheme(dark)}>
			<div>
				<header style={styles.header}>Configuration Page</header>
				<Tabs>
					<Tab label="bartender" onClick={()=>this.setState({comp: 'bartender'})}/>
					<Tab label="beer" onClick={()=>this.setState({comp: 'beer'})}/>
					<Tab label="shot" onClick={()=>this.setState({comp: 'shot'})}/>
					<Tab label="mix" onClick={()=>this.setState({comp: 'mix'})}/>
					<Tab label="cordial" onClick={()=>this.setState({comp: 'cordial'})}/>
					<Tab label="wine" onClick={()=>this.setState({comp: 'wine'})}/>
					<Tab label="soda" onClick={()=>this.setState({comp: 'soda'})}/>
				</Tabs>
					<div style={styles.compDiv}>
						{this.renderThis(this.state.comp)}
					</div>
			</div>
			</Mui>
		)
	}
}
export default Config
