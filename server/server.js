import { Meteor } from 'meteor/meteor';
import { Bartenders } from '/collections/bartenders'
import { Beers } from '/collections/beers'
import { Basket } from '/collections/basket'

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
    },

    insertBeer(beer, price, type, qty) {
      const d = new Date()
      const beers = Beers.insert({
        name: beer,
        price: price,
        type: type,
        qty: qty,
        createAt: d.toLocaleString()
      })
      return beers
    },

    insertBasket(id, owner, item, price) {
      const d = new Date()
      const basket = Basket.insert({
        id: id,
        owner: owner,
        item: item,
        price: price,
        createAt: d.toLocaleString()
      })
      return basket
    },
    removeItemFromBasket(id) {
      Basket.remove({_id: id})
    }
  })
});
