/* globals describe, it, beforeEach */

'use strict'

const assert = require('assert')
const se = assert.strictEqual
const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const _ = load('../../functions/_.js')
const jsdom = load('../support/jsdom.js')

describe('Shortcuts', () => {

  jsdom()

  describe('Handler', () => {
    const actions = {
      esc: () => 'actions.esc',
      back: () => 'actions.back',
      followLinkUnderElement: ($el) => 'actions.followLinkUnderElement' + $el.firstElementChild.getAttribute('href'),
    }
    const _handler = load('../../source/js/shortcuts.handler.js')(actions)
    const foc = load('../../source/js/shortcuts.focus.js')

    const handler = (event) => {
      event.preventDefault = () => {}
      event.stopPropagation = () => {}
      return _handler(event)
    }

    beforeEach(() => {
      foc.remove()
      _.byId('search__input').blur()
    })

    it('should return for ctrl+l', () => {
      se(handler({ key: 'l', ctrlKey: true }), 'skip.urlbar')
    })

    it('should call actions.esc() for escape key', () => {
      se(handler({ key: 'Escape' }), 'actions.esc')
    })

    it('should yield to search handler when search bar focused', () => {
      const _querySelector = document.querySelector
      document.querySelector = () => _.byId('search__input')
      se(handler({}), 'skip.search')
      se(handler({ key: 'Backspace' }), 'skip.search')
      document.querySelector = _querySelector
    })

    it('should run actions.back() for backspace key', () => {
      se(handler({ key: 'Backspace' }), 'actions.back')
    })

    it('should follow link if level 1 element is focused for enter key', () => {
      const $el = document.querySelector('.links__section__title.shortcut')
      foc.set($el)
      se(handler({ key: 'Enter' }), 'actions.followLinkUnderElement' + $el.firstElementChild.getAttribute('href'))
    })

    it('should skip if no element matching key can be found', () => {
      se(handler({ key: 'q' }), 'skip.noelement')
    })

    it('should focus search bar for s key', () => {
      se(handler({ key: 's' }), 'success.focus')
      se(foc.get(), _.byId('search__form'))
      se(document.querySelector(':focus'), _.byId('search__input'))
    })

    it('should focus links sections for l key', () => {
      se(handler({ key: 'l'}), 'success.focus')
      se(foc.get(), _.byId('links'))
    })

    it('should go to images.google.ca if Google section selected for i key', () => {
      const $focus = _.byId('section__google')
      foc.set($focus)
      se(handler({ key: 'i' }), 'success.followlink')
      se(window.location.href, 'https://images.google.ca')
    })

  })
})
