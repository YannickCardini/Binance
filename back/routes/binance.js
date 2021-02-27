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

router.get('/openOrders', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.openOrders({ symbol: req.query.symbol }).then(ord => res.send(ord))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' manquant !'
    });
})

router.get('/avgPrice', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.avgPrice({ symbol: req.query.symbol }).then(price => res.send(price))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' manquant !'
    });
})

router.get('/prices', function (req, res, next) {
  if (req.query && req.query.symbol)
    client.prices({ symbol: req.query.symbol }).then(price => res.send(price))
  else
    res.status(400).send({
      message: 'Argument \'symbol\' manquant !'
    });
})

router.get('/accountInfo', function (req, res, next) {
  client.accountInfo().then(info => res.send(info))
})

module.exports = router;
