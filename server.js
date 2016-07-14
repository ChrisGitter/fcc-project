var compression = require('compression')
var logger = require('morgan')
var express = require('express')
var app = express()
var pug = require('pug')
var checkTimestamps = require('./checkTimestamps')

app.set('view engine', 'pug')

app.use(compression())
app.use(logger('combined', {
  skip: (req, res) => { return res.statusCode < 400 }
}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:param', (req, res) => {
    if (req.url !== "/favicon.ico") {
        res.setHeader('Content-Type', 'application/json')
        res.send(checkTimestamps(req.path))
    }
})

app.listen(process.env.PORT, function () {
  console.log('App listening on port '+process.env.PORT+'!');
});