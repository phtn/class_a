import { Meteor } from 'meteor/meteor';
import { Bartenders } from '/collections/bartenders'
import { Beers } from '/collections/beers'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'
import { Events } from '/collections/events'
import { Wines } from '/collections/wines'

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
        qty: parseInt(qty),
        img: img,
        cost: 1.50,
        sold: 0,
        inStock: parseInt(qty),
        createdAt: d.toLocaleString()
      })
      return beers
    },

    insertWines(wine, type, cat, price, qty) {
      const d = new Date()
      const wines = Wines.insert({
        name: wine,
        price: price,
        type: type,
        cat: cat,
        qty: parseInt(qty),
        inStock: parseInt(qty),
        createdAt: d.toLocaleString()
      })
      return wines
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
    removeAllSales() {
      Sales.remove({})
    },
    removeItemFromBasket(id) {
      Basket.remove({_id: id})
    },
    removeAllItemsFromBasket() {
      Basket.remove({})
    },
    updateBeerCount(id, count) {
      const beerCountUpdate = Beers.update({_id: id}, {
        $inc: {
          inStock: -(parseInt(count))
        }
      })
      return beerCountUpdate
    }
  })
});
