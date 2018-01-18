import Favourites from './Favourites.js'
import URL from './URL.js'
import DDG from './DDG.js'

export default class Router {
  constructor(input) {
    this.input = input.trim()
  }

  results() {
    const results = []

    if (this.input === '') return results


    if (!this.input.includes(' ')) {
      const favourites = new Favourites(this.input)
      results.push(...favourites.results())
    }


    /*
    *
    * URL
    *
    */

    const url = new URL(this.input)
    if (url.isValid()) results.push(url)


    /*
    *
    * Duck duck go
    *
    */

    results.push(new DDG(this.input))

    return results
  }
}

