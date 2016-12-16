import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
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

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlide}
        >
          <div>
            <h2>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div>
            slide n°2
          </div>
          <div>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    )
  }
}
export default Cnc
