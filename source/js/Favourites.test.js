import { expect, test } from '@jest/globals'

import Favourites from './Favourites.js'

const favourites = query => new Favourites(query).results().map(x => x.text)

test('it should find favourite if query similar or shorter', () => {
	// shorter like the start of the favourite text

	// Exact string
	expect(favourites('Nextcloud')).toStrictEqual([ 'Nextcloud' ])

	// Shorter version (you should be able to press enter if you see the desired
	// result before typing the whole word)
	expect(favourites('Next')).toStrictEqual([ 'Nextcloud' ])

	// Should still find the right thing for a typo
	expect(favourites('Nextloud')).toStrictEqual([ 'Nextcloud' ])
})

test('it should not find favourites if the query is very different', () => {

	// Previously found 'Nextclloud' (and somehow 'OneNote') favourite
	expect(favourites('nextcloud not working properly which makes'))
		.toStrictEqual([])

	// Previously found pretty much all favourites
	expect(favourites(
		'SyntaxError: Cannot use import statement outside a module'
	)).toStrictEqual([])
})
