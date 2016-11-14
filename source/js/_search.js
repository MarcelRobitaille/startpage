'use strict'

const _ = require('../../functions/_.js')
const axios = require('axios')
const co = require('co')

const $search = _.byId('search__input')
const $select = _.byId('search__select')
const $results = _.byId('search__results')
const $options = _.byClassName('search__option')

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
    $selected.removeAttribute('selected')
    if(toggle($selected, event.key)) return

    // switch(event.key){
    //   case 'ArrowUp': {
    //     $select.lastChild.setAttribute('selected', 'selected')
    //     break
    //   }
    //   case 'ArrowDown': {
    //     $select.firstChild.setAttribute('selected', 'selected')
    //     break
    //   }
    // }
  }
})

let timer
$search.addEventListener('keyup', (event) => {
  clearTimeout(timer)

  timer = setTimeout(() => {
    co(function *(){
      const engine = document.querySelector('.search__option[selected="selected"]').value
      let results  = []

      switch(engine){
        case 'duckduckgo': {
          const response = yield axios('http://api.duckduckgo.com/?format=json&q=' + $search.value.replace(/ /g, '+'))

          response.data.Results.push(...response.data.RelatedTopics).forEarch((result) => results.push(result.Text))
          break
        }
        case 'github': {
          const response = yield axios('https://api.github.com/search/repositories?q=' + $search.value.replace(/ /g, '+'))
          results = response.data.items.map((result) => `<a href=`)

          console.log(results)
          break
        }
        default: {
          return
        }
      }

      $results.innerHTML = results.map((result) => `<li class="search__results__li">${result.Result}</li>`).join('\n')
    })
  }, 300)
})
