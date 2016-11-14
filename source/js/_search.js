'use strict'

const _ = require('../../functions/_.js')
const axios = require('axios')
const co = require('co')

const $search = _.byId('search__input')
const $select = _.byId('search__select')
const $options = _.byClassName('search__option')

$select.firstChild.setAttribute('selected', 'selected')

const toggle = ($el, direction) => {
  switch(direction){
    case 'ArrowUp': {
      if($el.previousElementSibling){
        $el.previousElementSibling.setAttribute('selected', 'selected')
        return true
      }
      break
    }
    case 'ArrowDown': {
      if($el.nextElementSibling){
        $el.nextElementSibling.setAttribute('selected', 'selected')
        return true
      }
      break
    }
  }
  return false
}

$search.addEventListener('keydown', (event) => {
  if(['ArrowUp', 'ArrowDown'].indexOf(event.key) !== -1 && event.ctrlKey){

    const $selected = $select.querySelector('[selected="selected"]')
    if(toggle($selected, event.key)){
      $selected.removeAttribute('selected')
    }
  }
})

_.byId('search__form').addEventListener('submit', (event) => {
  event.preventDefault()
  event.stopPropagation()

  const engine = document.querySelector('.search__option[selected="selected"]').value

  const url = {
    duckduckgo: 'https://duckduckgo.com/?q=',
    npm:        'https://www.npmjs.com/search?q=',
    github:     'https://github.com/search?utf8=✓&q=',
    amazon:     'https://www.amazon.ca/s/field-keywords='
  }[engine]

  if(url) location.href = url + $search.value
})
