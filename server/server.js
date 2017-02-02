import { Meteor } from 'meteor/meteor';
import { Bartenders } from '/collections/bartenders'
import { Beers } from '/collections/beers'
import { Shots } from '/collections/shots'
import { Mixes } from '/collections/mixes'
import { Cordials } from '/collections/cordials'
import { Wines } from '/collections/wines'
import { Basket } from '/collections/basket'
import { Sales } from '/collections/sales'
import { Events } from '/collections/events'


Meteor.startup(() => {
  Meteor.methods({
    insertBartender(name) {
      const d = new Date()
      const bartender = Bartenders.insert({
        nickname: name,
        status: 'Inactive',
        mode: '',
        createAt: d.toLocaleString()
      })
      return bartender
      console.log('test')
    },

    insertBeer(beer, price, type, qty) {
      const d = new Date()
      const beers = Beers.insert({
        name: beer,
        price: price,
        type: type,
        qty: parseInt(qty),
        img: '',
        cost: 1.50,
        sold: 0,
        inStock: parseInt(qty),
        createdAt: d.toLocaleString()
      })
      return beers
    },
    /* SHOTS */
    insertShot(shot, price, type, qty) {
      const d = new Date()
      const shots = Shots.insert({
        name: shot,
        price: price,
        type: type,
        qty: parseInt(qty),
        inStock: parseInt(qty),
        img: '',
        createdAt: d.toLocaleString()
      })
      return shots
    },
    /* MIXES */
    insertMix(mix, price, type, qty) {
      const d = new Date()
      const mixes = Mixes.insert({
        name: mix,
        price: price,
        type: type,
        qty: parseInt(qty),
        cost: 1.50,
        status: '',
        note: '',
        inStock: parseInt(qty),
        img: '',
        createdAt: d.toLocaleString(),
        updatedAt: d.toLocaleString()
      })
      return mixes
    },
    /* CORDIALS */
    insertCordial(cordial, price, type, qty) {
      const d = new Date()
      const cordials = Cordials.insert({
        name: cordial,
        price: price,
        type: type,
        qty: parseInt(qty),
        cost: 1.50,
        status: '',
        note: '',
        inStock: parseInt(qty),
        img: '',
        createdAt: d.toLocaleString(),
        updatedAt: d.toLocaleString()
      })
      return cordials
    },
    /* WINES */
    insertWine(wine, price, type, cat, qty) {
      const d = new Date()
      const wines = Wines.insert({
        name: wine,
        price: price,
        type: type,
        cat: cat,
        qty: parseInt(qty),
        status: '',
        note: '',
        mode: '',
        inStock: parseInt(qty),
        createdAt: d.toLocaleString()
      })
      return wines
    },

    insertBasket(id, owner, item, price, type) {
      const d = new Date()
      const basket = Basket.insert({
        id: id,
        owner: owner,
        item: item,
        price: parseInt(price),
        type: type,
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

    insertEachSale(id, eventName, amount) {
      const d = new Date()
      const eachSale = Bartenders.update({nickname: id},
          {
            $inc: { totalSale: amount},
            $set: {
              eventName: eventName,
              updatedAt: d.toLocaleString()
            }
          }

      )
      return eachSale
    },

    insertStatus(){
      const modeSet = Shots.update({cost: 1.5}, {
        $set: {
          mode: ''
        }
      }, { multi: true })
      return modeSet
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
