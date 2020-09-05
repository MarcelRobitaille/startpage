import Favourite from './Favourite.js'

export default class Reddit extends Favourite {

	constructor(sub) {
		const text = `/r/${sub}`
		super({ text, url: `https://reddit.com/${sub === '' ? '' : text}` })
	}
}
