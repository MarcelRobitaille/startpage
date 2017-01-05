'use strict'

const _ = require('../../functions/_.js')
const axios = require('axios')
const co = require('co')

const $search     = _.byId('search__input')
const $select     = _.byId('search__select')
const $completion = _.byId('search__completion')
const $options    = _.byClassName('search__option')

$select.firstChild.setAttribute('selected', 'selected')

// Stolen fro wikipedia
const topLevelDomains = 'ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw'

// I know there's more but I don't really give a fuck
const invalidURLChars = ' '
const urlRegex = new RegExp(`^([^${invalidURLChars}]+\\.(${topLevelDomains})|(\\d{1,3}\\.){3}\\d{1,3})[^ ]*$`, 'i')
const localhostRegex = /^(https?:\/\/|)localhost/i
const completionList = JSON.parse(localStorage.getItem('completionList')) || []


/*

  Switch between search engines

*/

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

const handleSearchEngines = (event) => {
  const $selected = $select.querySelector('[selected="selected"]')
  if(toggle($selected, event.key)){
    $selected.removeAttribute('selected')
  }
}


/*



*/

$search.addEventListener('keyup', (event) => {
  const direction = {
    ArrowDown: 'nextElementSibling',
    ArrowUp: 'previousElementSibling',
  }[event.key]

  if(direction && event.ctrlKey) handleSearchEngines(event)

  if($search.value.length < 3){
    $completion.innerHTML = ''
    return
  }

  const matches = completionList.filter((url) => _.fuzzy(url, $search.value))

  for(let i = 0; i < $completion.children.length; i++){
    const $el = $completion.children[i]
    const url = $el.innerText
    const index = matches.indexOf(url)
    if(~index){
      matches.splice(index, 1)
    }else{
      $completion.removeChild($el)
    }
  }
  for(let i = 0; i < matches.length; i++){
    const $match = document.createElement('LI')
    $match.classList.add('search__completion__li')
    $match.innerText = matches[i]
    $completion.appendChild($match)
  }
  if(!$completion.querySelector('.focus') && $completion.firstElementChild) $completion.firstElementChild.classList.add('focus')
  // $completion.innerHTML = matches.map((match) => `<li class="search__completion__li">${match}</li>`)


  //
  // Handles switching search engines and completion list
  //

  // If not up/down arrow, return
  if(!direction) return

  let $focus
  for(let i = 0; i < $completion.children.length; i++){
    if($completion.children[i].classList.contains('focus')){
      $focus = $completion.children[i]
      break
    }
  }

  console.log($focus)

  if($focus){


    if($focus[direction]){
      $focus.classList.remove('focus')
      $focus[direction].classList.add('focus')
    }
  }else{
    if($completion.firstElementChild) $completion.firstElementChild.classList.add('focus')
  }
})

$search.addEventListener('keyup', (event) => {
  if(event.key !== 'Enter') return

  event.preventDefault()
  event.stopPropagation()

  const $focus = $completion.querySelector('.focus')
  if($focus && !event.ctrlKey){
    location.href = $focus.textContent
    return
  }

  if(localhostRegex.test($search.value) || urlRegex.test($search.value)){
    let url = $search.value
    if(!/^http(s|):\/\//.test(url)) url = `http://${url}`

    if(!completionList.includes(url)) completionList.push(url)
    localStorage.setItem('completionList', JSON.stringify(completionList))

    location.href = url
    return
  }

  const engine = document.querySelector('.search__option[selected="selected"]').value

  const url = {
    duckduckgo: 'https://duckduckgo.com/?q=',
    npm:        'https://www.npmjs.com/search?q=',
    github:     'https://github.com/search?utf8=✓&q=',
    amazon:     'https://www.amazon.ca/s/field-keywords=',
    youtube:    'https://www.youtube.com/results?search_query=',
  }[engine]

  if(url) location.href = url + $search.value
})
