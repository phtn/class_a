import { Meteor } from 'meteor/meteor'
import { Bartenders } from '../collections/bartenders'
import { Beers } from '../collections/beers'

Meteor.publish('showBartenders', ()=> {
    return Bartenders.find()
})

Meteor.publish('showBeers', ()=> {
    return Beers.find()
})
