import React, { Component } from 'react'
import Mui from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import dark from 'material-ui/styles/baseThemes/darkBaseTheme'
import { styles } from './config.style'

class Config extends Component {
	render(){
		return(
			<Mui muiTheme={getMuiTheme(dark)}>
			<div>
				<header style={styles.header}>Configuration</header>
			</div>
			</Mui>
		)
	}
}
export default Config