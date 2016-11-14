'use strict'

const path         = require('path')
const process      = require('process')
const fs           = require('pn/fs')

const express      = require('express')
// const bodyParser   = require('body-parser')
// const session      = require('express-session')
// const cookie       = require('cookie-parser')
const compression  = require('compression')
const app          = express()

// Set up views
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// Set up logging
if(app.get('env') === 'development'){
  app.use(require('morgan')('dev'))
}

// Use compression
app.use(compression({ filter: shouldCompress }))

// Set cache headers
app.use((req, res, next) => {
  const extension = path.extname(req.url).split('?')[0]
  if(['.js', '.css', '.svg', '.jpg'].indexOf(`${extension}`) >= 0){
    res.setHeader("Cache-Control", "max-age=31536000")
  }else{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }
  return next()
})

// Form data stuff
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// Set path for assets
app.use(express.static(__dirname + '/public'))

// app.use('/', require('./routes/auth.js'))
app.use('/', require('./routes/index.js'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req.url)
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
