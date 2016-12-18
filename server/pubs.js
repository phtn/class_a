import { Meteor } from 'meteor/meteor'
import { Bartenders } from '../collections/bartenders'

Meteor.publish('showBartenders', ()=> {
    return Bartenders.find()
})
