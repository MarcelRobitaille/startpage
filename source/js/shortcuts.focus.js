'use strict'

let $focus

const self = {

  get: () => $focus,

  level: () => $focus ? parseInt($focus.getAttribute('data-level')) : -1,

  set: (_$focus) => {
    $focus = _$focus
    $focus.classList.add('focus')
  },

  remove: () => {
    if($focus){
      $focus.classList.remove('focus')
      $focus = null
    }
    return 'focus.remove'
  },

}

module.exports = self
