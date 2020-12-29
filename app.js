const express = require('express')
const fs = require("fs");
const { Liquid } = require('liquidjs')
const path = require('path')
const app = express()

const engine = new Liquid({
  root: __dirname, // for layouts and partials
  extname: '.liquid'
})
const indexRouter = require('./routes/index');
app.engine('liquid', engine.express()) // register liquid engine
app.set('views', ['./assets', './templates', './layout']) // specify the views directory
app.set('view engine', 'liquid') // set to default
app.use(express.static(path.join(__dirname)));
app.use('/', indexRouter);


app.listen(3000, function () {
  console.log('服务启动在: http://localhost:3000')
})

module.exports = app
