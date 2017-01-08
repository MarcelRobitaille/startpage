'use strict'

const _ = require('../../functions/_.js')
const foc = require('./shortcuts.focus.js')
const $search__input = _.byId('search__input')

const actions = {

  reset: () => {

    // Remove focus from current element
    foc.remove()

    // Blur search bar
    $search__input.blur()

    // Hide all suggested search items
    _.byId('search__completion').innerHTML = ''

  },

  back: () => {

    // Find parent of focused element that matches .shortcut__parent
    const $focus = _.parent(foc.get(), '.shortcut__parent')

    // Reset everything
    actions.reset()

    // If parent found, reset focus
    if($focus) foc.set($focus)
  },

  followLinkUnderElement: ($el) => {
    if(typeof $el === 'undefined') throw new Error(`First argument is required`)
    if(!$el || typeof $el !== 'object' || !('tagName' in $el)) throw new Error(`First argument must be a valid html element`)
    const $link = $el.querySelector('.links__section__title a')
    if(!$link) throw new Error(`Could not find link under ${$el}`)
    window.location.href = $link.getAttribute('href')
  },

}

module.exports = actions
