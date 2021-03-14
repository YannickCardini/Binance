var express = require('express');
var router = express.Router();
const Binance = require('binance-api-node').default
// Authenticated client, can make signed calls
const client = Binance({
  apiKey: '0SOGTq6IM0X2CeCwot7oTmA0BF8SkvIYIWTUyff1znvybSZf1PxL7lJ07uQD6DPy',
  apiSecret: 'oklc5xhz3y04hwl0vkK2rXJ9sJyYkoHlN5VSeN50fPYQVNBjPP9E4v8aih8CwP0o',
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/candles', function (req, res, next) {
  if (req.query && req.query.symbol && req.query.interval)
    client.candles({ symbol: req.query.symbol.toUpperCase(), interval: req.query.interval }).then(candles => res.send(candles))
    .catch(err => res.status(500).send({
      message: 'Candles for symbol: ' + req.query.symbol + ' not found'
    }))
  else
    res.status(400).send({
      message: 'Arguments missings !'
    });
})

router.get('/openOrders', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.openOrders({ symbol: req.query.symbol.toUpperCase() }).then(ord => res.send(ord))
    .catch(err => res.status(500).send({
      message: 'Order for symbol: ' + req.query.symbol + ' not found'
    }))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' missing !'
    });
})

router.get('/avgPrice', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.avgPrice({ symbol: req.query.symbol.toUpperCase() }).then(price => res.send(price))
    .catch(err => res.status(500).send({
      message: 'AvgPrice for symbol: ' + req.query.symbol + ' not found'
    }))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' missing !'
    });
})

router.get('/prices', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.prices({ symbol: req.query.symbol.toUpperCase() }).then(price => res.send(price))
    .catch(err => res.status(500).send({
      message: 'Prices for symbol: ' + req.query.symbol + ' not found'
    }))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' missing !'
    });
})

router.get('/getAllOrders', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.allOrders({ symbol: req.query.symbol.toUpperCase() }).then(order => res.send(order))
    .catch(err => res.status(500).send({
      message: 'Order for symbol: ' + req.query.symbol + ' not found'
    }))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' missing !'
    });
})

router.get('/accountInfo', function (req, res, next) {
  console.log("Acount info")
  client.accountInfo().then(info => res.send(info))
})

module.exports = router;
