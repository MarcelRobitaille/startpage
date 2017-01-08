'use strict'

const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', load('../functions/pugfn.js'))
})

module.exports = router
