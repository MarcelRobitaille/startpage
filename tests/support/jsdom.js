'use strict'

const path = require('path')
const fs = require('fs')

const jsdom = require('jsdom').jsdom
const pug = require('pug')

const filename = path.join(__dirname, '../../views/index.pug')
const template = fs.readFileSync(filename, 'utf-8')
const html = pug.compile(template, { filename })({ })

module.exports = () => {
  if(typeof document !== 'undefined') return

  global.document = jsdom(html)
  global.window = { location: {} }
  global.navigator = {
    userAgent: 'node.js'
  }
}
