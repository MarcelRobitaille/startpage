class Favourite {

  constructor(item) {
    if (item) {
      this.text = `/${this.prefix()}/${item.text}`
      this.url = item.url
    }
  }

  render() {
    return `
      <div class='search__result-wrapper'>
        <svg class='search__result__svg'><use xlink:href='#star' /></svg>
        <a class='dropdown__li__a' href='${this.url}'>
          ${this.text}
        </a>
      </div>
    `
  }
}

export default Favourite
