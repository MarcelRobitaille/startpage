import Favourites from './Favourites.js'
import URL from './URL.js'
import DDG from './DDG.js'

class Router {
  constructor(input) {
    this.input = input.trim()
  }

  results() {
    const results = []

    if (this.input === '') return results


    const favourites = new Favourites(this.input)
    results.push(...favourites.results())

    /*
    *
    * Duck duck go
    *
    */

    results.push(new DDG(this.input))


    /*
    *
    * URL
    *
    */

    const url = new URL(this.input)
    if (url.isValid()) results.push(url)

    return results
  }
}

export default Router
