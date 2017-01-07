'use strict'

const actions = require('./shortcuts.actions.js')
const handler = require('./shortcuts.handler.js')(actions)

document.addEventListener('keydown', handler)
