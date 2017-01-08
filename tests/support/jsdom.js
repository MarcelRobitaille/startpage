'use strict'

const fs = require('fs')
const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const jsdom = require('jsdom').jsdom
const pug = require('pug')

const pugfn = load('../../functions/pugfn.js')

const filename = path.join(__dirname, '../../views/index.pug')
const template = fs.readFileSync(filename, 'utf-8')
const html = pug.compile(template, { filename })(pugfn)

module.exports = () => {
  if(typeof document !== 'undefined') return

  global.document = jsdom(html)
  global.window = { location: {} }
  global.navigator = {
    userAgent: 'node.js'
  }
}
