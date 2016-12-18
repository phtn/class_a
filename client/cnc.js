import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

class Cnc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }
  handleSwipe(value) {
    this.setState({
      slideIndex: value
    })
  }
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Offices" value={0}/>
          <Tab label="Stores" value={1}/>
          <Tab label="Restaurants" value={2}/>
          <Tab label="Apartments" value={3}/>
        </Tabs>


      </div>
    )
  }
}
export default Cnc
