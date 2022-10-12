const clamp = (x, min, max) => Math.min(Math.max(x, min), max)

export default class State {

	setResults(results) {
		this.results = results

		if (results.length === 0) return

		if (results.indexOf(this.focused) === -1) this.focused = results[0].url
	}

	moveFocus(direction) {
		const i = clamp(
			this.results.map(result => result.url).indexOf(this.focused) + direction,
			0,
			this.results.length - 1
		)
		this.focused = this.results[i].url
	}
}
