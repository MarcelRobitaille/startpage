'use strict'

let $focus

const self = {

  get: () => $focus,

  level: () => $focus ? parseInt($focus.getAttribute('data-level')) : -1,

  set: (_$focus) => {
    self.remove()
    $focus = _$focus
    $focus.classList.add('focus')
  },

  remove: () => {
    if(!$focus) return
    $focus.classList.remove('focus')
    $focus = null
  },

}

module.exports = self
