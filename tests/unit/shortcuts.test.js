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

  const $search__input = _.byId('search__input')

  /*
  *
  * Keydown handler
  *
  */

  describe('Handler', () => {
    const actions = {
      reset: () => 'actions.esc',
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
      $search__input.blur()
    })

    it('should return for ctrl+l', () => {
      se(handler({ key: 'l', ctrlKey: true }), 'skip.urlbar')
    })

    it('should call actions.esc() for escape key', () => {
      se(handler({ key: 'Escape' }), 'actions.esc')
    })

    it('should yield to search handler when search bar focused', () => {
      const _querySelector = document.querySelector
      document.querySelector = () => $search__input
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
      se(document.querySelector(':focus'), $search__input)
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


  /*
  *
  * Actions
  *
  */

  describe('Actions', () => {
    const actions = load('../../source/js/shortcuts.actions.js')
    const foc = load('../../source/js/shortcuts.focus.js')

    describe('back', () => {
      it('should remove focus, blur search bar, remove search suggestions, and set focus to parent', () => {
        // Setup
        foc.set(_.byId('section__google'))
        $search__input.focus()
        _.byId('dropdown').innerHTML = 'This is only a test'

        // Call
        actions.back()

        // Test
        se(foc.get(), _.byId('links'))
        se(document.querySelector(':focus'), null)
        se(_.byId('dropdown').innerHTML, '')
      })
    })

    describe('followLinkUnderElement', () => {
      it('should set window.location.href to the href of the a tag under focused element', () => {
        actions.followLinkUnderElement(_.byId('section__google'))
        se(window.location.href, 'https://google.ca')
      })

      it('should throw an error if first argument is not present', () => {
        assert.throws(() => actions.followLinkUnderElement(), /First argument is required/)
      })

      it('should throw an error if first argument not valid', () => {
        assert.throws(() => actions.followLinkUnderElement(null), /First argument must be a valid html element/)
        assert.throws(() => actions.followLinkUnderElement(false), /First argument must be a valid html element/)
        assert.throws(() => actions.followLinkUnderElement(0), /First argument must be a valid html element/)
        assert.throws(() => actions.followLinkUnderElement(1), /First argument must be a valid html element/)
        assert.throws(() => actions.followLinkUnderElement('test'), /First argument must be a valid html element/)
      })

      it('should throw and error if it can\'t find the link', () => {
        assert.throws(() => actions.followLinkUnderElement(_.byId('search__form')), /Could not find link under/)
      })
    })

  })


  /*
  *
  * Focus
  *
  */

  describe('Focus', () => {

    const foc = load('../../source/js/shortcuts.focus.js')
    const $focus = _.byId('search__form')

    beforeEach(foc.remove)

    describe('get/set', () => {
      it('should set $focus to value passed and add focus class to it', () => {
        foc.set($focus)
        se(foc.get(), $focus)
        assert($focus.classList.contains('focus'))
      })
    })

    describe('level', () => {
      it('should return the data-level proprety of the focused element', () => {
        foc.set($focus)
        se(foc.level(), 0)
      })

      it('should return -1 if focus not set', () => {
        se(foc.level(), -1)
      })
    })

    describe('remove', () => {
      it('should remove the focus class from $focus then set $focus to null', () => {
        foc.set($focus)
        foc.remove()
        se(foc.get(), null)
        se($focus.classList.contains('focus'), false)
      })
    })


  })

})
