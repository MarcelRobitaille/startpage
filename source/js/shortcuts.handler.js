'use strict'

const _ = require('../../functions/_.js')
const foc = require('./shortcuts.focus.js')

const $search        = _.byId('search__shortcut')
const $search__input = _.byId('search__input')

let actions

const self = (event) => {

  // Return if command ctrl+l (focus url bar)
  if(event.key === 'l' && event.ctrlKey) return 'skip.urlbar'

  // If escape key, unfocus everything
  if(event.key === 'Escape') return actions.esc()

  // If search bar focused, return and let it's handler handle it
  if(document.querySelector(':focus') === $search__input) return 'skip.search'

  // If backspace, focus currently focused element's parent
  if(event.key === 'Backspace') return actions.back()

  const $focus = foc.get() || document
  const level = foc.level()

  // If focused element is of level 1 and key is enter, follow link
  if(event.key === 'Enter' && level === 1) return actions.followLinkUnderElement($focus)

  // Find shortcut matching key
  const $element = $focus.querySelector(`.shortcut[data-level="${level + 1}"][data-key="${event.key.toLowerCase()}"]`)

  if(!$element) return 'skip.noelement'

  event.preventDefault()
  event.stopPropagation()

  // If element has action
  if($element.hasAttribute('data-action')){
    const action = $element.getAttribute('data-action')

    switch(action){

      // Follow link
      case 'link': {
        window.location.href = $element.getAttribute('href')
        return 'success.followlink'
      }

    }

    throw new Error(`Could not find action for ${action}.`)
  }

  foc.remove()

  if($element === $search){
    $search__input.focus()
    foc.set($search.parentElement)
  }else{
    foc.set(_.parent($element, $element.getAttribute('data-for')))
  }

  return 'success.focus'
}

module.exports = (_actions) => {
  actions = _actions
  return self
}
