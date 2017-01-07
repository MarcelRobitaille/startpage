'use strict'

const _ = require('../../functions/_.js')
const foc = require('./shortcuts.focus.js')
const $search__input = _.byId('search__input')

const actions = {

  esc: () => {

    // Remove focus from all elements
    foc.remove()

    // Blur search bar
    $search__input.blur()

    // Hide all suggested search items
    _.byId('search__completion').innerHTML = ''

    return 'actions.esc'
  },

  back: () => {
    const $focus = _.parent(foc.get(), '.shortcut__parent')
    foc.remove()
    $search__input.blur()
    _.byId('search__completion').innerHTML = ''
    if($focus) foc.set($focus)

    return 'actions.back'
  },

  followLinkUnderElement: ($el) => {
    const $link = $el.querySelector('.links__section__title a')
    if(!$link) throw new Error(`Could not find link under ${$el}`)
    location.href = $link.getAttribute('href')
    return 'actions.followLinkUnderElement'
  },

}

module.exports = actions
