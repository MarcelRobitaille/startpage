class DDG {
  constructor(input) {
    this.input = input
    this.url = `https://duckduckgo.com/?q=${encodeURIComponent(input)}`
  }

  render() {
    return `
      <div class='search__result-wrapper'>
        <svg class='search__result__svg'><use xlink:href='#search' /></svg>
        <a class='dropdown__li__a' href='${this.url}'>
          ${this.input}
        </a>
      </div>
    `
  }
}

export default DDG

