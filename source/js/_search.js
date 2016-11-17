'use strict'

const _ = require('../../functions/_.js')
const axios = require('axios')
const co = require('co')

const $search = _.byId('search__input')
const $select = _.byId('search__select')
const $options = _.byClassName('search__option')

$select.firstChild.setAttribute('selected', 'selected')

// Stolen fro wikipedia
const topLevelDomains = 'ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw'

// I know there's more but I don't really give a fuck
const invalidURLChars = ' '

const urlRegex = new RegExp(`^[^${invalidURLChars}]+\\.(${topLevelDomains})[^${invalidURLChars}]*$`, 'i')

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

  if(urlRegex.test($search.value)){
    let url = $search.value
    if(!/^http(s|):\/\//.test(url)) url = `http://${url}`
    location.href = url
    return
  }

  const engine = document.querySelector('.search__option[selected="selected"]').value

  const url = {
    duckduckgo: 'https://duckduckgo.com/?q=',
    npm:        'https://www.npmjs.com/search?q=',
    github:     'https://github.com/search?utf8=✓&q=',
    amazon:     'https://www.amazon.ca/s/field-keywords='
  }[engine]

  if(url) location.href = url + $search.value
})
