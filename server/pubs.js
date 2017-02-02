import { Meteor } from 'meteor/meteor'
import { Bartenders } from '../collections/bartenders'
import { Beers } from '../collections/beers'
import { Shots } from '../collections/shots'
import { Mixes } from '/collections/mixes'
import { Cordials } from '/collections/cordials'
import { Wines } from '/collections/wines'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'

Meteor.publish('showBartenders', ()=> {
    return Bartenders.find()
})

Meteor.publish('showBeers', ()=> {
    return Beers.find({mode: 'active'})
})
Meteor.publish('showShots', ()=> {
    return Shots.find()
})
Meteor.publish('showMixes', ()=> {
    return Mixes.find()
})
Meteor.publish('showCordials', ()=> {
    return Cordials.find()
})
Meteor.publish('showWines', ()=> {
    return Wines.find()
})
Meteor.publish('showBasket', ()=> {
    return Basket.find()
})
Meteor.publish('showSales', ()=> {
    return Sales.find()
})
Meteor.publish('showEachSale', (id)=> {
    return Sales.find({_id: id})
})
