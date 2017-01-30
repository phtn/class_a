import { Meteor } from 'meteor/meteor'
import { Bartenders } from '../collections/bartenders'
import { Beers } from '../collections/beers'
import { Shots } from '../collections/shots'
import { Mixes } from '/collections/mixes'
import { Wines } from '/collections/wines'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'

Meteor.publish('showBartenders', ()=> {
    return Bartenders.find()
})

Meteor.publish('showBeers', ()=> {
    return Beers.find()
})
Meteor.publish('showMixes', ()=> {
    return Mixes.find()
})
Meteor.publish('showShots', ()=> {
    return Shots.find()
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
