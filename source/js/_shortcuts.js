'use strict'

const _ = require('../../functions/_.js')

const $shortcuts = document.getElementsByClassName('shortcut')

for(let i = 0; i < $shortcuts.length; i++){
  const $shortcut = $shortcuts[i]
  const key       = $shortcut.getAttribute('data-key')
  const text      = $shortcut.innerText
  const index     = text.toLowerCase().indexOf(key.toLowerCase())

  if(~index) ($shortcut.firstElementChild ? $shortcut.firstChild : $shortcut).innerHTML = `${text.substr(0, index)}<span class="underline">${key}</span>${text.substr(index + 1)}`
}

let $focus
const $blocks = document.getElementsByClassName('shortcut__block__key')

const findShortcut = ($elements, key) => {
  for(let i = 0; i < $elements.length; i++){
    if($elements[i].getAttribute('data-key').toLowerCase() === key.toLowerCase()) return $elements[i]
  }
  return false
}

const removeFocus = () => {
  $focus = null
  const $old = document.querySelector('.focus')
  if($old) $old.classList.remove('focus')
  $search__input.blur()
  _.byId('search__completion').innerHTML = ''
}

const $search        = _.byId('search__shortcut')
const $search__input = _.byId('search__input')

document.addEventListener('keydown', (event) => {
  if(event.key === 'l' && event.ctrlKey) return

  let $elements = $blocks

  if(event.key === 'Escape') return removeFocus()
  if(document.querySelector(':focus') === $search__input) return
  if(event.key === 'Backspace'){
    const _$focus = _.parent($focus, '.shortcut__parent')
    removeFocus()
    if(_$focus){
      $focus = _$focus
      $focus.classList.add('focus')
    }
    return
  }

  if($focus){
    const level = parseInt($focus.getAttribute('data-level'))

    if(event.key === 'Enter' && level === 1){
      const $link = $focus.querySelector('.links__section__title a')
      if($link){
        location.href = $link.getAttribute('href')
        return
      }
    }

    $elements   = [...$focus.getElementsByClassName('shortcut')].filter(($el) => parseInt($el.getAttribute('data-level')) === level + 1)
  }

  const $element = findShortcut($elements, event.key)

  if(!$element) return

  event.preventDefault()
  event.stopPropagation()

  if($element.hasAttribute('data-action')){
    const action = $element.getAttribute('data-action')
    switch(action){
      case 'link': {
        location.href = $element.getAttribute('href')
        break
      }
    }
    return
  }

  removeFocus()

  if($element === $search){
    $search__input.focus()
    $search.parentElement.classList.add('focus')
  }else{
    $focus = _.parent($element, $element.getAttribute('data-for'))
    $focus.classList.add('focus')
  }
})
