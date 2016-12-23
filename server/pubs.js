import { Meteor } from 'meteor/meteor'
import { Bartenders } from '../collections/bartenders'
import { Beers } from '../collections/beers'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'

Meteor.publish('showBartenders', ()=> {
    return Bartenders.find()
})

Meteor.publish('showBeers', ()=> {
    return Beers.find()
})
Meteor.publish('showBasket', ()=> {
    return Basket.find()
})
Meteor.publish('showSales', ()=> {
    return Sales.find()
})
