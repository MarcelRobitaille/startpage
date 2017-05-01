import Fuse from 'fuse.js'

import Reddit from './Reddit.js'
import Uni from './Uni.js'

const results = [
  ...Reddit.results(),
  ...Uni.results(),
]

const fuse = new Fuse(results, {
  shouldSort: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'text',
  ]
})

export default class Favourites {
  constructor(input) {
    this.input = input
  }

  isValid() {
    return this.input.charAt(0) === '/'
  }

  results() {
    if (!this.isValid()) return []

    return fuse.search(this.input)
  }
}
