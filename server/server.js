import { Meteor } from 'meteor/meteor';
import { Bartenders } from '/collections/bartenders'

Meteor.startup(() => {
  Meteor.methods({
    insertBartender(name) {
      const d = new Date()
      const bartender = Bartenders.insert({
        item: Bartenders.find().count() + 1,
        nickname: name,
        status: 'Active',
        sales: '$100.00',
        createAt: d.toLocaleString()
      })
      return bartender
    }
  })
});
