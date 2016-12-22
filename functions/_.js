'use strict'

module.exports = {
  byId: (id) => document.getElementById(id),
  byClassName: (className) => document.getElementsByClassName(className),
  parent: ($el, attr) => {
    if(!$el) return false

    const type = attr.substr(0, 1)
    attr = attr.substr(1)

    switch(type){
      case '#':
        while(($el = $el.parentElement) && ($el.getAttribute('id') !== attr)){}
        break

      case '.':
        while(($el = $el.parentElement) && !$el.classList.contains(attr)){}
        break
    }
    // console.log($el)

    return $el
  },
  fuzzy: (haystack, needle) => {
    haystack = haystack.toLowerCase()
    needle   = needle.toLowerCase();
    let n    = -1
    let l
    for (let i = 0; l = needle[i++] ;) if (!~(n = haystack.indexOf(l, n + 1))) return false
    return true
  }
}
