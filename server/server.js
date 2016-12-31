import { Meteor } from 'meteor/meteor';
import { Bartenders } from '/collections/bartenders'
import { Beers } from '/collections/beers'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'
import { Events } from '/collections/events'

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

    insertBeer(beer, price, type, qty, img) {
      const d = new Date()
      const beers = Beers.insert({
        name: beer,
        price: price,
        type: type,
        qty: qty,
        img: img,
        createdAt: d.toLocaleString()
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
        status: 'NOT_PAID',
        createdAt: d.toLocaleString()
      })
      return basket
    },
    insertSales(owner, total, ct, ch, items) {
      const d = new Date()
      const sales = Sales.insert({
        owner: owner,
        total: total,
        ct: ct,
        ch: ch,
        items: items,
        createdAt: d.toLocaleString(),
        updatedAt: d.toLocaleString()
      })
      return sales
    },
    insertEvent(eventName, date) {
      const d = new Date()
      const events = Events.insert({
        eventName: eventName,
        date: date,
        createdAt: d.toLocaleString(),
        updatedAt: d.toLocaleString(),
      })
      return events
    },
    removeItemFromBasket(id) {
      Basket.remove({_id: id})
    },
    removeAllItemsFromBasket() {
      Basket.remove({})
    }
  })
});
